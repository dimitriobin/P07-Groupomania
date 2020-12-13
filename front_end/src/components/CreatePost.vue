<template>
    <div class="shadow rounded-lg p-4 mb-4 d-flex align-items-center">
        <b-avatar
            src="https://picsum.photos/100"
            size="lg"></b-avatar>
        <b-button
            v-b-modal.createPost
            pill
            variant="light"
            size="lg"
            class="border-0 w-100 h-100 ml-2 text-left p-3"
            @click="subjectListing">
            Que voulez-vous dire ?</b-button>
        <b-modal
        v-model="visible"
        id="createPost"
        title="Quoi de neuf ?"
        hide-footer
        class="shadow rounded-lg p-4 mb-4">
            <b-form
                class="d-flex flex-column"
                @submit="createPost()">
                <b-form-group
                    id="input-group-title"
                    label="Titre* :"
                    label-for="title">
                    <b-form-input
                        v-model="newPost.title"
                        id="title"
                        type="text"
                        required>
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-subject"
                    label="Sujet* :"
                    label-for="subject">
                    <b-form-select
                        v-model="newPost.subject_id"
                        id="subject"
                        :options="options">
                    </b-form-select>
                </b-form-group>
                <b-form-group
                    id="input-group-postImage"
                    label="Image :"
                    label-for="postImage">
                    <b-form-file
                        id="postImage"
                        v-model="newPost.image_file"
                        :state="Boolean(newPost.image_file)"
                        accept="image/*"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here...">
                    </b-form-file>
                </b-form-group>
                <b-form-group
                    id="input-group-url"
                    label="Lien :"
                    label-for="url">
                    <b-form-input
                        v-model="newPost.url"
                        id="url"
                        type="text">
                    </b-form-input>
                </b-form-group>
                <p class=" align-self-end"><small>* : obligatoire</small></p>
                <b-button
                    type="submit"
                    variant="primary"
                    class="mx-auto">
                    Poster
                </b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CreatePost',
  data() {
    return {
      visible: false,
      newPost: {
        title: '',
        image_file: null,
        url: '',
        subject_id: '',
      },
      options: [],
    };
  },
  computed: {
    ...mapGetters(['allSubjects', 'userId']),
  },
  methods: {
    ...mapActions(['addPost']),
    subjectListing() {
      this.allSubjects.forEach((item) => {
        const newOption = {
          value: item.id,
          text: item.name,
        };
        this.options.push(newOption);
      });
    },
    createPost() {
      // Create a FormData instance
      const fd = new FormData();
      // Append form values inside
      fd.append('title', this.newPost.title);
      fd.append('url', this.newPost.url);
      fd.append('image_url', this.newPost.image_file /* , this.newPost.image_file.name */);
      fd.append('subject_id', this.newPost.subject_id);
      fd.append('user_id', this.userId);
      // Call the addPost action with the formData in param
      this.addPost(fd);
      // Reset the values of the form
      this.newPost.title = '';
      this.newPost.image_file = null;
      this.newPost.url = '';
      this.newPost.subject_id = '';
      // Hide the modal
      this.visible = false;
    },
  },
};
</script>

<style>

</style>
