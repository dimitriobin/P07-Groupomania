import { io } from 'socket.io-client';
import http from '../../http-common';
import authHeader from '../../services/auth-header';

const state = () => ({
  socket: '',
  onlineUsers: [],
  conversations: [],
  currentConversation: 0,
  unreadMessagesCount: '',
});

const getters = {
  socket: (state) => state.socket,
  allOnlineUsers: (state) => state.onlineUsers,
  allConversations: (state) => state.conversations,
  currentConversation: (state) => state.currentConversation,
  unreadCount: (state) => state.unreadMessagesCount,
};

const actions = {
  // create conversation
  createConversation({ state, commit, dispatch }, userArray) {
    return http.post('/conversations', { users: userArray }, { headers: authHeader() })
      .then((res) => {
        if (res.data.created) {
          state.socket.emit('newConversation', res.data.conversation);
          commit('addConversation', res.data.conversation);
        }
        commit('setCurrentConversation', res.data.conversation.id);
        dispatch('readAllMessagesByConversation', {
          conversationId: res.data.conversation.id,
          page: 0,
        });
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === 'Please login') dispatch('logout');
        Promise.reject(error.response.data);
      });
  },
  // create message
  createMessage({ state, commit, dispatch }, message) {
    return http.post(`/conversations/${state.currentConversation}/message`, message, { headers: authHeader() })
      .then((res) => {
        state.socket.emit('message', res.data);
        commit('addOneMessage', res.data);
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === 'Please login') dispatch('logout');
        Promise.reject(error.response.data);
      });
  },
  getUnreadMessagesCount({ commit, dispatch }) {
    return http.get('/conversations/messages/unread', { headers: authHeader() })
      .then((res) => {
        commit('setUnreadCount', res.data);
      })
      .catch((error) => {
        if (error.response.data === 'Please login') dispatch('logout');
        Promise.reject(error.response.data);
      });
  },
  // read all conversations
  readAllConversations({ state, commit, dispatch }) {
    return http.get('/conversations', { headers: authHeader() })
      .then((res) => {
        res.data.forEach((conversation) => {
          state.socket.emit('subscribe', conversation.id);
        });
        commit('setAllConversations', res.data);
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        if (error.response.data === 'Please login') dispatch('logout');
        Promise.reject(error.response.data);
      });
  },
  // read all messages for one conversation
  readAllMessagesByConversation({ commit, dispatch }, { conversationId, page }) {
    return http.get(`/conversations/${conversationId}?page=${page}`, { headers: authHeader() })
      .then((res) => {
        if (res.data.Messages.length) {
          commit('addMessageArray', res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === 'Please login') dispatch('logout');
        Promise.reject(error);
      });
  },
  // update all unread messages to read
  updateConversationAsRead({ state, commit, dispatch }, conversationId) {
    return http.put(`/conversations/${conversationId}/read`, {}, { headers: authHeader() })
      .then((res) => {
        if (res.data) {
          if (res.data.lastRead) {
            state.socket.emit('lastMessageRead', res.data.lastRead);
            commit('replaceMessage', res.data);
            commit('markAsRead', conversationId);
          }
        }
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === 'Please login') dispatch('logout');
        Promise.reject(error);
      });
  },
  // remove a participant
  removeParticipant() {},
  // delete a conversation
  deleteConversation() {},
};

const mutations = {
  setSocket(state, socket) {
    state.socket = io(socket);
  },
  setOnlineUsers(state, users) {
    state.onlineUsers = users;
  },
  setUnreadCount(state, count) {
    state.unreadMessagesCount = count;
  },
  incrementUnreadCount(state) {
    state.unreadMessagesCount += 1;
  },
  addConversation(state, newConversation) {
    state.conversations.push(newConversation);
  },
  setCurrentConversation(state, conversationId) {
    state.currentConversation = conversationId;
  },
  setAllConversations(state, conversations) {
    state.conversations = conversations;
  },
  addOneMessage(state, newMessage) {
    state.conversations.forEach((conversation) => {
      if (conversation.id === newMessage.ConversationId) {
        conversation.Messages.push(newMessage);
      }
    });
  },
  addMessageArray(state, data) {
    state.conversations.forEach((conv) => {
      if (conv.id === data.Messages[0].ConversationId) {
        if (data.currentPage === 0) {
          conv.Messages.splice(0, conv.Messages.length);
        }
        const pagination = {
          totalMessages: data.totalMessages,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        };
        Object.assign(conv, pagination);
        data.Messages.forEach((msg) => conv.Messages.unshift(msg));
      }
    });
  },
  replaceMessage(state, message) {
    state.conversations.forEach((conv) => {
      if (conv.id === message.ConversationId) {
        conv.Messages.forEach((msg, index) => {
          if (msg.id === message.id) {
            conv.Messages.splice(index, 1, message);
          }
        });
      }
    });
  },
  markAsRead(state, conversationId) {
    state.conversations.forEach((conv, convIndex) => {
      if (conv.id === conversationId) {
        conv.Messages.forEach((msg, msgIndex) => {
          state.conversations[convIndex].Messages[msgIndex].read = true;
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
