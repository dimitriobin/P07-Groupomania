<template>
  <div id="home">
    <PostContainer />
    <Sidebar />
  </div>
</template>

<script>
// @ is an alias to /src
import PostContainer from '@/components/PostContainer.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    PostContainer,
    Sidebar,
  },
};
</script>

<style scoped lang="scss">
  #home {
    display: flex;
  }
</style>
