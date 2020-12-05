import Vue from 'vue';
import Vuex from 'vuex';
import Post from './modules/posts';
import Auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Post,
    Auth,
  },
});
