<template>
  <b-row id="home">
    <b-col tag="main" cols="12" lg="8">
      <h1 class="sr-only">Fil d'actualités</h1>
      <SortingNav />
      <CreatePost />
      <Post
        v-for="post in allPosts"
        :key="post.id"
        :title="post.title"
        :image_url="post.image_url"
        :url="post.url"
        :user="post.User.user_name"
        :subject="post.Subject.name" />
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Post,
    Sidebar,
    SortingNav,
    CreatePost,
  },
  computed: {
    ...mapGetters(['allPosts']),
  },
  methods: {
    ...mapActions(['fetchAllPosts']),
  },
  created() {
    this.fetchAllPosts();
  },
};
</script>

<style>
</style>
