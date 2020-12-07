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
  fetchAllUsers({ commit }) {
    http.get('/users', { headers: authHeader() })
      .then((res) => {
        commit('setAllUsers', res.data);
      })
      .catch((error) => console.log(error));
  },
  fetchUser({ commit }, id) {
    http.get(`/users/${id}`, { headers: authHeader() })
      .then((user) => {
        commit('setUser', user.data[0]);
      })
      .catch((error) => console.log(error));
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
