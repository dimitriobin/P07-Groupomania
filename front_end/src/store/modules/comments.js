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
    return http.post('/comments/', data, { headers: authHeader() })
      .then((res) => {
        commit('addComments', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => Promise.reject(err.response.data.message));
  },
  fetchAllCommentsByPost({ commit }, postId) {
    http.get(`/comments/post/${postId}`, { headers: authHeader() })
      .then((res) => {
        commit('addComments', res.data);
      })
      .catch((err) => console.log(err));
  },
  updateComment({ commit }, { id, data }) {
    return http.put(`/comments/${id}`, data, { headers: authHeader() })
      .then((res) => {
        commit('replaceComment', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => Promise.reject(err.response.data.error.errors[0].message));
  },
};

const mutations = {
  addComments(state, comments) {
    comments.forEach((comment) => {
      state.comments.push(comment);
    });
  },
  replaceComment(state, comment) {
    let oldIndex = '';
    state.comments.forEach((item, index) => {
      if (item.id === comment.id) {
        oldIndex = index;
      }
    });
    state.comments.splice(oldIndex, 1, comment);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
