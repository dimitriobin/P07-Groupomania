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
          <div
            v-if="allPosts.length"
            v-observe-visibility="handleScrolledToBottom">
            <b-spinner
              v-if="loading"
              class="d-block my-5 mx-auto"
              type="grow"
              label="Chargement...">
            </b-spinner>
            <span
              v-else
              class="text-center">
              {{ message }}
            </span>
          </div>
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
  data() {
    return {
      loading: false,
      page: 1,
      message: '',
    };
  },
  computed: {
    ...mapGetters(['allPosts', 'loggedUser', 'allFollows']),
  },
  methods: {
    ...mapActions(['fetchAllPosts', 'getFollows', 'fetchAllPostsByFollow', 'fetchAllPostsBySubject']),
    handleScrolledToBottom(isVisible) {
      this.loading = true;
      if (!isVisible) return;
      this.page += 1;
      this.fetchAllPostsByFollow(this.page)
        .catch((error) => {
          if (error === 'Posts not found') {
            console.log(error);
            this.loading = false;
            this.message = 'Pas d\'autres publications';
          }
        });
    },
  },
  created() {
    this.getFollows(this.loggedUser.storedUser.userId);
    this.fetchAllPostsByFollow(this.page);
  },
};
</script>

<style>
</style>
