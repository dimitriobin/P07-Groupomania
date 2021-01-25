<template>
  <div
    id="chatMessages"
    class="pt-0 px-sm-3 px-md-4 d-flex flex-column justify-content-between align-items-stretch">
    <LazyLoadingScroll
      v-if="conversation.Messages.length && conversation.Messages.length < conversation.totalMessages"
      @loadMore="handleLoading($event)" />
    <p v-else class="text-center my-4 text-muted">Fin des messages</p>
    <p
      v-for="(message, index) in conversation.Messages"
      :key="index"
      class="d-flex flex-column justify-content-center align-items-start">
        <span
          v-b-tooltip.hover :title="formatDate(message.createdAt)"
          :class="{ 'message-sent': message.UserId === userId }"
          class="bg-light px-4 py-2 rounded-pill w-auto text-break mw-70">
          {{ message.content }}
        </span>
        <span
          v-if="lastMessageSent && lastMessageSent.id === message.id && message.read === true && message.UserId === userId"
          class="align-self-end">
          <b-icon-check-all>
          </b-icon-check-all>
          <small>
            vu le {{formatDate(message.updatedAt)}}
          </small>
        </span>
        <span
          v-if="index === conversation.Messages.length - 1 && message.read === false && message.UserId === userId"
          class="align-self-end">
          <b-icon-check>
          </b-icon-check>
          <small>
            envoyé le {{formatDate(message.createdAt)}}
          </small>
        </span>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LazyLoadingScroll from '@/components/LazyLoadingScroll.vue';
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);
dayjs.locale(fr);

export default {
  name: 'ChatMessages',
  components: {
    LazyLoadingScroll,
  },
  data() {
    return {
      down: true,
    };
  },
  watch: {
    currentConversation() {
      this.down = true;
    },
  },
  computed: {
    ...mapGetters([
      'userId',
      'allConversations',
      'currentConversation',
      'socket',
    ]),
    conversation() {
      return this.allConversations.filter((conversation) => conversation.id === this.currentConversation)[0];
    },
    lastMessageSent() {
      const messages = this.conversation.Messages.filter((msg) => msg.UserId === this.userId);
      const [lastMessage] = messages.slice().sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
      return lastMessage;
    },
  },
  methods: {
    ...mapActions([
      'readAllMessagesByConversation',
    ]),
    scrollDown() {
      const chatMessages = document.querySelector('#chatMessages');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    },
    scrollAdjust() {
      const chatMessages = document.querySelector('#chatMessages');
      chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.scrollTop;
    },
    formatDate(date) {
      return dayjs(date).format('LLL');
    },
    handleLoading(e) {
      this.down = false;
      this.readAllMessagesByConversation({ conversationId: this.conversation.id, page: e })
        .then(() => {
          this.down = true;
        });
    },
  },
  mounted() {
    // this.socket.on('message', (msg) => {
    //   console.log(msg.ConversationId);
    //   if (msg.ConversationId === this.currentConversation) {
    //     this.scrollDown();
    //   }
    // });
  },
  updated() {
    if (this.down) {
      this.scrollDown();
    } else {
      this.scrollAdjust();
    }
  },
};
</script>

<style scoped>
#chatMessages {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.message-sent {
  text-align: right;
  background: rgba(0, 179, 217, 0.1) !important;
  width: auto !important;
  align-self: flex-end;
}

.messages-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.mw-70 {
  max-width: 70%;
}
</style>
