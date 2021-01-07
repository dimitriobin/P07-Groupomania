<template>
<b-list-group id="conversationsList" class="flex-grow-1">
  <b-list-group-item
    v-for="(conversation, index) in allConversations"
    :key="index"
    href="#"
    @click="fetchConversation(conversation.id)"
    class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center">
    <b-avatar
      :src="receiver(conversation).image_url"
      size="3.5rem"
      class="mr-3">
    </b-avatar>
    <div>
      <p class="m-0 h5">{{ receiver(conversation).user_name }}</p>
    </div>
  </b-list-group-item>
</b-list-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
    ]),
  },
  methods: {
    ...mapActions([
      'fetchConversations',
      'fetchConversation',
    ]),
    receiver(conversation) {
      return conversation.userOneId === this.userId ? conversation.userTwo : conversation.userOne;
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
</style>
