<template>
<b-list-group id="conversationsList" class="flex-grow-1">
  <b-list-group-item
    v-for="(conversation, index) in 0"
    :key="index"
    href="#"
    class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center">
    <b-avatar
      src=""
      size="3.5rem"
      class="mr-3">
    </b-avatar>
    <div>
      <p class="m-0 h5">{{ conversation.correspondant.userId }}</p>
    </div>
  </b-list-group-item>
</b-list-group>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChatConversations',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters([
      'allMessages',
    ]),
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
