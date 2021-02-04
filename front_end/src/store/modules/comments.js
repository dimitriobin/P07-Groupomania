import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = () => ({
  comments: [],
});

const getters = {
  allComments: (state) => state.comments,
  CommentsForOnePost: (state) => (postId) => state.comments.find((item) => item.postId === postId),
};

const actions = {
  addComment({ commit, dispatch }, data) {
    return http.post('/comments/', data, { headers: authHeader() })
      .then((res) => {
        commit('addComment', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  fetchAllCommentsByPost({ commit, dispatch }, { id, page }) {
    return http.get(`/comments/post/${id}?page=${page}`, { headers: authHeader() })
      .then((res) => {
        const data = {
          ...res.data,
          postId: id,
        };
        commit('setComments', data);
        return Promise.resolve(data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
  updateComment({ commit, dispatch }, { id, data }) {
    return http.put(`/comments/${id}`, data, { headers: authHeader() })
      .then((res) => {
        commit('replaceComment', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  deleteComment({ commit, dispatch }, id) {
    return http.delete(`/comments/${id}`, { headers: authHeader() })
      .then((res) => {
        commit('removeComment', id);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
};

const mutations = {
  setComments(state, data) {
    if (state.comments.find((item) => item.postId === data.postId)) {
      state.comments.forEach((item, index) => {
        if (item.postId === data.postId) {
          state.comments[index].comments = [...state.comments[index].comments, ...data.comments];
          state.comments[index].currentPage = data.currentPage;
        }
      });
    } else {
      state.comments.push(data);
    }
  },
  addComment(state, data) {
    state.comments.forEach((comment, index) => {
      if (comment.postId === data.post_id) {
        comment.comments.unshift(data);
        state.comments[index].totalItems += 1;
      }
    });
  },
  replaceComment(state, data) {
    state.comments.forEach((item, itemIndex) => {
      item.comments.forEach((comment, index) => {
        if (comment.id === data.id) {
          state.comments[itemIndex].comments.splice(index, 1, data);
        }
      });
    });
  },
  removeComment(state, id) {
    state.comments.forEach((item, itemIndex) => {
      item.comments.forEach((comment, index) => {
        if (comment.id === id) {
          state.comments[itemIndex].comments.splice(index, 1);
          state.comments[itemIndex].totalItems -= 1;
        }
      });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
