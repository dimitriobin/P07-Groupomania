<template>
  <b-row id="home">
    <b-col tag="main" cols="12" lg="8">
      <h1 class="sr-only">Fil d'actualités</h1>
      <div v-if="allFollows.length > 3">
        <SortingNav />
        <CreatePost />
        <Post
          v-for="post in allPosts"
          :key="post.id"
          :id="post.id.toString()"
          :title="post.title"
          :image_url="post.image_url"
          :url="post.url"
          :user="post.User"
          :subject="post.Subject"
          :date="post.createdAt"
          :user_image="post.User.image_url"
          :comments="post.Comments" />
      </div>
      <SubjectSuggest v-else />
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
import SubjectSuggest from '@/components/SubjectSuggest.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Post,
    Sidebar,
    SortingNav,
    CreatePost,
    SubjectSuggest,
  },
  computed: {
    ...mapGetters(['allPosts', 'loggedUser', 'allFollows']),
  },
  methods: {
    ...mapActions(['fetchAllPosts', 'getFollows']),
  },
  created() {
    this.getFollows(this.loggedUser.storedUser.userId);
    this.fetchAllPosts();
  },
};
</script>

<style>
</style>
