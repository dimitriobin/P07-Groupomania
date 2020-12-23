<template>
  <b-row id="home">
    <b-col tag="main" cols="12" lg="8">
      <h1 class="sr-only">Fil d'actualités</h1>
      <SortingNav
        @sortBy="order = $event" />
      <div class="shadow rounded-lg p-4 mb-4 d-flex align-items-center">
      <b-avatar
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
            @formSubmit="showCreatePostForm = false" />
        </b-modal>
      </div>
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
      <Sidebar @subjectClick="handleFetching('bySubjects', $event)" />
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
import LazyLoadingScroll from '@/components/lazyLoadingScroll.vue';

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
      display: '',
      subjectId: '',
      showCreatePostForm: false,
      order: 'createdAt',
    };
  },
  computed: {
    ...mapGetters(['allPosts', 'postPagination', 'loggedUser', 'userId', 'allFollows', 'oneUser']),
  },
  watch: {
    allFollows() {
      this.handleFetching(this.display, this.subjectId);
    },
  },
  methods: {
    ...mapActions(['fetchAllPosts', 'getFollows', 'fetchAllPostsByFollow', 'fetchAllPostsBySubject', 'fetchUser']),
    handleFetching(display, id) {
      this.display = display;
      this.subjectId = id;
      if (display === 'byFollows') {
        this.fetchAllPostsByFollow({ page: 0, order: this.order });
      } else if (display === 'bySubjects') {
        this.fetchAllPostsBySubject({ id: this.subjectId, page: 0 });
      }
    },
    fetchMore(page) {
      switch (this.display) {
        case 'bySubjects':
          this.fetchAllPostsBySubject({ id: this.subjectId, page });
          break;

        case 'byFollows':
          this.fetchAllPostsByFollow({ page, order: this.order });
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getFollows(this.userId);
    this.handleFetching('byFollows');
    this.fetchUser(this.userId);
  },
};
</script>

<style>
</style>
