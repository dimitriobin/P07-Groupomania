<template>
  <b-row
    class="p-3 mt-3">
    <b-col cols="auto" class="d-flex flex-column text-left">
        <a
          href="#"
          class="card-text text-dark font-weight-bold">
          {{ data.User.user_name }}
        </a>
        <small>{{ dateToTimestamp(data.createdAt) }}</small>
    </b-col>
    <b-col
      v-if="!edit"
      tag="p"
      class="text-justify">
      {{ data.content }}
    </b-col>
    <b-col
      v-else>
      <CommentForm
        :postId="data.post_id"
        :subjectId="data.subject_id"
        method="update"
        :value="data.content"
        :comment_id="data.id"
        @submited="switchEdit()" />
    </b-col>
    <b-col
      cols="3"
      class="text-right">
      <b-dropdown
          variant="link"
          toggle-class="text-decoration-none"
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
          <b-dropdown-item @click="$bvModal.show(`reportComment_${data.id}`)">
            Signaler
          </b-dropdown-item>
          <b-modal
            :id="`reportComment_${data.id}`"
            title="Rapport de signalement"
            hide-footer
            centered
            lazy>
            <ReportForm
              itemType="comment"
              :itemId="data.id" />
          </b-modal>
          <b-dropdown-item
              v-if="isAuthor()"
              href="#"
              @click="switchEdit()"
              class="text-dark">
              Editer
          </b-dropdown-item>
          <b-dropdown-item
              v-if="isAuthor()"
              href="#"
              @click="handleDelete()">Supprimer</b-dropdown-item>
      </b-dropdown>
    </b-col>
  </b-row>
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
  props: [
    'data',
  ],
  components: {
    CommentForm,
    ReportForm,
  },
  data() {
    return {
      edit: false,
      showRemove: false,
    };
  },
  computed: {
    ...mapGetters(['userId']),
  },
  methods: {
    ...mapActions(['deleteComment']),
    dateToTimestamp(date) {
      return dayjs(date).fromNow();
    },
    isAuthor() {
      return this.userId === this.data.user_id;
    },
    switchEdit() {
      this.edit = !this.edit;
    },
    handleDelete() {
      this.deleteComment(this.data.id)
        .then(() => {
          this.showRemove = false;
          this.$emit('deletedComment');
        });
    },
  },
};
</script>

<style>

</style>
