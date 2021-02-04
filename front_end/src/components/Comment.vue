<template>
  <div>
    <CommentForm
      :postId="postId"
      method="create"/>
    <b-row
    v-for="(comment, index) in comments"
    :key="index"
    class="mt-sm-3">
    <b-col cols="9" sm="4" class="d-flex flex-wrap flex-column text-left mb-1 order-0">
        <a
          href="#"
          class="card-text text-dark font-weight-bold mb-0">
          {{ comment.User.user_name }}
        </a>
        <small>{{ dateToTimestamp(comment.createdAt) }}</small>
    </b-col>
    <b-col
      v-if="edit === comment.id"
      cols="12"
      sm="5"
      class="text-justify order-2 order-sm-1">
      <CommentForm
        :postId="comment.post_id"
        method="update"
        :value="comment.content"
        :comment_id="comment.id"
        @submited="switchEdit(false)" />
    </b-col>
    <b-col
      v-else
      tag="p"
      cols="12"
      sm="5"
      class="text-justify order-2 order-sm-1">
      {{ comment.content }}
    </b-col>
    <b-col
      cols="3"
      class="text-right p-0 order-1 order-sm-2">
      <b-dropdown
          variant="link"
          toggle-class="text-decoration-none p-0"
          no-caret
          dropright>
          <template v-slot:button-content>
              <b-icon
                  icon="three-dots"
                  variant="dark"
                  class="mx-1 mx-lg-2"
                  font-scale="2">
              </b-icon>
          </template>
          <b-dropdown-item @click="$bvModal.show(`reportComment_${comment.id}`)">
            Signaler
          </b-dropdown-item>
          <b-modal
            :id="`reportComment_${comment.id}`"
            title="Rapport de signalement"
            hide-footer
            centered
            lazy>
            <ReportForm
              itemType="comment"
              :itemId="comment.id" />
          </b-modal>
          <b-dropdown-item
              v-if="isAuthor(comment.user_id)"
              href="#"
              @click="switchEdit(comment.id)"
              class="text-dark">
              Editer
          </b-dropdown-item>
          <b-dropdown-item
              v-if="isAuthor(comment.user_id)"
              href="#"
              @click="handleDelete(comment.id)">Supprimer</b-dropdown-item>
      </b-dropdown>
    </b-col>
  </b-row>
  <b-button
    v-if="comments.length < pagination.totalItems"
    variant="link"
    @click="loadMoreComments()">
    Voir plus de commentaires
  </b-button>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { mapActions, mapGetters } from 'vuex';
import CommentForm from '@/components/CommentForm.vue';
import ReportForm from '@/components/ReportForm.vue';

dayjs.extend(RelativeTime);
dayjs.locale(fr);

export default {
  name: 'Comment',
  components: {
    CommentForm,
    ReportForm,
  },
  props: [
    'postId',
  ],
  data() {
    return {
      edit: false,
      showRemove: false,
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'allComments',
      'CommentsForOnePost',
    ]),
    comments() {
      const postComments = this.allComments.find((i) => i.postId === this.postId);
      let comments;
      if (!postComments) {
        comments = [];
      } else {
        comments = postComments.comments;
      }
      return comments;
    },
    pagination() {
      let pagination;
      if (this.CommentsForOnePost(this.postId)) {
        const { currentPage, totalItems, totalPages } = this.CommentsForOnePost(this.postId);
        pagination = {
          currentPage,
          totalItems,
          totalPages,
        };
      } else {
        pagination = {
          currentPage: 0,
          totalItems: 0,
          totalPages: 0,
        };
      }
      return pagination;
    },
  },
  methods: {
    ...mapActions([
      'fetchAllCommentsByPost',
      'deleteComment',
    ]),
    dateToTimestamp(date) {
      return dayjs(date).fromNow();
    },
    isAuthor(userId) {
      return this.userId === userId;
    },
    switchEdit(value) {
      this.edit = value;
    },
    handleDelete(id) {
      this.deleteComment(id);
    },
    loadMoreComments() {
      this.fetchAllCommentsByPost({
        id: this.postId,
        page: this.pagination.currentPage + 1,
      });
    },
  },
};
</script>

<style>

</style>
