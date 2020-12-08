import http from '../../http-common';
import router from '../../router';

const storedUser = JSON.parse(localStorage.getItem('user'));
const initialState = storedUser
  ? { status: { loggedIn: true }, storedUser }
  : { status: { loggedIn: false }, storedUser: null };

export default {
  namespaced: true,
  state: {
    initialState,
  },
  getters: {
    loggedUser: (state) => state.initialState,
  },
  actions: {
    login({ commit }, user) {
      http.post('/users/login', user)
        .then((response) => {
          console.log(response.data);
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          commit('loginSuccess', response.data);
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
          commit('loginFailure');
        });
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('logout');
    },
    register({ commit }, user) {
      console.log(user);
      http.post('/users/signup', user)
        .then((res) => {
          console.log(res);
          commit('registerSuccess');
        })
        .catch((error) => {
          console.log(error);
          commit('registerFailure');
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
