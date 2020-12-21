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
});

const getters = {
  allPosts: (state) => state.posts,
  postPagination: (state) => state.pagination,
};
const actions = {
  addPost({ commit }, data) {
    return http.post('/posts', data, { headers: authHeader() })
      .then((res) => {
        commit('newPost', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
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
  fetchAllPosts({ commit }) {
    http.get('/posts', { headers: authHeader() })
      .then((res) => {
        commit('setAllPosts', res.data);
      })
      .catch((err) => { console.log(err); });
  },
  fetchAllPostsByFollow({ commit }, page) {
    const { userId } = JSON.parse(localStorage.getItem('user'));
    return http.get(`/posts/${userId}?page=${page}&size=10`, { headers: authHeader() })
      .then((res) => {
        const pagination = {
          currentPage: res.data.currentPage,
          lastPage: res.data.totalPages,
        };
        commit('addLoadedPosts', res.data.posts);
        commit('setPagination', pagination);
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
        commit('setPagination', pagination);
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
};

const mutations = {
  setAllPosts(state, posts) {
    state.posts = posts;
  },
  addLoadedPosts(state, loadedPosts) {
    state.posts.push(...loadedPosts);
  },
  setPagination(state, pagination) {
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
