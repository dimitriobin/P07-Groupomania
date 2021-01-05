// import http from '../../http-common';
// import authHeader from '../../services/auth-header';

const state = () => ({
  onlineUsers: '',
  messages: [],
});

const getters = {
  allMessages: (state) => state.messages,
  allOnlineUsers: (state) => state.onlineUsers,
};

const actions = {
  getOnlineUsers({ commit }, users) {
    commit('setOnlineUsers', users);
  },
  addMessage({ commit }, message) {
    commit('addNewMessage', message);
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
  addNewMessage(state, message) {
    state.messages.push(message);
  },
  setMessages(state, messages) {
    state.messages = messages;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
