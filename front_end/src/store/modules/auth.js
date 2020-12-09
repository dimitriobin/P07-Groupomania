import http from '../../http-common';

const storedUser = JSON.parse(localStorage.getItem('user'));
const initialState = storedUser
  ? { status: { loggedIn: true }, storedUser }
  : { status: { loggedIn: false }, storedUser: null };

export default {
  state: {
    initialState,
    status: {
      loggedIn: '',
    },
    user: '',
  },
  getters: {
    loggedUser: (state) => state.initialState,
  },
  actions: {
    login({ commit }, user) {
      return http.post('/users/login', user)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          commit('loginSuccess', response.data);
        })
        .catch((error) => {
          commit('loginFailure');
          return Promise.reject(error);
        });
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('logout');
      document.location.reload();
    },
    register({ commit }, user) {
      return http.post('/users/signup', user)
        .then((res) => {
          commit('registerSuccess');
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          commit('registerFailure');
          return Promise.reject(error);
        });
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
