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
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          commit('loginFailure');
          const { message } = error.response.data;
          return Promise.reject(message);
        });
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('logout');
      document.location.reload();
    },
    register({ commit }, user) {
      // console.log(user);
      user.forEach((entry) => console.log(entry));
      return http.post('/users/signup', user)
        .then((res) => {
          commit('registerSuccess');
          return Promise.resolve(res.data);
        })
        .catch((error) => {
          commit('registerFailure');
          const { message } = error.response.data.error.errors[0];
          return Promise.reject(message);
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
