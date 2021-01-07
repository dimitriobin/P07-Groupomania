import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = () => ({
  onlineUsers: '',
  conversations: [],
  currentConversation: '',
  messages: [],
});

const getters = {
  allMessages: (state) => state.messages,
  allOnlineUsers: (state) => state.onlineUsers,
  allConversations: (state) => state.conversations,
  currentConversation: (state) => state.currentConversation,
};

const actions = {
  getOnlineUsers({ commit }, users) {
    commit('setOnlineUsers', users);
  },
  addMessage({ commit, dispatch }, data) {
    return http.post('/chat/messages', data, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        commit('addNewMessage', res.data);
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
        console.log(res.data);
        commit('addNewConversation', res.data);
        commit('setCurrentConversation', res.data.id);
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
    console.log(conversationId);
    return http.get(`/conversations/${conversationId}`, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        commit('setCurrentConversation', res.data);
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
  displayMessage({ commit }, msg) {
    commit('addNewMessage', msg);
  },
  fetchMessages({ commit }, userId) {
    const ajaxRequest = userId;
    commit('setMessages', ajaxRequest);
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
    state.messages.push(message);
  },
  setMessages(state, messages) {
    state.messages = messages;
  },
  resetCurrentConversation(state) {
    state.currentConversation = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
