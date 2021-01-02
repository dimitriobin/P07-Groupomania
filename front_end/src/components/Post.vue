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
                        v-if="post.User.image_url"
                        :alt="`Photo de profil de ${post.User.user_name}`"
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
                <h3 class="h4 font-weight-bold text-break">
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
                    <b-button
                      class="bg-white border-0 position-relative">
                        <b-icon
                          v-if="!isLiked"
                          @click="likePost(post.id)"
                          icon="heart"
                          variant="dark"
                          class="mx-1 mx-lg-2"
                          font-scale="2">
                        </b-icon>
                        <b-icon
                          v-else
                          @click="unlikePost(post.id)"
                          icon="heart-fill"
                          variant="dark"
                          class="mx-1 mx-lg-2"
                          font-scale="2">
                        </b-icon>
                        <b-badge
                          v-if="post.Likes.length > 0"
                          pill
                          class="icon_counter"
                          variant="dark">
                          {{ post.Likes.length }}
                        </b-badge>
                    </b-button>
                    <b-button @click="collapse" class="bg-white border-0 position-relative">
                        <b-icon
                            icon="chat-left-text"
                            variant="dark"
                            class="mx-1 mx-lg-2"
                            font-scale="2">
                        </b-icon>
                        <b-badge
                            v-if="commentsCount > 0 "
                            pill
                            class="icon_counter"
                            variant="dark">
                            {{ commentsCount }}
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
                        <b-dropdown-item @click="$bvModal.show(`reportPost_${post.id}`)">
                          Signaler
                        </b-dropdown-item>
                        <b-modal
                          :id="`reportPost_${post.id}`"
                          title="Rapport de signalement"
                          hide-footer
                          centered
                          lazy>
                          <ReportForm
                            itemType="post"
                            :itemId="post.id" />
                        </b-modal>
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
                :id="'commentsFor' + post.id"
                @show.once="handleFetching(0)"
                class="w-100 mt-2 border-top text-center">
                <CommentForm
                  :postId="post.id"
                  :subjectId="post.subject_id"
                  method="create"
                  @createdComment="commentsCount += 1" />
                <Comment
                  v-for="(comment, index) in comments"
                  :key="index"
                  :data="comment"
                  @deletedComment="commentsCount -= 1" />
                <b-spinner v-if="loading"></b-spinner>
                <b-button
                  v-if="comments.length < post.Comments.length"
                  variant="link"
                  class="w-100"
                  @click="handleFetching(currentPage += 1)">
                  Voir plus de commentaires
                </b-button>
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
import ReportForm from '@/components/ReportForm.vue';
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
    ReportForm,
  },
  data() {
    return {
      showComments: false,
      edit: false,
      commentsCount: 0,
      loading: false,
      currentPage: 0,
      totalPages: '',
    };
  },
  computed: {
    ...mapGetters(['userId', 'allComments']),
    comments() {
      return this.allComments.filter((item) => item.post_id === this.post.id);
    },
    isLiked() {
      return this.post.Likes.some((like) => like.UserId === this.userId);
    },
  },
  methods: {
    ...mapActions(['removePost', 'fetchAllCommentsByPost', 'likePost', 'unlikePost']),
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
    handleFetching(page) {
      this.loading = true;
      this.fetchAllCommentsByPost({ id: this.post.id, page })
        .then((response) => {
          this.loading = false;
          this.currentPage = response.currentPage;
          this.totalPages = response.totalPages;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.commentsCount = this.post.Comments.length;
  },
};
</script>

<style>
</style>
