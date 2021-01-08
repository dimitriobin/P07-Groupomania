<template>
<b-list-group id="conversationsList" class="flex-grow-1">
  <b-list-group-item
    v-for="(conversation, index) in allConversationsSortByNew"
    :key="index"
    href="#"
    :active="currentConversation.id === conversation.id"
    @click="fetchConversation(conversation.id)"
    class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center">
    <b-avatar
      :badge="isOnline(receiver(conversation).id)"
      badge-variant="success"
      :src="receiver(conversation).image_url"
      size="3.5rem"
      class="mr-3">
    </b-avatar>
    <div>
      <p class="m-0 h5">{{ receiver(conversation).user_name }}</p>
      <p
        v-if="conversation.Messages.length"
        class="text-muted m-0">
        {{ conversation.Messages[0].content }} ...
      </p>
    </div>
    <b-icon-circle-fill
      v-if="conversation.Messages.length && !conversation.Messages[0].read"
      font-scale="1"
      class="ml-auto text-info">
    </b-icon-circle-fill>
  </b-list-group-item>
</b-list-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'ChatConversations',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters([
      'allMessages',
      'allConversations',
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
      'fetchConversations',
      'fetchConversation',
    ]),
    receiver(conversation) {
      return conversation.userOneId === this.userId ? conversation.userTwo : conversation.userOne;
    },
    isOnline(userId) {
      const compare = this.allOnlineUsers.find((user) => (user.userId === userId));
      return compare !== undefined;
    },
  },
  mounted() {
    this.fetchConversations();
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
