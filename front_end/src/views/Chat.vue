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
            aria-label="Démarrer une conversation avec un collègue"
            class="text-dark"
            font-scale="1.5">
          </b-icon-pencil-square>
        </b-button>
        <b-modal
          id="onlineUsers"
          title="Avec qui voulez-vous discutter ?"
          hide-footer
          centered
          scrollable
          content-class="h-100">
          <!-- online users -->
          <ChatUser @conversationCreated="$bvModal.hide('onlineUsers')"/>
        </b-modal>
      <!-- Conversations overview -->
      </div>
      <ChatConversations />
    </b-col>
    <!-- chat section -->
    <b-col
      v-if="currentConversation !== 0"
      class="h-100 d-flex flex-column justify-content-between align-items-stretch">
      <ChatHeader />
      <ChatMessages />
      <!-- form message -->
      <form
        @submit="sendMessage"
        class="d-flex justify-content-between align-items-center position-relative">
        <b-form-input
          aria-label="Envoyer un nouveau message"
          v-model="message"
          class="my-3 w-100">
        </b-form-input>
        <b-button type="submit" variant="link" class="input__btn">Envoyer</b-button>
      </form>
    </b-col>
    <b-col
      v-else
      class="h-100 d-none d-lg-flex flex-column justify-content-center align-items-center">
      <h2>Vos messages</h2>
      <p>Créer une nouvelle conversation avec vos collègues </p>
      <b-button
        @click="$bvModal.show('onlineUsers')"
        variant="dark"
        pill>
        Créer une conversation
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import ChatUser from '@/components/Chat/ChatUser.vue';
import ChatMessages from '@/components/Chat/ChatMessages.vue';
import ChatConversations from '@/components/Chat/ChatConversations.vue';
import ChatHeader from '@/components/Chat/ChatHeader.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Chat',
  components: {
    ChatUser,
    ChatMessages,
    ChatConversations,
    ChatHeader,
  },
  data() {
    return {
      message: '',
    };
  },
  watch: {
    currentConversation(newValue) {
      this.socket.emit('subscribe', this.currentConversation);
      if (this.currentConversation !== 0) {
        this.updateConversationAsRead(newValue)
          .then((res) => {
            if (this.unreadCount > 0) {
              const [updatedCount] = res.updated;
              this.setUnreadCount(this.unreadCount - updatedCount);
            }
          });
      }
    },
  },
  computed: {
    ...mapGetters([
      'userId',
      'currentConversation',
      'socket',
      'unreadCount',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'fetchAllUsers',
      'createMessage',
      'updateConversationAsRead',
    ]),
    ...mapMutations([
      'addOneMessage',
      'addConversation',
      'setOnlineUsers',
      'replaceMessage',
      'setUnreadCount',
    ]),
    sendMessage(e) {
      e.preventDefault();
      this.createMessage({ content: this.message });
      this.message = '';
    },
  },
  mounted() {
    this.fetchUser(this.userId);
    this.fetchAllUsers();
    this.socket.on('onlineUsers', (users) => this.setOnlineUsers(users));
    this.socket.on('newConversation', (conv) => {
      this.addConversation(conv);
      this.socket.emit('subscribe', conv.id);
    });
    this.socket.on('message', (msg) => {
      this.addOneMessage(msg);
      if (this.currentConversation === msg.ConversationId) {
        this.updateConversationAsRead(msg.ConversationId);
      }
    });
    this.socket.on('lastMessageRead', (msg) => {
      this.replaceMessage(msg);
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
