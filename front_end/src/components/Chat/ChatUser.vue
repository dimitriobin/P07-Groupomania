<template>
<div class="h-100 d-flex flex-column justify-between align-items-stretch">
  <b-list-group
    id="onlineUsersList"
    class="overflow-y-auto overflow-x-hidden">
    <b-list-group-item
      v-for="(user, index) in allOtherUsers"
      :key="index"
      href="#"
      :class="{ 'active': selectedUser === user.id }"
      class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center"
      @click="selectedUser = user.id">
      <b-avatar
        :badge="isOnline(user.id)"
        badge-variant="success"
        :src="user.image_url"
        size="3.5rem"
        class="mr-3">
      </b-avatar>
      <div>
        <p class="m-0 h5">{{ user.user_name }}</p>
      </div>
    </b-list-group-item>
  </b-list-group>
  <div class="mt-2 w-100">
    <b-button
      @click.once="handleSubmit()"
      class="d-block mx-auto" variant="success" size="lg">
      Démarrer une conversation
    </b-button>
  </div>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ChatUser',
  data() {
    return {
      selectedUser: '',
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'allUsers',
      'allOnlineUsers',
    ]),
    allOtherUsers() {
      return this.allUsers.filter((user) => user.id !== this.userId);
    },
  },
  methods: {
    ...mapActions([
      'createConversation',
    ]),
    isOnline(userId) {
      const compare = this.allOnlineUsers.filter((user) => (user.userId === userId));
      return compare.length > 0;
    },
    handleSubmit() {
      this.createConversation([this.selectedUser, this.userId])
        .then(() => this.$emit('conversationCreated'));
    },
  },
};
</script>

<style scoped>
#onlineUsersList {
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 1rem 0;
}

.active {
  background: rgba(220, 53, 69, 0.1) !important;
}
</style>
