<template>
<b-list-group id="conversationsList" class="flex-grow-1">
  <b-list-group-item
    v-for="(conversation, index) in allConversationsSortByNew"
    :key="index"
    href="#"
    :active="currentConversation === conversation.id"
    @click.once="readAllMessagesByConversation({ conversationId: conversation.id, page: 0 })"
    @click="handleClick(conversation.id)"
    class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center">
    <b-avatar
      :badge="isOnline(conversation.Users)"
      badge-variant="success"
      :src="participants(conversation.Users)[0].image_url"
      size="3.5rem"
      class="mr-3">
    </b-avatar>
    <div>
      <p class="m-0 h5">
        {{ participants(conversation.Users)[0].user_name }}
        <span v-if="participants(conversation.Users)[1]">, {{ participants(conversation.Users)[1].user_name }}</span>
        <span v-if="participants(conversation.Users).length > 3">, ...</span>
      </p>
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
      v-if="unreadMessages(conversation.Messages)"
      font-scale="1"
      class="ml-auto text-info">
    </b-icon-circle-fill>
  </b-list-group-item>
</b-list-group>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  name: 'ChatConversations',
  computed: {
    ...mapGetters([
      'allConversations',
      'userId',
      'allOnlineUsers',
      'currentConversation',
    ]),
    allConversationsSortByNew() {
      return this.allConversations.slice().sort((a, b) => {
        const x = a.Messages.length ? dayjs(a.Messages[a.Messages.length - 1].createdAt).unix() : 0;
        const y = b.Messages.length ? dayjs(b.Messages[b.Messages.length - 1].createdAt).unix() : 0;
        return y - x;
      });
    },
  },
  methods: {
    ...mapActions([
      'readAllMessagesByConversation',
    ]),
    ...mapMutations([
      'setCurrentConversation',
    ]),
    participants(users) {
      return users.filter((user) => user.id !== this.userId);
    },
    isOnline(users) {
      const otherUsers = users.filter((user) => user.id !== this.userId);
      const compare = this.allOnlineUsers.find((onlineUser) => (onlineUser.userId === otherUsers[0].id));
      return compare !== undefined;
    },
    unreadMessages(messages) {
      return messages.some((msg) => msg.read === false && msg.UserId !== this.userId);
    },
    formatDate(date) {
      return dayjs(date).fromNow();
    },
    handleClick(e) {
      this.setCurrentConversation(e);
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
