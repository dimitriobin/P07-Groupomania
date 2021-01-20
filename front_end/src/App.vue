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
  computed: {
    ...mapGetters([
      'loggedUser',
      'userId',
      'socket',
      'currentConversation',
    ]),
    isLogged() {
      return this.loggedUser.status.loggedIn;
    },
  },
  methods: {
    ...mapActions([
      'updateConversationAsRead',
      'readAllConversations',
    ]),
    ...mapMutations([
      'setSocket',
      'addOneMessage',
      'incrementUnreadCount',
    ]),
  },
  mounted() {
    this.setSocket(`http://localhost:3000?userId=${this.userId}`);
    this.readAllConversations();
    this.socket.on('message', (msg) => {
      if (this.currentConversation !== msg.ConversationId) {
        this.incrementUnreadCount();
      }
    });
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
