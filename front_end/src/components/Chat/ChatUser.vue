<template>
<b-list-group
  id="onlineUsersList">
  <b-list-group-item
    v-for="(user, index) in allOtherUsers"
    :key="index"
    href="#"
    class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center"
    @click="$emit('selected', user.id)">
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChatUser',
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
    isOnline(userId) {
      const compare = this.allOnlineUsers.filter((user) => (user.userId === userId));
      return compare.length > 0;
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
