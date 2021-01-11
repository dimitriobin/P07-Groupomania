import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = () => ({
  onlineUsers: [],
  conversations: [],
  currentConversation: '',
});

const getters = {
  allOnlineUsers: (state) => state.onlineUsers,
  allConversations: (state) => state.conversations,
  currentConversation: (state) => state.currentConversation,
};

const actions = {
  getOnlineUsers({ commit }, users) {
    commit('setOnlineUsers', users);
  },
  addMessage({ commit, state, dispatch }, message) {
    return http.post(`/conversations/${state.currentConversation}/message`, message, { headers: authHeader() })
      .then((res) => {
        commit('addNewMessage', res.data);
        commit('updateConversations', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  addConversation({ commit, dispatch }, conversation) {
    return http.post('/conversations', JSON.stringify(conversation), { headers: authHeader() })
      .then((res) => {
        if (res.data[1] === true) commit('addNewConversation', { ...res.data[0], Messages: [] });
        commit('setCurrentConversation', res.data[0].id);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') {
          dispatch('logout');
        }
        if (err.response.data.message === 'This conversation already exist') {
          dispatch('fetchConversation', err.response.data.conversationId);
        }
        return Promise.reject(err.response.data);
      });
  },
  fetchConversations({ commit, dispatch }) {
    return http.get('/conversations', { headers: authHeader() })
      .then((res) => {
        commit('setConversations', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  fetchConversation({ commit, dispatch }, conversationId) {
    return http.get(`/conversations/${conversationId}`, { headers: authHeader() })
      .then((res) => {
        commit('addMessages', res.data);
        commit('setCurrentConversation', conversationId);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  updateMessage({ commit, dispatch }, message) {
    return http.put(`/conversations/message/${message.id}`, message.modifications, { headers: authHeader() })
      .then((res) => {
        commit('replaceMessage', res.data);
        commit('updateConversations', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  resetCurrentConversation({ commit }) {
    commit('resetCurrentConversation');
  },
  displayMessage({ commit, state, dispatch }, msg) {
    if (state.currentConversation === msg.res.conversationId) {
      dispatch('updateMessage', {
        id: msg.res.id,
        modifications: {
          read: true,
        },
      });
    } else {
      commit('updateConversations', msg.res);
    }
    commit('addNewMessage', msg.res);
  },
  displayConversation({ commit }, conversation) {
    commit('addNewConversation', conversation);
  },
};

const mutations = {
  setOnlineUsers(state, users) {
    state.onlineUsers = users;
  },
  setConversations(state, conversations) {
    conversations.forEach((conv) => {
      const convObject = {
        ...conv,
        users: JSON.parse(conv.users),
      };
      state.conversations.push(convObject);
    });
  },
  setCurrentConversation(state, conversation) {
    state.currentConversation = conversation;
  },
  addNewConversation(state, conversation) {
    const convObject = {
      ...conversation,
      users: JSON.parse(conversation.users),
    };
    state.conversations.push(convObject);
  },
  addMessages(state, message) {
    console.log(state, message);
    // a changer
  },
  replaceMessage(state, newMessage) {
    console.log(state, newMessage);
    // a changer
  },
  updateConversations(state, message) {
    state.conversations.forEach((conv) => {
      if (conv.id === message.conversationId) {
        conv.Messages.splice(0, 1, message);
      }
    });
  },
  resetCurrentConversation(state) {
    state.currentConversation = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
