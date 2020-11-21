<template>
  <b-row id="home">
    <b-col cols="12" md="8">
      <Post />
    </b-col>
    <b-col cols="12" md="4">
      <Sidebar />
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    Post,
    Sidebar,
  },
};
</script>

<style scoped lang="scss">
  #home {
    display: flex;
  }
</style>
