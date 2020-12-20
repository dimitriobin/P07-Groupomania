<template>
  <ValidationObserver
    ref="postObserver"
    name="createPostForm"
    v-slot="{ handleSubmit }">
    <b-form
      class="d-flex flex-column"
      @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
        name="titre"
        rules="required|min:20|max:250"
        v-slot="{ valid, errors }">
        <b-form-group
          id="input-group-title"
          label="Titre* :"
          label-for="title">
          <b-form-textarea
            v-model="newPost.title"
            id="title"
            rows="3"
            max-rows="6"
            autofocus
            trim
            required
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-textarea>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        name="sujet"
        rules="required"
        v-slot="{ valid, errors }">
        <b-form-group
          id="input-group-subject"
          label="Sujet* :"
          label-for="subject">
          <b-form-select
            v-model="newPost.subject_id"
            id="subject"
            :options="options"
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-select>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        name="image du post"
        rules="image"
        v-slot="{ valid, errors }">
        <b-form-group
          id="input-group-postImage"
          label="Image :"
          label-for="postImage">
          <b-form-file
            id="postImage"
            v-model="newPost.image_url"
            accept="image/*"
            placeholder="Faites glisser ou sélectionnez une photo"
            drop-placeholder="Déposez ici..."
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-file>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        name="url"
        v-slot="{ valid, errors }">
        <b-form-group
          id="input-group-url"
          label="Lien :"
          label-for="url">
          <b-form-input
            v-model="newPost.url"
            id="url"
            type="text"
            trim
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <p class=" align-self-end"><small>* : obligatoire</small></p>
      <b-button
        type="submit"
        variant="primary"
        class="mx-auto">
        Poster
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'CreatePost',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: [
    'post',
    'method',
  ],
  data() {
    return {
      newPost: {
        title: '',
        image_url: null,
        url: '',
        subject_id: '',
      },
      options: [],
    };
  },
  computed: {
    ...mapGetters(['allSubjects', 'userId', 'oneUser']),
  },
  methods: {
    ...mapActions(['addPost', 'fetchUser']),
    subjectListing() {
      this.allSubjects.forEach((item) => {
        const newOption = {
          value: item.id,
          text: item.name,
        };
        this.options.push(newOption);
      });
    },
    onSubmit() {
      switch (this.method) {
        case 'create':
          this.createPost();
          break;
        case 'update':
          this.updatePost();
          break;
        default:
          break;
      }
    },
    createPost() {
      // Create a FormData instance
      const fd = new FormData();
      fd.append('user_id', this.userId);
      // Append form values inside
      Object.entries(this.newPost).forEach(
        ([key, value]) => {
          if (value !== null && value !== '') {
            fd.append(`${key}`, value);
          }
        },
      );
      // Call the addPost action with the formData in param
      this.addPost(fd)
        .then(() => {
          // Reset the values of the form
          this.newPost.title = '';
          this.newPost.image_url = null;
          this.newPost.url = '';
          this.newPost.subject_id = '';
          // Hide the modal
          this.$emit('formSubmit');
        })
        .catch((error) => {
          // If some known errors are send by the back end, display them in the UI
          switch (error) {
            case 'Validation isUrl on url failed':
              this.$refs.postObserver.setErrors({
                url: ['Veuillez entrer une url valide'],
              });
              break;
            default:
              break;
          }
          // for errors that aren't known, display in the console
          return console.error(error);
        });
    },
    updatePost() {
      console.log('updatePost is called');
    },
  },
  mounted() {
    this.subjectListing();
    if (this.method === 'update') {
      this.newPost.title = this.post.title;
    }
  },
};
</script>

<style>

</style>
