<template>
    <b-row
        no-gutters
        tag="article"
        class="bg-white rounded-lg shadow p-4 mb-4">
        <b-col cols="12" tag="header" class="mb-2">
            <b-row no-gutters align-v="center">
                <b-avatar :src="post.userImage" size="lg" class="mr-4"></b-avatar>
                <b-col class="text-left">
                    <router-link
                        :to="`/user/${post.userId}`"
                        class="h5 font-weight-bold text-dark">
                        {{ post.User.user_name }}
                    </router-link>
                    <subject
                        @pressed="$emit('pressed', post.Subject.id)"
                        :subject="post.Subject">
                    </subject>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" class="my-3  text-left">
            <h3 class="h4 font-weight-bold">
                {{ post.title }}
            </h3>
            <b-img
                v-if="post.image_url !== null"
                fluid
                class="w-100 my-3"
                alt="Description de l'image"
                :src="post.image_url"></b-img>
            <a target="_blank" :href="post.url">{{ post.url }}</a>
            <p class="mb-0 text-muted"><small>{{ dateToTimestamp(post.createdAt) }}</small></p>
        </b-col>
        <b-col cols="12" tag="footer" class="h2">
            <b-row align-h="around" class="px-5">
                <b-button class="bg-white border-0 position-relative">
                    <b-icon icon="heart" variant="dark" class="mx-1 mx-lg-2" font-scale="2">
                    </b-icon>
                    <b-badge pill class="icon_counter" variant="dark">16</b-badge>
                </b-button>
                <b-button @click="collapse" class="bg-white border-0 position-relative">
                    <b-icon
                        icon="chat-left-text" variant="dark" class="mx-1 mx-lg-2" font-scale="2">
                    </b-icon>
                    <!-- <b-badge
                    v-if="comments.length > 0"
                        pill
                        class="icon_counter"
                        variant="dark">{{ commentsNumber }}
                    </b-badge> -->
                </b-button>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                    <template v-slot:button-content>
                        <b-icon
                            icon="three-dots" variant="dark" class="mx-1 mx-lg-2" font-scale="2">
                        </b-icon>
                    </template>
                    <b-dropdown-item href="#">Signaler</b-dropdown-item>
                    <b-dropdown-item href="#">Cacher</b-dropdown-item>
                </b-dropdown>
            </b-row>
        </b-col>
        <!-- Need to change the id of comment with the dynamique id of the post -->
        <!-- <b-collapse
            v-model="visible"
            :id="id"
            class="w-100 mt-2 border-top">
            <b-row
                v-for="comment in comments"
                :key="comment.id"
                class="p-3 mt-3">
                <b-col cols="auto" class="d-flex flex-column text-left">
                    <a
                        href="#"
                        class="card-text text-dark font-weight-bold">
                        {{ comment.User.user_name }}
                    </a>
                    <small>{{ dateToTimestamp(comment.createdAt) }}</small>
                </b-col>
                <b-col tag="p" class="text-justify">{{ comment.content }}</b-col>
            </b-row>
        </b-collapse> -->
    </b-row>
</template>

<script>
import { mapActions } from 'vuex';
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Subject from '@/components/Subject.vue';

dayjs.extend(RelativeTime);
dayjs.locale(fr);

export default {
  name: 'Post',
  props: [
    'post',
  ],
  components: {
    Subject,
  },
  data() {
    return {
      visible: false,
      commentsNumber: '',
    };
  },
  methods: {
    ...mapActions(['fetchAllPostsBySubject']),
    dateToTimestamp(date) {
      return dayjs(date).fromNow();
    },
    collapse() {
      this.visible = !this.visible;
    },
  },
  created() {
    // this.commentsNumber = this.comments.length;
  },
};
</script>

<style>
</style>
