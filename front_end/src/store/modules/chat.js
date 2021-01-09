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
    return http.post(`/conversations/${state.currentConversation.id}/message`, message, { headers: authHeader() })
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
    return http.post('/conversations', conversation, { headers: authHeader() })
      .then((res) => {
        commit('addNewConversation', res.data);
        commit('setCurrentConversation', res.data);
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
        commit('setCurrentConversation', res.data);
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
    if (state.currentConversation.id === msg.res.conversationId) {
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
    state.conversations = conversations;
  },
  setCurrentConversation(state, conversation) {
    state.currentConversation = conversation;
  },
  addNewConversation(state, conversation) {
    state.conversations.push(conversation);
  },
  addNewMessage(state, message) {
    if (message.conversationId === state.currentConversation.id) {
      state.currentConversation.Messages.push(message);
    }
  },
  replaceMessage(state, newMessage) {
    if (newMessage.conversationId === state.currentConversation.id) {
      state.currentConversation.Messages.forEach((message, index) => {
        if (message.id === newMessage.id) {
          state.currentConversation.Messages.splice(index, 1, newMessage);
        }
      });
    }
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
