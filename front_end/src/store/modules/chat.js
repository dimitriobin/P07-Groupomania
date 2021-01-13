import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = () => ({
  onlineUsers: [],
  conversations: [],
  currentConversation: 0,
  unreadMessages: '',
});

const getters = {
  allOnlineUsers: (state) => state.onlineUsers,
  allConversations: (state) => state.conversations,
  currentConversation: (state) => state.currentConversation,
  unreadMessagesCount: (state) => state.unreadMessages,
};

const actions = {
  getOnlineUsers({ commit }, users) {
    commit('setOnlineUsers', users);
  },
  addMessage({ commit, state, dispatch }, message) {
    return http.post(`/conversations/${state.currentConversation}/message`, message, { headers: authHeader() })
      .then((res) => {
        commit('addNewMessage', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  addConversation({ commit, dispatch }, conversation) {
    return http.post('/conversations', JSON.stringify(conversation), { headers: authHeader() })
      .then((res) => {
        if (res.data[1] === true) commit('addNewConversation', { ...res.data[0], Messages: [] });
        commit('setCurrentConversation', res.data[0].id);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') {
          dispatch('logout');
        }
        return Promise.reject(err.response.data);
      });
  },
  fetchConversations({ commit, dispatch }) {
    return http.get('/conversations', { headers: authHeader() })
      .then((res) => {
        commit('setConversations', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  changeCurrentConversation({ commit }, conversationId) {
    commit('setCurrentConversation', conversationId);
  },
  fetchConversation({ commit, dispatch }, conversationId) {
    http.get(`/conversations/${conversationId}`, { headers: authHeader() })
      .then((res) => {
        if (res.data.Messages.length) {
          commit('addMessages', res.data.Messages);
        }
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
      });
  },
  updateMessage({ commit, dispatch }, message) {
    return http.put(`/conversations/message/${message.id}`, message.modifications, { headers: authHeader() })
      .then((res) => {
        commit('replaceMessage', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  updateMessages({ commit, dispatch }, { convId, update }) {
    return http.put(`/conversations/${convId}/message`, update, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        res.data.forEach((msg) => {
          commit('replaceMessage', msg);
        });
        dispatch('getUnreadMessagesCount');
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
  resetCurrentConversation({ commit }) {
    commit('setCurrentConversation', '');
  },
  displayMessage({ commit, state, dispatch }, msg) {
    if (state.currentConversation === msg.res.conversationId) {
      commit('addNewMessage', msg.res);
      return dispatch('updateMessage', {
        id: msg.res.id,
        modifications: {
          read: true,
        },
      }).then((res) => Promise.resolve(res));
    }
    commit('addNewMessage', msg.res);
    return 'New unread message';
  },
  displayConversation({ commit }, conversation) {
    commit('addNewConversation', conversation);
  },
  changeStateOfMessage({ commit }, message) {
    commit('replaceMessage', message);
  },
  getUnreadMessagesCount({ commit, dispatch }) {
    return http.get('/conversations/message/unread', { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        commit('setUnreadMessages', res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data === 'Please login') dispatch('logout');
        return Promise.reject(err.response.data.error.errors[0].message);
      });
  },
};

const mutations = {
  setOnlineUsers(state, users) {
    state.onlineUsers = users;
  },
  setConversations(state, conversations) {
    conversations.forEach((conv) => {
      const convObject = {
        ...conv,
        users: JSON.parse(conv.users),
      };
      state.conversations.push(convObject);
    });
  },
  setCurrentConversation(state, conversation) {
    state.currentConversation = conversation;
  },
  addNewConversation(state, conversation) {
    const convObject = {
      ...conversation,
      users: JSON.parse(conversation.users),
    };
    state.conversations.push(convObject);
  },
  addMessages(state, messages) {
    // For each conversation
    state.conversations.forEach((conv) => {
      // Find the good one
      if (conv.id === messages[0].conversationId) {
        // then for each message
        messages.forEach((message) => {
          // unshift it in this conversation
          conv.Messages.push(message);
        });
      }
    });
  },
  addNewMessage(state, message) {
    state.conversations.forEach((conv) => {
      if (conv.id === message.conversationId) {
        conv.Messages.push(message);
      }
    });
  },
  replaceMessage(state, newMessage) {
    state.conversations.forEach((conversation) => {
      if (conversation.id === newMessage.conversationId) {
        conversation.Messages.forEach((message, index) => {
          if (message.id === newMessage.id) {
            conversation.Messages.splice(index, 1, newMessage);
          }
        });
      }
    });
  },
  setUnreadMessages(state, count) {
    state.unreadMessages = count;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
