import Vue from 'vue';
import Vuex from 'vuex';
import Post from './modules/posts';
import Auth from './modules/auth';
import User from './modules/users';
import Subject from './modules/subjects';
import Comment from './modules/comments';
import Chat from './modules/chat';

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
    User,
    Subject,
    Comment,
    Chat,
  },
});
