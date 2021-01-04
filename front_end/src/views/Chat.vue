<template>
  <b-row tag="main" id ="chat" class="rounded-lg shadow h-100">
    <!-- users -->
    <b-col
      cols="12"
      lg="4"
      :class="{'d-none d-lg-flex': showConversation, 'd-flex': !showConversation}"
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
        <b-modal id="onlineUsers" title="Choisissez un collègue" hide-footer>
          <!-- online users -->
          <ChatUser
            :users="users"
            @selectedReceiver="openPrivateChat($event)" />
        </b-modal>
      </div>
    </b-col>
    <!-- chat section -->
    <b-col
      v-if="showConversation"
      class="h-100 d-flex flex-column justify-content-between align-items-stretch">
      <!-- chat header -->
      <div
        class="p-3 d-flex align-items-center">
        <b-icon-arrow-left
          font-scale="1.5"
          class="mr-3 d-lg-none"
          @click="showConversation = false">
        </b-icon-arrow-left>
        <b-avatar
          badge
          badge-variant="success"
          :src="getReceiver.image_url"
          size="2.5rem"
          class="mr-3">
        </b-avatar>
        <h2 class="h5 m-0">{{ getReceiver.user_name }}</h2>
      </div>
      <ChatMessages :messages="getMessages" />
      <!-- form message -->
      <form
        @submit="sendMessage($event)"
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
        @click="showConversation = true"
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
import { io } from 'socket.io-client';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Chat',
  components: {
    ChatUser,
    ChatMessages,
  },
  data() {
    return {
      showConversation: false,
      conversations: [],
      users: '',
      receiver: '',
      message: '',
      messages: [],
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'oneUser',
      'allUsers',
    ]),
    socket() {
      return io('http://localhost:3000', { query: `userId=${this.userId}` });
    },
    getReceiver() {
      return this.allUsers.filter((user) => user.id === this.receiver.userId)[0];
    },
    getMessages() {
      /* eslint max-len: "off" */
      return this.messages.filter((message) => (message.sender.userId === this.receiver.userId) || (message.sender.userId === this.userId && message.receiver.userId === this.receiver.userId));
    },
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'fetchAllUsers',
    ]),
    openPrivateChat(e) {
      this.receiver = e;
      this.showConversation = true;
      this.$bvModal.hide('onlineUsers');
    },
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit('privateMessage', {
        receiver: this.receiver,
        content: this.message,
      });
      this.message = '';
    },
  },
  mounted() {
    this.fetchUser(this.userId);
    this.fetchAllUsers();
    this.socket.on('onelineUsers', (users) => {
      this.users = users.filter((user) => user.userId !== this.userId);
    });
    this.socket.on('privateMessage', (msg) => {
      this.messages.push({
        ...msg,
        sender: {
          userId: msg.sender.userId,
          socketId: msg.sender.socketId,
        },
      });
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
