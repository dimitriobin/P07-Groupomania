import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = {
  subjects: [],
  follows: [],
};

const getters = {
  allSubjects: (state) => state.subjects,
  allFollows: (state) => state.follows,
  isFollowing: (state) => state.follows.length >= 3,
};

const actions = {
  fetchAllSubjects({ commit, dispatch }) {
    return http.get('/subjects', { headers: authHeader() })
      .then((res) => {
        commit('setSubjects', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
  follow({ commit, dispatch }, id) {
    const user = JSON.parse(localStorage.getItem('user'));
    return http.post(`/subjects/${id}/follow`, { userId: user.userId }, { headers: authHeader() })
      .then((response) => {
        commit('newFollow', response.data[0]);
        return Promise.resolve(response.data[0]);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
  unFollow({ commit, dispatch }, id) {
    const user = JSON.parse(localStorage.getItem('user'));
    return http.post(`/subjects/${id}/unfollow`, { userId: user.userId }, { headers: authHeader() })
      .then((response) => {
        commit('removeFollow', id);
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
  getFollows({ commit, dispatch }, userId) {
    return http.post('/subjects/follow', { userId }, { headers: authHeader() })
      .then((res) => {
        commit('setFollows', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data);
      });
  },
};

const mutations = {
  setSubjects(state, subjects) {
    state.subjects = subjects;
  },
  setFollows(state, follows) {
    state.follows = follows;
  },
  newFollow(state, follow) {
    state.follows.push(follow);
  },
  removeFollow(state, id) {
    let indexToRemove = '';
    state.follows.forEach((item, index) => {
      if (item.id === id) {
        indexToRemove = index;
      }
    });
    state.follows.splice(indexToRemove, 1);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
