import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = {
  subjects: [],
};

const getters = {
  allSubjects: (state) => state.subjects,
};

const actions = {
  fetchAllSubjects({ commit }) {
    http.get('/subjects', { headers: authHeader() })
      .then((res) => {
        commit('setSubjects', res.data);
      })
      .catch((error) => console.log(error));
  },
};

const mutations = {
  setSubjects(state, subjects) {
    state.subjects = subjects;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
