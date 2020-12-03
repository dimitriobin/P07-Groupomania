import http from '../../http-common';

const state = {
  posts: [],
};

const getters = {
  allPosts: (state) => state.posts,
};
const actions = {
  fetchAllPosts({ commit }) {
    http.get('/posts')
      .then((res) => {
        console.log(res);
        commit('setAllPosts', res.data);
      })
      .catch((err) => console.log(err));
  },
};

const mutations = {
  setAllPosts: (state, posts) => (state.posts = posts),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
