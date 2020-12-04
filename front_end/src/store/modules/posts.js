import http from '../../http-common';

const state = () => ({
  posts: [],
});

const getters = {
  allPosts: (state) => state.posts,
};
const actions = {
  addPost({ commit }, data) {
    http.post('/posts', data)
      .then((res) => {
        commit('newPost', res.data);
      })
      .catch((err) => { console.log(err); });
  },
  fetchAllPosts({ commit }) {
    http.get('/posts')
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
