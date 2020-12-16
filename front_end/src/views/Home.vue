<template>
  <b-row id="home">
    <b-col tag="main" cols="12" lg="8">
      <h1 class="sr-only">Fil d'actualités</h1>
      <div v-if="allFollows.length > 3">
        <SortingNav />
        <CreatePost />
        <Post
          v-for="(post, index) in allPosts"
          :key="index"
          :post="post"
          @pressed="fetchAllPostsBySubject($event)" />
        <LazyLoadingScroll
          v-if="allPosts.length && postPagination.currentPage < postPagination.lastPage"
          @loadMore="fetchAllPostsByFollow($event)" />
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
import LazyLoadingScroll from '@/components/lazyLoadingScroll.vue';

export default {
  name: 'Home',
  components: {
    Post,
    Sidebar,
    SortingNav,
    CreatePost,
    SubjectSuggest,
    LazyLoadingScroll,
  },
  computed: {
    ...mapGetters(['allPosts', 'postPagination', 'loggedUser', 'allFollows']),
  },
  methods: {
    ...mapActions(['fetchAllPosts', 'getFollows', 'fetchAllPostsByFollow', 'fetchAllPostsBySubject']),
  },
  mounted() {
    this.getFollows(this.loggedUser.storedUser.userId);
    this.fetchAllPostsByFollow(1);
  },
};
</script>

<style>
</style>
