<template>
<b-list-group id="conversationsList" class="flex-grow-1">
  <b-list-group-item
    v-for="(conversation, index) in allConversationsSortByNew"
    :key="index"
    href="#"
    :active="currentConversation === conversation.id"
    @click.once="fetchConversation(conversation.id)"
    @click="changeCurrentConversation(conversation.id)"
    class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center">
    <b-avatar
      :badge="isOnline(receiver(conversation.users).id)"
      badge-variant="success"
      :src="receiver(conversation.users).image_url"
      size="3.5rem"
      class="mr-3">
    </b-avatar>
    <div>
      <p class="m-0 h5">{{ receiver(conversation.users).user_name }}</p>
      <p
        v-if="conversation.Messages.length"
        class="text-muted m-0">
        {{ conversation.Messages[conversation.Messages.length - 1].content }}
      </p>
      <small
        v-if="conversation.Messages.length">
        {{ formatDate(conversation.Messages[conversation.Messages.length - 1].createdAt) }}
      </small>
    </div>
    <b-icon-circle-fill
      v-if="lastMessageUnread(conversation.Messages)"
      font-scale="1"
      class="ml-auto text-info">
    </b-icon-circle-fill>
  </b-list-group-item>
</b-list-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'ChatConversations',
  computed: {
    ...mapGetters([
      'allMessages',
      'allConversations',
      'allUsers',
      'userId',
      'allOnlineUsers',
      'currentConversation',
    ]),
    allConversationsSortByNew() {
      return this.allConversations.slice().sort((a, b) => {
        const x = a.Messages.length ? dayjs(a.Messages[0].createdAt).unix() : 0;
        const y = b.Messages.length ? dayjs(b.Messages[0].createdAt).unix() : 0;
        return y - x;
      });
    },
  },
  methods: {
    ...mapActions([
      'fetchConversation',
      'changeCurrentConversation',
    ]),
    receiver(users) {
      const receiver = users.filter((user) => user !== this.userId)[0];
      return this.allUsers.filter((user) => user.id === receiver)[0];
    },
    isOnline(userId) {
      const compare = this.allOnlineUsers.find((user) => (user.userId === userId));
      return compare !== undefined;
    },
    lastMessageUnread(messages) {
      return (messages.length && !messages[messages.length - 1].read && messages[messages.length - 1].userId !== this.userId);
    },
    formatDate(date) {
      return dayjs(date).fromNow();
    },
  },
};
</script>

<style scoped>
#conversationsList {
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 1rem 0;
}

.active {
  background: rgba(220, 53, 69, 0.1) !important;
}
</style>
