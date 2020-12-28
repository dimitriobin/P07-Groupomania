import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = () => ({
  comments: [],
  commentsPagination: [],
});

const getters = {
  allComments: (state) => state.comments,
};

const actions = {
  addComment({ commit }, data) {
    return http.post('/comments/', data, { headers: authHeader() })
      .then((res) => {
        commit('addComment', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => Promise.reject(err.response.data.error.errors[0].message));
  },
  fetchAllCommentsByPost({ commit }, { id, page }) {
    return http.get(`/comments/post/${id}?page=${page}`, { headers: authHeader() })
      .then((res) => {
        commit('setComments', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => Promise.reject(err.response.data));
  },
  updateComment({ commit }, { id, data }) {
    return http.put(`/comments/${id}`, data, { headers: authHeader() })
      .then((res) => {
        commit('replaceComment', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => Promise.reject(err.response.data.error.errors[0].message));
  },
  deleteComment({ commit }, id) {
    return http.delete(`/comments/${id}`, { headers: authHeader() })
      .then((res) => {
        commit('removeComment', id);
        return Promise.resolve(res.data);
      })
      .catch((err) => Promise.reject(err.response.data));
  },
};

const mutations = {
  setComments(state, comments) {
    comments.comments.forEach((item) => {
      if (!state.comments.find((comment) => comment.id === item.id)) {
        state.comments.push(item);
      }
    });
  },
  addComment(state, comment) {
    state.comments.unshift(comment);
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
  removeComment(state, id) {
    let commentIndex = '';
    state.comments.forEach((item, index) => {
      if (item.id === id) {
        commentIndex = index;
      }
    });
    state.comments.splice(commentIndex, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
