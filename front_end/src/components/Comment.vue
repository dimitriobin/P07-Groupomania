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
      v-if="isAuthor()"
      cols="2"
      class="text-right">
      <b-icon-pencil
        @click="switchEdit()"
        class="mr-3">
      </b-icon-pencil>
      <b-icon-x-circle></b-icon-x-circle>
    </b-col>
  </b-row>
</template>

<script>
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { mapGetters } from 'vuex';
import CommentForm from '@/components/CommentForm.vue';

dayjs.extend(RelativeTime);
dayjs.locale(fr);

export default {
  name: 'Comment',
  props: [
    'data',
  ],
  components: {
    CommentForm,
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: {
    ...mapGetters(['userId']),
  },
  methods: {
    dateToTimestamp(date) {
      return dayjs(date).fromNow();
    },
    isAuthor() {
      return this.userId === this.data.user_id;
    },
    switchEdit() {
      this.edit = !this.edit;
    },
  },
};
</script>

<style>

</style>
