import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import http from '../../http-common';
import authHeader from '../../services/auth-header';

dayjs.extend(relativeTime);

const state = () => ({
  posts: [],
});

const getters = {
  allPosts: (state) => state.posts,
};
const actions = {
  addPost({ commit }, data) {
    http.post('/posts', data, { headers: authHeader() })
      .then((res) => {
        commit('newPost', res.data);
      })
      .catch((err) => { console.log(err); });
  },
  fetchAllPosts({ commit }) {
    http.get('/posts', { headers: authHeader() })
      .then((res) => {
        commit('setAllPosts', res.data);
      })
      .catch((err) => { console.log(err); });
  },
  fetchAllPostsByFollow({ commit }) {
    const { userId } = JSON.parse(localStorage.getItem('user'));
    http.get(`/posts/${userId}`, { headers: authHeader() })
      .then((res) => {
        commit('setAllPosts', res.data);
      })
      .catch((err) => { console.log(err); });
  },
  fetchAllPostsBySubject({ commit }, id) {
    http.get(`/posts/subject/${id}`, { headers: authHeader() })
      .then((res) => {
        commit('setAllPosts', res.data);
      })
      .catch((error) => { console.log(error); });
  },
};

const mutations = {
  setAllPosts(state, posts) {
    state.posts = posts;
  },
  newPost(state, createdPost) {
    console.log(createdPost);
    state.posts.unshift(createdPost);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
