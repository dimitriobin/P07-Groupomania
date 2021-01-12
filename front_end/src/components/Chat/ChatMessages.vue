<template>
  <div id="chatMessages" class="px-4 pt-0">
    <p
      v-for="(message, index) in conversation"
      :key="index"
      class="d-flex flex-column justify-content-center align-items-start">
        <!-- <span
          class="align-self-center text-muted">
          <small>{{ formatDate(message.updatedAt) }}</small>
        </span> -->
        <span
          v-if="index !== 0"
          v-b-tooltip.hover :title="formatDate(message.createdAt)"
          :class="{ 'message-sent': message.userId === userId }"
          class="bg-light px-4 py-2 rounded-pill w-auto text-break mw-70">
          {{ message.content }}
        </span>
        <span
          v-if="index === conversation.length - 1 && message.read === true"
          class="align-self-end">
          <b-icon-check-all>
          </b-icon-check-all>
          <small>
            vu le {{formatDate(message.updatedAt)}}
          </small>
        </span>
        <span
          v-if="index === conversation.length - 1 && message.read === false"
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
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);
dayjs.locale(fr);

export default {
  name: 'ChatMessages',
  computed: {
    ...mapGetters([
      'userId',
      'allConversations',
      'currentConversation',
    ]),
    conversation() {
      return this.allConversations.filter((conversation) => conversation.id === this.currentConversation)[0].Messages;
    },
  },
  methods: {
    scrollDown() {
      const chatMessages = document.querySelector('#chatMessages');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    },
    formatDate(date) {
      return dayjs(date).format('LLL');
    },
  },
  mounted() {
    this.scrollDown();
  },
  updated() {
    this.scrollDown();
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

.mw-70 {
  max-width: 70%;
}
</style>
