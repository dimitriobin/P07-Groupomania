<template>
  <b-row id="home">
    <b-col tag="main" cols="12" lg="8">
      <h1 class="sr-only">Fil d'actualités</h1>
      <SortingNav />
      <div class="shadow rounded-lg p-4 mb-4 d-flex align-items-center">
      <b-avatar
        v-if="oneUser.image_url"
        :src="oneUser.image_url"
        size="lg">
      </b-avatar>
      <b-button
        v-b-modal.createPost
        pill
        variant="light"
        size="lg"
        class="border-0 w-100 h-100 ml-2 text-left p-3">
        Que voulez-vous dire {{ oneUser.user_name }} ?</b-button>
        <b-modal
          v-model="showCreatePostForm"
          lazy
          id="createPost"
          title="Que voulez vous dire ?"
          hide-footer
          class="shadow rounded-lg p-4 mb-4">
          <PostForm
            method="create"
            @hide="showCreatePostForm = false" />
        </b-modal>
      </div>
      <Post
        v-for="(post) in allPosts"
        :key="post.id"
        :post="post" />
      <LazyLoadingScroll
        v-if="allPosts.length && allPosts.length < postPagination.totalPosts"
        @loadMore="handleFetching($event)" />
      <p v-else>Fin des posts</p>
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
import PostForm from '@/components/PostForm.vue';
import { mapGetters, mapActions } from 'vuex';
import LazyLoadingScroll from '@/components/LazyLoadingScroll.vue';

export default {
  name: 'Home',
  components: {
    Post,
    Sidebar,
    SortingNav,
    PostForm,
    LazyLoadingScroll,
  },
  data() {
    return {
      showCreatePostForm: false,
    };
  },
  computed: {
    ...mapGetters([
      'allPosts',
      'postPagination',
      'userId',
      'allFollows',
      'oneUser',
      'displayBy',
      'displayInformations']),
  },
  watch: {
    allFollows() {
      this.handleFetching(0);
    },
  },
  methods: {
    ...mapActions([
      'fetchAllPostsByNew',
      'fetchAllPostsByTop',
      'fetchAllPostsByHot',
      'fetchAllPostsByOneSubject',
      'fetchAllPostsByKeyword',
      'getFollows',
      'fetchUser']),
    handleFetching(page) {
      switch (this.displayBy) {
        case 'new':
          this.fetchAllPostsByNew(page);
          break;
        case 'top':
          this.fetchAllPostsByTop(page);
          break;
        case 'hot':
          this.fetchAllPostsByHot(page);
          break;
        case 'subject':
          this.fetchAllPostsByOneSubject({ page, id: this.displayInformations });
          break;
        case 'keyword':
          this.fetchAllPostsByKeyword({ page, keyword: this.displayInformations });
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getFollows(this.userId);
    this.fetchUser(this.userId);
  },
};
</script>

<style>
</style>
