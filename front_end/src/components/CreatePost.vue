<template>
  <b-modal
    id="createPost"
    centered
    title="Créer un nouveau post"
    hide-footer>
    <b-form class="d-flex flex-column">
        <b-form-group
            id="input-group-subject"
            label="Sujet* :"
            label-for="subject">
            <b-form-select id="subject">
            </b-form-select>
        </b-form-group>
        <b-form-group
            id="input-group-title"
            label="Titre* :"
            label-for="title">
            <b-form-input
                id="title"
                type="text"
                required>
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-description"
            label="Description* :"
            label-for="description">
            <b-form-textarea
                id="description"
                required>
            </b-form-textarea>
        </b-form-group>
        <b-form-group
            id="input-group-postImage"
            label="Image :"
            label-for="postImage">
            <b-form-file
                id="postImage"
                :state="Boolean(/*file1*/)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept="image/*">
            </b-form-file>
        </b-form-group>
        <b-form-group
            id="input-group-url"
            label="Lien :"
            label-for="url">
            <b-form-input
                id="url"
                type="text"
                required>
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
</template>

<script>
export default {
  name: 'CreatePost',
};
</script>

<style>

</style>
