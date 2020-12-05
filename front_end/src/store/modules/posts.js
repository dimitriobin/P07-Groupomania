import http from '../../http-common';
import authHeader from '../../services/auth-header';

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
};

const mutations = {
  setAllPosts(state, posts) {
    state.posts = posts;
  },
  newPost(state, createdPost) {
    state.posts.unshift(createdPost);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
