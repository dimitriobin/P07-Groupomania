import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = () => ({
  comments: [],
});

const getters = {
  allComments: (state) => state.comments,
};

const actions = {
  addComment({ commit }, data) {
    http.post('/comments/', data, { headers: authHeader() })
      .then((res) => {
        commit('injectComments', res.data);
      })
      .catch((err) => console.log(err));
  },
  fetchAllCommentsByPost({ commit }, postId) {
    http.get(`/comments/post/${postId}`, { headers: authHeader() })
      .then((res) => {
        commit('addComments', res.data);
      })
      .catch((err) => console.log(err));
  },
};

const mutations = {
  addComments(state, comments) {
    state.comments.push(...comments);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
