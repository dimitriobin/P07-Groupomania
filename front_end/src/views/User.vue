<template>
  <b-row
    tag="main"
    id="User"
    class="m-0">
    <b-col
      tag="h1"
      cols="12"
      class="text-center sr-only">
      <span class="sr-only">Profile de </span>
      {{ oneUser.user_name }}
      </b-col>
    <b-col tag="section" cols="12" lg="8" order="1" order-lg="0">
      <h2 class="sr-only">Les derniers posts de {{ oneUser.user_name }}</h2>
      <Post
        v-for="post in allPosts"
        :key="post.id"
        :post="post" />
      <LazyLoadingScroll
        v-if="allPosts.length && allPosts.length < postPagination.totalPosts"
        @loadMore="fetchAllPostsByOneUser({ page: $event, id: $route.params.id })" />
      <p v-else>Fin des posts</p>
    </b-col>
    <!-- ASIDE INFOS -->
    <b-col
      tag="aside"
      cols="12"
      lg="4"
      class="h-100 d-flex flex-column justify-start align-items-center mb-4">
      <b-card
        class="w-100 align-items-center border-0 shadow mb-4">
        <b-avatar
          v-if="oneUser.image_url"
          :src="oneUser.image_url"
          size="150px"
          class="mb-3 bg-transparent">
        </b-avatar>
        <h2 class="mb-3 text-center">{{ oneUser.user_name }}</h2>
        <b-button to='/chat' class="btn-dark text-white">Envoyer un message</b-button>
      </b-card>
      <b-card
        class="w-100 align-items-center border-0 shadow"
        body-class="w-100 p-4">
        <h2 class="h3 text-center">Sujets suivis</h2>
        <b-list-group
          tag="ul"
          class="px-4 list-unstyled">
            <li>
              <subject
                v-for="(subject, index) in oneUser.Subjects"
                :key="index"
                :subject="subject"
                :fill="true"
                class="text-dark p-0 text-left">
              </subject>
            </li>
        </b-list-group>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue';
import Subject from '@/components/Subject.vue';
import LazyLoadingScroll from '@/components/LazyLoadingScroll.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'User',
  components: {
    Post,
    Subject,
    LazyLoadingScroll,
  },
  watch: {
    $route(to) {
      this.fetchUser(to.params.id);
      this.fetchAllPostsByOneUser({ page: 0, id: to.params.id });
    },
  },
  computed: {
    ...mapGetters(['oneUser', 'userId', 'allPosts', 'postPagination']),
  },
  methods: {
    ...mapActions(['fetchUser', 'getFollows', 'fetchAllPostsByOneUser']),
  },
  mounted() {
    this.fetchUser(this.$route.params.id);
    this.getFollows(this.userId);
    this.fetchAllPostsByOneUser({ page: 0, id: this.$route.params.id });
  },
};
</script>

<style>
</style>
