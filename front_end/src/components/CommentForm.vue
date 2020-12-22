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
            class="border-0"
            autofocus
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
        {{ (method === 'update') ? 'Modifier' : 'Poster'}}
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
    'method',
    'value',
    'comment_id',
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
    ...mapActions(['addComment', 'updateComment']),
    onSubmit() {
      const dataObject = {
        content: this.comment,
        subject_id: this.subjectId,
        user_id: this.userId,
        post_id: this.postId,
      };
      if (this.method === 'update') {
        this.updateComment({ id: this.comment_id, data: dataObject })
          .then(() => {
            this.comment = '';
            this.$emit('submited');
          })
          .catch((error) => {
            // If some known errors are send by the back end, display them in the UI
            switch (error) {
              case 'Validation notEmpty on content failed':
                this.$refs.commentObserver.setErrors({
                  commentaire: ['Ce champ ne peux pas être vide'],
                });
                break;
              default:
                break;
            }
            // for errors that aren't known, display in the console
            return console.error(error);
          });
      } else if (this.method === 'create') {
        this.addComment(dataObject)
          .then(() => {
            this.comment = '';
            this.$emit('submited');
          })
          .catch((error) => {
            // If some known errors are send by the back end, display them in the UI
            switch (error) {
              case 'Validation notEmpty on content failed':
                this.$refs.commentObserver.setErrors({
                  commentaire: ['Ce champ ne peux pas être vide'],
                });
                break;
              default:
                break;
            }
            // for errors that aren't known, display in the console
            return console.error(error);
          });
      }
    },
  },
  mounted() {
    if (this.method === 'update') {
      this.comment = this.value;
    }
  },
};
</script>

<style scoped>
.commentSubmit {
  position: absolute;
  right: 30px;
}

</style>
