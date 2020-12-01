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
            class="border-0 w-100 h-100 ml-2 text-left p-3">
            Que voulez-vous dire ?</b-button>
        <b-modal
        id="createPost"
        title="Quoi de neuf ?"
        hide-footer
        class="shadow rounded-lg p-4 mb-4">
            <b-form class="d-flex flex-column">
                <b-form-group
                    id="input-group-title"
                    label="Titre* :"
                    label-for="title">
                    <b-form-input
                        id="title"
                        type="text"
                        required
                        autofocus="true">
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-subject"
                    label="Sujet* :"
                    label-for="subject">
                    <b-form-select id="subject">
                    </b-form-select>
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
    </div>
</template>

<script>
export default {
  name: 'CreatePost',
};
</script>

<style>

</style>
