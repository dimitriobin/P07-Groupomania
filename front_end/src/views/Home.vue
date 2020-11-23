<template>
  <b-row id="home">
    <b-col cols="12" md="8">
      <b-nav pills align="center"
        class="mb-4 bg-white rounded-lg p-2 shadow h5 font-weight-bold">
        <b-nav-item class="mx-3" active>Top</b-nav-item>
        <b-nav-item class="mx-3">New</b-nav-item>
        <b-nav-item class="mx-3">Hot</b-nav-item>
      </b-nav>
      <Post />
      <Post />
      <Post />
      <Post />
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
