<template>
  <div id="chatMessages" class="px-4 pt-0">
    <p
      v-for="(message, index) in messages"
      :key="index"
      class="bg-light px-4 py-2 rounded-pill">
      {{ message.content }}
      <br><span class="text-muted"><small>Il y'a 2 min</small></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChatMessages',
  props: [
    'messages',
  ],
};
</script>

<style scoped>
#chatMessages {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
