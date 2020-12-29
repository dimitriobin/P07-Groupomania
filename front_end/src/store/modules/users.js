import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = {
  users: [],
  user: '',
};

const getters = {
  allUsers: (state) => state.users,
  oneUser: (state) => state.user,
};

const actions = {
  fetchAllUsers({ commit, dispatch }) {
    return http.get('/users', { headers: authHeader() })
      .then((res) => {
        commit('setAllUsers', res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
  fetchUser({ commit, dispatch }, id) {
    return http.get(`/users/${id}`, { headers: authHeader() })
      .then((user) => {
        commit('setUser', user.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
  updateUser({ commit, dispatch }, { id, data }) {
    return http.put(`/users/${id}`, data, { headers: authHeader() })
      .then((user) => {
        commit('setUser', user.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
};

const mutations = {
  setAllUsers(state, users) {
    state.users = users;
  },
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
