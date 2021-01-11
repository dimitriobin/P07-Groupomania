<template>
  <b-row tag="main" id ="chat" class="rounded-lg shadow h-100">
    <!-- users -->
    <b-col
      cols="12"
      lg="4"
      :class="{'d-none d-lg-flex': currentConversation, 'd-flex': !currentConversation}"
      class="h-100 border-right flex-column justify-content-between">
      <!-- users header -->
      <div class="d-flex justify-content-between align-items-center p-2">
        <h1 class="h3">Discussions</h1>
        <b-button class="bg-transparent border-0" v-b-modal.onlineUsers>
          <b-icon-pencil-square
            class="text-dark"
            font-scale="1.5">
          </b-icon-pencil-square>
        </b-button>
        <b-modal
          id="onlineUsers"
          title="Choisissez un collègue"
          hide-footer
          centered
          scrollable
          content-class="h-100">
          <!-- online users -->
          <ChatUser @selected="createConversation($event)"/>
          <!-- <p v-else>Aucun collègue n'est en ligne actuellement</p> -->
        </b-modal>
      <!-- Conversations overview -->
      </div>
      <ChatConversations />
    </b-col>
    <!-- chat section -->
    <b-col
      v-if="currentConversation"
      class="h-100 d-flex flex-column justify-content-between align-items-stretch">
      <!-- chat header -->
      <div
        class="p-3 d-flex align-items-center">
        <b-button
          variant="link"
          class="text-dark">
          <b-icon-arrow-left
            font-scale="1.5"
            class="mr-3 d-lg-none"
            @click="resetCurrentConversation()">
          </b-icon-arrow-left>
        </b-button>
        <b-avatar
          badge
          badge-variant="success"
          :src="receiver.image_url"
          size="2.5rem"
          class="mr-3">
        </b-avatar>
        <h2 class="h5 m-0">{{ receiver.user_name }}</h2>
      </div>
      <ChatMessages />
      <!-- form message -->
      <form
        @submit="sendMessage"
        class="d-flex justify-content-between align-items-center position-relative">
        <b-form-input
          v-model="message"
          class="my-3 w-100">
        </b-form-input>
        <b-button type="submit" variant="link" class="input__btn">Envoyer</b-button>
      </form>
    </b-col>
    <b-col
      v-else
      class="h-100 d-flex flex-column justify-content-center align-items-center">
      <!-- chat header -->
      <h5>Vos messages</h5>
      <p>Envoyez des messages privés à vos collègues </p>
      <b-button
        @click="$bvModal.show('onlineUsers')"
        variant="info"
        pill>
        Envoyer un nouveau message
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import ChatUser from '@/components/Chat/ChatUser.vue';
import ChatMessages from '@/components/Chat/ChatMessages.vue';
import ChatConversations from '@/components/Chat/ChatConversations.vue';
import { io } from 'socket.io-client';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Chat',
  components: {
    ChatUser,
    ChatMessages,
    ChatConversations,
  },
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'oneUser',
      'allUsers',
      'allOnlineUsers',
      'currentConversation',
    ]),
    socket() {
      return io('http://localhost:3000', { query: `userId=${this.userId}` });
    },
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'fetchAllUsers',
      'getOnlineUsers',
      'addMessage',
      'displayMessage',
      'addConversation',
      'resetCurrentConversation',
      'updateMessage',
      'displayConversation',
    ]),
    createConversation(e) {
      this.$bvModal.hide('onlineUsers');
      this.addConversation([e, this.userId])
        .then((conversation) => {
          this.socket.emit('newConversation', { toUser: e, conversation });
        });
    },
    sendMessage(e) {
      e.preventDefault();
      const messageObject = {
        content: this.message,
      };
      this.addMessage(messageObject)
        .then((res) => {
          this.socket.emit('privateMessage', { res, toUser: this.receiver.id });
        });
      this.message = '';
    },
  },
  mounted() {
    this.fetchUser(this.userId);
    this.fetchAllUsers();
    // Listen to online users
    this.socket.on('onelineUsers', (users) => {
      const onlineUsers = users.filter((user) => user.userId !== this.userId);
      this.getOnlineUsers(onlineUsers);
    });
    // Listen to new conversations
    this.socket.on('newConversation', (conversation) => {
      this.displayConversation(conversation);
    });
    // Listen to private Messages
    this.socket.on('privateMessage', (msg) => {
      this.displayMessage(msg);
    });
  },
};
</script>

<style scoped>
#chat {
  height: 100%;
}

.input__btn {
  position: absolute;
  right: 10px;
}
</style>
