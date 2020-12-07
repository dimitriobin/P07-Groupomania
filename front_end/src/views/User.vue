<template>
  <b-row
    tag="section"
    id="User"
    class="m-0">
    <b-col
      tag="h1"
      cols="12"
      class="text-center sr-only">
      {{ oneUser.user_name }}
      </b-col>
    <b-col cols="12" lg="8" order="1" order-lg="0">
      <Post
        v-for="post in oneUser.Posts"
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
          :src="oneUser.image_url"
          size="150px"
          class="mb-3">
        </b-avatar>
        <h2 class="mb-3 text-center">{{ oneUser.user_name }}</h2>
        <b-button variant="info">Envoyer un message</b-button>
      </b-card>
      <b-card
        class="w-100 align-items-center border-0 shadow"
        body-class="w-100 py-4 px-5">
        <h2 class="h3">Sujets suivis</h2>
        <b-list-group tag="ul">
          <b-list-group-item
            v-for="(subject, index) in oneUser.Subjects"
            :key="index"
            tag="li"
            class="d-flex justify-content-between align-items-center border-0 py-2 text-left">
            <b-button variant="link" class="text-dark p-0 text-left">
              {{ subject.name }}
            </b-button>
            <b-link class="text-right">Suivre</b-link>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'User',
  components: {
    Post,
  },
  data() {
    return {
      userId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(['oneUser']),
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
  created() {
    this.fetchUser(this.userId);
  },
};
</script>

<style>
</style>
