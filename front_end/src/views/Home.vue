<template>
  <b-row id="home">
    <b-col tag="main" cols="12" lg="8">
      <h1 class="sr-only">Fil d'actualités</h1>
      <SortingNav />
      <CreatePost />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </b-col>
    <b-col tag="aside" cols="12" lg="4">
      <Sidebar />
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue';
import Sidebar from '@/components/Sidebar.vue';
import SortingNav from '@/components/SortingNav.vue';
import CreatePost from '@/components/CreatePost.vue';

export default {
  name: 'Home',
  components: {
    Post,
    Sidebar,
    SortingNav,
    CreatePost,
  },
};
</script>

<style>
</style>
