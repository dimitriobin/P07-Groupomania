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
      cols="3"
      class="text-right">
      <b-button
        @click="switchEdit()"
        variant="link"
        class="text-dark">
        <b-icon-pencil>
        </b-icon-pencil>
      </b-button>
      <b-button
        variant="link"
        class="text-dark"
        :id="'removeComment' + data.id">
        <b-icon-x-circle>
        </b-icon-x-circle>
      </b-button>
      <b-popover
        :target="'removeComment' + data.id"
        triggers="click"
        placement="right"
        :show.sync="showRemove">
        <template #title>Etes vous sur de vouloir supprimer ce post ?</template>
        <div class="d-flex justify-content-around align-items-center">
          <b-button
            variant="success"
            class="w-25"
            @click="handleDelete()">Oui</b-button>
          <b-button
            variant="danger"
            class="w-25"
            @click="showRemove = false">Non</b-button>
        </div>
      </b-popover>
    </b-col>
  </b-row>
</template>

<script>
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { mapActions, mapGetters } from 'vuex';
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
