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
        console.log(res.data);
        commit('addComments', res.data);
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
    if (comments.length > 1) {
      state.comments.push(...comments);
    } else {
      state.comments.push(comments);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
