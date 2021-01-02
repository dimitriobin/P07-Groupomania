<template>
<b-list-group id="conversationsList" class="flex-grow-1">
  <b-list-group-item
    v-for="user in users"
    :key="user.id"
    href="#"
    class="border-0 rounded-pill text-dark d-flex justify-content-start align-items-center"
    @click="$emit('clickChild')">
    <b-avatar
      :badge="user.connected"
      badge-variant="success"
      :src="user.image_url"
      size="3.5rem"
      class="mr-3">
    </b-avatar>
    <div>
      <p class="m-0">{{ user.user_name }}</p>
      <small v-if="user.connected">En ligne</small>
    </div>
  </b-list-group-item>
</b-list-group>
</template>

<script>
export default {
  name: 'ChatUser',
  props: [
    'users',
  ],
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
