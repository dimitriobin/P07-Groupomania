<template>
  <ValidationObserver
    ref="commentObserver"
    name="createCommentForm"
    v-slot="{ handleSubmit }">
    <b-form
      class="d-flex flex-column"
      @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
        name="commentaire"
        v-slot="{ valid, errors }">
        <b-form-group
          id="input-group-comment">
          <b-form-input
            v-model="comment"
            id="comment"
            type="text"
            trim
            placeholder="Proposez un commentaire ..."
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <b-button
        type="submit"
        variant="link"
        class="mx-auto w-25 commentSubmit">
        Poster
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CommentForm',
  props: [
    'postId',
    'subjectId',
  ],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      comment: '',
    };
  },
  computed: {
    ...mapGetters(['userId']),
  },
  methods: {
    ...mapActions(['addComment']),
    onSubmit() {
      const dataObject = {
        content: this.comment,
        subject_id: this.subjectId,
        user_id: this.userId,
        post_id: this.postId,
      };
      this.addComment(dataObject);
      this.comment = '';
    },
  },
};
</script>

<style scoped>
.commentSubmit {
  position: absolute;
  right: 10px;
}

</style>
