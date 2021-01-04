<template>
<b-list-group id="conversationsList" class="flex-grow-1">
  <b-list-group-item
    v-for="(user, index) in users"
    :key="index"
    href="#"
    :class="{ 'active': user.userId === selectedUser }"
    class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center"
    @click="handleClick(user)">
    <b-avatar
      :src="getUser(user.userId).image_url"
      size="3.5rem"
      class="mr-3">
    </b-avatar>
    <div>
      <p class="m-0 h5">{{ getUser(user.userId).user_name }}</p>
    </div>
  </b-list-group-item>
</b-list-group>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChatUser',
  props: [
    'users',
  ],
  data() {
    return {
      selectedUser: '',
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'allUsers',
    ]),
  },
  methods: {
    getUser(id) {
      return this.allUsers.filter((user) => user.id === id)[0];
    },
    handleClick(user) {
      this.selectedUser = user.userId;
      this.$emit('selectedReceiver', user);
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
