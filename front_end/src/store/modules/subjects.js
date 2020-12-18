import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = {
  subjects: [],
  follows: [],
};

const getters = {
  allSubjects: (state) => state.subjects,
  allFollows: (state) => state.follows,
};

const actions = {
  fetchAllSubjects({ commit }) {
    http.get('/subjects', { headers: authHeader() })
      .then((res) => {
        commit('setSubjects', res.data);
        return Promise.resolve(res.data);
      })
      .catch((error) => Promise.resolve(error));
  },
  follow({ commit }, id) {
    const user = JSON.parse(localStorage.getItem('user'));
    return http.post(`/subjects/${id}/follow`, { userId: user.userId }, { headers: authHeader() })
      .then((response) => {
        commit('newFollow', response.data[0]);
        return Promise.resolve(response.data[0]);
      })
      .catch((error) => Promise.reject(error.response.data));
  },
  unFollow({ commit }, id) {
    const user = JSON.parse(localStorage.getItem('user'));
    return http.post(`/subjects/${id}/unfollow`, { userId: user.userId }, { headers: authHeader() })
      .then((response) => {
        commit('removeFollow', id);
        return Promise.resolve(response.data);
      })
      .catch((error) => Promise.reject(error.response.data));
  },
  getFollows({ commit }, userId) {
    return http.post('/subjects/follow', { userId }, { headers: authHeader() })
      .then((res) => {
        commit('setFollows', res.data);
        return Promise.resolve(res.data);
      })
      .catch((error) => Promise.reject(error));
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
