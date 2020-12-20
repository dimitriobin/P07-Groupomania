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
    http.post('/posts', data, { headers: authHeader() })
      .then((res) => {
        commit('newPost', res.data);
      })
      .catch((err) => { console.log(err); });
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
