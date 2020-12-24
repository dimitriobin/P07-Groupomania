import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import http from '../../http-common';
import authHeader from '../../services/auth-header';

dayjs.extend(relativeTime);

const state = () => ({
  posts: [],
  pagination: {
    lastPage: '',
    currentPage: '',
  },
  display: {
    subjectToDisplay: '',
    keyword: '',
  },
});

const getters = {
  allPosts: (state) => state.posts,
  postPagination: (state) => state.pagination,
  display: (state) => state.display,
};
const actions = {
  addPost({ commit }, data) {
    return http.post('/posts', data, { headers: authHeader() })
      .then((res) => {
        commit('newPost', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        const { message } = err.response.data.error.errors[0];
        return Promise.reject(message);
      });
  },
  updatePost({ commit }, { id, data }) {
    return http.put(`/posts/${id}`, data, { headers: authHeader() })
      .then((res) => {
        commit('changePost', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        const { message } = err.response.data.error.errors[0];
        return Promise.reject(message);
      });
  },
  displayBy({ commit }, { displayBy, keyword, subjectId }) {
    const subject = subjectId ? subjectId : null;
    const word = keyword ? keyword : null;
    commit('setDisplay', { displayBy, word, subject });
  },
  fetchAllPostsByKeyword({ commit }, { page, keyword }) {
    return http.get(`/posts?page=${page}&size=10&keyword=${keyword}`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        Promise.reject(err.response.data.message);
      });
  },
  fetchAllPostsByFollow({ commit }, { page, order }) {
    const { userId } = JSON.parse(localStorage.getItem('user'));
    return http.get(`/posts/${userId}?page=${page}&size=10&order=${order}`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        Promise.reject(err.response.data.message);
      });
  },
  fetchAllPostsBySubject({ commit }, { id, page }) {
    http.get(`/posts/subject/${id}?page=${page}&size=5`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        Promise.reject(err.response.data.message);
      });
  },
  removePost({ commit }, id) {
    return http.delete(`/posts/${id}`, { headers: authHeader() })
      .then((response) => {
        commit('removeOnePost', id);
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        Promise.reject(err.response.data);
      });
  },
  likePost({ commit }, id) {
    http.post(`/posts/${id}/like`, {}, { headers: authHeader() })
      .then((res) => {
        commit('addLike', res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },
  unlikePost({ commit, rootGetters }, id) {
    http.delete(`/posts/${id}/unlike`, { headers: authHeader() })
      .then(() => {
        const dataObj = {
          UserId: rootGetters.userId,
          PostId: id,
        };
        commit('removeLike', dataObj);
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};

const mutations = {
  setDisplay(state, displayObj) {
    state.display.displayBy = displayObj.displayBy;
    state.display.subjectToDisplay = displayObj.subject;
    state.display.keyword = displayObj.word;
  },
  setAllPosts(state, posts) {
    state.posts = posts;
  },
  addLoadedPosts(state, loadedPosts) {
    state.posts.push(...loadedPosts);
  },
  setPostPagination(state, pagination) {
    state.pagination.currentPage = pagination.currentPage;
    state.pagination.lastPage = pagination.lastPage;
  },
  newPost(state, createdPost) {
    state.posts.unshift(createdPost);
  },
  changePost(state, updatedPost) {
    let oldPostIndex = '';
    state.posts.forEach((item, index) => {
      if (item.id === updatedPost.id) {
        oldPostIndex = index;
      }
    });
    state.posts.splice(oldPostIndex, 1, updatedPost);
  },
  removeOnePost(state, id) {
    let oldPostIndex = '';
    state.posts.forEach((item, index) => {
      if (item.id === id) {
        oldPostIndex = index;
      }
    });
    state.posts.splice(oldPostIndex, 1);
  },
  addLike(state, data) {
    state.posts.forEach((post) => {
      if (post.id === parseInt(data.PostId, 10)) {
        post.Likes.push(data);
      }
    });
  },
  removeLike(state, data) {
    state.posts.forEach((post) => {
      if (post.id === parseInt(data.PostId, 10)) {
        post.Likes.forEach((like, index) => {
          if (like.UserId === data.UserId) {
            post.Likes.splice(index, 1);
          }
        });
      }
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
