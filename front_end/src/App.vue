<template>
  <div id="app" class="h-100">
    <Header v-if="isLogged" />
    <b-container class="p-4 h-100">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
  },
  watch: {
    $route(to, from) {
      if (from.path === '/chat' && to.path !== '/chat') {
        if (this.currentConversation !== 0) {
          this.setCurrentConversation(0);
        }
        // this.socket('unsubscribe')
      }
    },
    unreadCount(newVal) {
      if (newVal > 0) {
        document.title = `(${newVal}) Groupomania`;
      } else {
        document.title = 'Groupomania';
      }
    },
  },
  computed: {
    ...mapGetters([
      'loggedUser',
      'userId',
      'socket',
      'currentConversation',
      'unreadCount',
    ]),
    isLogged() {
      return this.loggedUser.status.loggedIn;
    },
  },
  methods: {
    ...mapActions([
      'updateConversationAsRead',
      'getUnreadMessagesCount',
    ]),
    ...mapMutations([
      'setSocket',
      'setCurrentConversation',
      'setOnlineUsers',
      'addConversation',
      'addOneMessage',
      'replaceMessage',
      'incrementUnreadCount',
    ]),
  },
  mounted() {
    if (this.loggedUser.status.loggedIn === true) {
      // this.setSocket(`http://localhost:3000?userId=${this.userId}`);
      this.setSocket({ query: { userId: this.userId} });
      this.socket.on('onlineUsers', (users) => this.setOnlineUsers(users));
      this.socket.on('newConversation', (conv) => {
        this.addConversation(conv);
        this.socket.emit('subscribe', conv.id);
      });
      this.socket.on('message', (msg) => {
        this.addOneMessage(msg);
        if (this.currentConversation === msg.ConversationId) {
          this.updateConversationAsRead(msg.ConversationId);
        } else {
          this.incrementUnreadCount();
        }
      });
      this.socket.on('lastMessageRead', (msg) => {
        this.replaceMessage(msg);
      });
    }
  },
};
</script>

<style>
#app {
  box-sizing: border-box;
  padding-top: 100px;
}

@media screen and (min-width: 576px) {
  #app {
    padding-top: 60px;
  }
}
</style>
