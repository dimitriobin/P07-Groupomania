<template>
  <b-row id="home">
    <b-col tag="main" cols="12" lg="8">
      <h1 class="sr-only">Fil d'actualités</h1>
      <SortingNav />
      <CreatePost />
      <Post
        v-for="(post, index) in allPosts"
        :key="index"
        :post="post"
        @pressed="handleFetching('bySubjects', $event)" />
      <LazyLoadingScroll
        v-if="allPosts.length && postPagination.currentPage < postPagination.lastPage"
        @loadMore="fetchMore($event)" />
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
import LazyLoadingScroll from '@/components/lazyLoadingScroll.vue';

export default {
  name: 'Home',
  components: {
    Post,
    Sidebar,
    SortingNav,
    CreatePost,
    LazyLoadingScroll,
  },
  data() {
    return {
      display: '',
      subjectId: '',
    };
  },
  computed: {
    ...mapGetters(['allPosts', 'postPagination', 'loggedUser', 'userId', 'allFollows']),
  },
  methods: {
    ...mapActions(['fetchAllPosts', 'getFollows', 'fetchAllPostsByFollow', 'fetchAllPostsBySubject']),
    handleFetching(display, id) {
      this.display = display;
      this.subjectId = id;
      if (display === 'byFollows') {
        this.fetchAllPostsByFollow(0);
      } else if (display === 'bySubjects') {
        this.fetchAllPostsBySubject({ id: this.subjectId, page: 0 });
      }
    },
    fetchMore(page) {
      console.log(page);
      switch (this.display) {
        case 'bySubjects':
          this.fetchAllPostsBySubject({ id: this.subjectId, page });
          break;

        case 'byFollows':
          this.fetchAllPostsByFollow(page);
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getFollows(this.userId);
    this.handleFetching('byFollows');
  },
};
</script>

<style>
</style>
