import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = {};
const getters = {};
const actions = {
  addComment({ commit }, data) {
    http.post('/comments/', data, { headers: authHeader() })
      .then((res) => {
        commit('newComment', res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },
};
const mutations = {
  // look for the right post
  // in the post, add the comment in the comments part
  newComment(state, comment) {
    console.log(state, comment);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
