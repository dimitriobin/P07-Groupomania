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
    http.post(`/subjects/${id}/follow`, { userId: user.userId }, { headers: authHeader() })
      .then((response) => {
        commit('newFollow', response.data[0]);
        return Promise.resolve(response.data);
      })
      .catch((error) => Promise.reject(error.response.data));
  },
  unFollow({ commit }, id) {
    const user = JSON.parse(localStorage.getItem('user'));
    http.post(`/subjects/${id}/unfollow`, { userId: user.userId }, { headers: authHeader() })
      .then(() => {
        commit('removeFollow', id);
      });
  },
  getFollows({ commit }, userId) {
    http.post('/subjects/follow', { UserId: userId }, { headers: authHeader() })
      .then((res) => {
        commit('setFollows', res.data);
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
    state.follows.splice(state.follows.indexOf(id), 1);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
