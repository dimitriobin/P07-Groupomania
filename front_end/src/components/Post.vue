<template>
    <b-row
        no-gutters
        tag="article"
        class="bg-white rounded-lg shadow p-4 mb-4">
        <div
            v-if="!edit"
            class="w-100">
            <b-col cols="12" tag="header" class="mb-2">
                <b-row no-gutters align-v="center">
                    <b-avatar
                        :src="post.User.image_url"
                        size="lg"
                        class="mr-4">
                    </b-avatar>
                    <b-col class="text-left">
                        <router-link
                            :to="`/user/${post.User.id}`"
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
                    v-if="post.image_url"
                    fluid
                    class="w-100 my-3"
                    alt="Description de l'image"
                    :src="post.image_url"></b-img>
                <a v-if="post.url" target="_blank" :href="post.url">{{ post.url }}</a>
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
                            icon="chat-left-text"
                            variant="dark"
                            class="mx-1 mx-lg-2"
                            font-scale="2">
                        </b-icon>
                        <b-badge
                            v-if="post.Comments.length > 0"
                            pill
                            class="icon_counter"
                            variant="dark">{{ post.Comments.length }}
                        </b-badge>
                    </b-button>
                    <b-dropdown
                        variant="link"
                        toggle-class="text-decoration-none"
                        no-caret>
                        <template v-slot:button-content>
                            <b-icon
                                icon="three-dots"
                                variant="dark"
                                class="mx-1 mx-lg-2"
                                font-scale="2">
                            </b-icon>
                        </template>
                        <b-dropdown-item href="#">Signaler</b-dropdown-item>
                        <b-dropdown-item
                            v-if="isAuthor()"
                            href="#"
                            @click="edit = true">
                            Editer
                        </b-dropdown-item>
                        <b-dropdown-item
                            v-if="isAuthor()"
                            href="#"
                            @click="remove()">Supprimer</b-dropdown-item>
                    </b-dropdown>
                </b-row>
            </b-col>
            <!-- COMMENTS -->
            <b-collapse
                v-model="showComments"
                :id="Number.toString(post.id)"
                @show="handleFetching()"
                class="w-100 mt-2 border-top">
                <Comment
                  v-for="(comment, index) in comments"
                  :key="index"
                  :data="comment" />
                <CommentForm
                    :postId="post.id"
                    :subjectId="post.subject_id" />
            </b-collapse>
        </div>
        <PostForm
            class="w-100"
            v-else
            method="update"
            :post="post"
            @hide="edit = false" />
    </b-row>
</template>

<script>
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Subject from '@/components/Subject.vue';
import PostForm from '@/components/PostForm.vue';
import CommentForm from '@/components/CommentForm.vue';
import Comment from '@/components/Comment.vue';
import { mapActions, mapGetters } from 'vuex';

dayjs.extend(RelativeTime);
dayjs.locale(fr);

export default {
  name: 'Post',
  props: [
    'post',
  ],
  components: {
    Subject,
    PostForm,
    CommentForm,
    Comment,
  },
  data() {
    return {
      showComments: false,
      commentsNumber: '',
      edit: false,
    };
  },
  computed: {
    ...mapGetters(['userId', 'allComments']),
    comments() {
      return this.allComments.filter((item) => item.post_id === this.post.id);
    },
  },
  methods: {
    ...mapActions(['removePost', 'fetchAllCommentsByPost']),
    isAuthor() {
      return this.userId === this.post.user_id;
    },
    dateToTimestamp(date) {
      return dayjs(date).fromNow();
    },
    collapse() {
      this.showComments = !this.showComments;
    },
    remove() {
      this.removePost(this.post.id);
    },
    handleFetching() {
      if (!this.comments.length > 0) {
        this.fetchAllCommentsByPost(this.post.id);
      }
    },
  },
  created() {
    // this.commentsNumber = this.comments.length;
  },
};
</script>

<style>
</style>
