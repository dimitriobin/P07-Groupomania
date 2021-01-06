<template>
  <div id="chatMessages" class="px-4 pt-0">
    <p
      v-for="(message, index) in messages"
      :key="index"
      class="d-flex flex-column justify-content-center align-items-start">
        <span
          :class="{ 'message-sent': message.sender_id === userId }"
          class="bg-light px-4 py-2 rounded-pill w-auto text-break mw-70">
          {{ message.content }}
        </span>
        <span class="align-self-center text-muted"><small>{{ message.createdAt }}</small></span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChatMessages',
  props: [
    'messages',
  ],
  computed: {
    ...mapGetters(['userId']),
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
