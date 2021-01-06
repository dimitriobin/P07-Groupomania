import http from '../../http-common';
import authHeader from '../../services/auth-header';

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
  addMessage({ commit, dispatch }, data) {
    return http.post('/messages', data, { headers: authHeader() })
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
