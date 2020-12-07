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
  fetchUser({ commit }, id) {
    http.get(`/users/${id}`, { headers: authHeader() })
      .then((user) => {
        commit('setUser', user.data[0]);
      });
  },
};

const mutations = {
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
