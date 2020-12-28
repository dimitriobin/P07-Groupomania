import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import http from '../../http-common';
import authHeader from '../../services/auth-header';

dayjs.extend(relativeTime);

const state = () => ({
  posts: [],
  pagination: {
    lastPage: '',
    currentPage: 0,
  },
  displayBy: 'new',
  displayInformations: '',
});

const getters = {
  allPosts: (state) => state.posts,
  postPagination: (state) => state.pagination,
  displayBy: (state) => state.displayBy,
  displayInformations: (state) => state.displayInformations,
};
const actions = {
  addPost({ commit, dispatch }, data) {
    return http.post('/posts', data, { headers: authHeader() })
      .then((res) => {
        commit('newPost', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        const { message } = err.response.data.error.errors[0];
        return Promise.reject(message);
      });
  },
  updatePost({ commit, dispatch }, { id, data }) {
    return http.put(`/posts/${id}`, data, { headers: authHeader() })
      .then((res) => {
        commit('changePost', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        const { message } = err.response.data.error.errors[0];
        return Promise.reject(message);
      });
  },
  // fetchAllPostsByNew
  fetchAllPostsByNew({ commit, dispatch }, page) {
    const { userId } = JSON.parse(localStorage.getItem('user'));
    return http.get(`/posts/${userId}?page=${page}&size=8&order=new`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          totalPosts: res.data.totalItems,
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        commit('setDisplay', 'new');
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
  fetchAllPostsByTop({ commit, dispatch }, page) {
    const { userId } = JSON.parse(localStorage.getItem('user'));
    return http.get(`/posts/${userId}?page=${page}&size=8&order=top`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          totalPosts: res.data.totalItems,
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        commit('setDisplay', 'top');
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
  fetchAllPostsByHot({ commit, dispatch }, page) {
    const { userId } = JSON.parse(localStorage.getItem('user'));
    return http.get(`/posts/${userId}?page=${page}&size=8&order=hot`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          totalPosts: res.data.totalItems,
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        commit('setDisplay', 'hot');
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
  fetchAllPostsByOneSubject({ commit, dispatch }, { id, page }) {
    return http.get(`/posts/subject/${id}?page=${page}&size=8`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          totalPosts: res.data.totalItems,
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        commit('setDisplay', `subject_${id}`);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
  fetchAllPostsByKeyword({ commit, dispatch }, { page, keyword }) {
    return http.get(`/posts?page=${page}&size=10&keyword=${keyword}`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          totalPosts: res.data.totalItems,
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        commit('setDisplay', `keyword_${keyword}`);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
  fetchAllPostsByOneUser({ commit, dispatch }, { id, page }) {
    http.get(`/posts/user/${id}?page=${page}&size=8`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          totalPosts: res.data.totalItems,
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        if (page === 0) {
          commit('setAllPosts', res.data.posts);
        } else {
          commit('addLoadedPosts', res.data.posts);
        }
        commit('setPostPagination', pagination);
        commit('setDisplay', `user_${id}`);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
  removePost({ commit, dispatch }, id) {
    return http.delete(`/posts/${id}`, { headers: authHeader() })
      .then((response) => {
        commit('removeOnePost', id);
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
  likePost({ commit, dispatch }, id) {
    http.post(`/posts/${id}/like`, {}, { headers: authHeader() })
      .then((res) => {
        commit('addLike', res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
  unlikePost({ commit, dispatch, rootGetters }, id) {
    http.delete(`/posts/${id}/unlike`, { headers: authHeader() })
      .then(() => {
        const dataObj = {
          UserId: rootGetters.userId,
          PostId: id,
        };
        commit('removeLike', dataObj);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        Promise.reject(err.response.data);
      });
  },
};

const mutations = {
  setDisplay(state, displayBy) {
    if (displayBy.split('_')[1]) {
      /* eslint prefer-destructuring: "off" */
      state.displayInformations = displayBy.split('_')[1];
    }
    state.displayBy = displayBy.split('_')[0];
  },
  setAllPosts(state, posts) {
    state.posts = posts;
  },
  addLoadedPosts(state, loadedPosts) {
    state.posts.push(...loadedPosts);
  },
  setPostPagination(state, pagination) {
    state.pagination = pagination;
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
