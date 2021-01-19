<template>
  <div
    class="p-5 d-flex align-items-center">
    <b-button
      variant="link"
      class="text-dark mr-3 mr-lg-0 d-lg-none">
      <b-icon-arrow-left
        font-scale="1.5"
        @click="setCurrentConversation(0)">
      </b-icon-arrow-left>
    </b-button>
    <b-avatar
      :src="otherUsers[0].image_url"
      size="2.5rem"
      class="mr-3">
    </b-avatar>
    <h2 class="h5 m-0">{{ usersNames }}</h2>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ChatHeader',
  computed: {
    ...mapGetters([
      'userId',
      'currentConversation',
      'allConversations',
    ]),
    otherUsers() {
      const [conversation] = this.allConversations.filter((c) => c.id === this.currentConversation);
      return conversation.Users.filter((u) => u.id !== this.userId);
    },
    usersNames() {
      const names = [];
      this.otherUsers.forEach((u) => names.push(u.user_name));
      return names.join(', ');
    },
  },
  methods: {
    ...mapMutations([
      'setCurrentConversation',
    ]),
  },
};
</script>

<style>

</style>
