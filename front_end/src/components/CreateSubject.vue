<template>
  <b-modal
    id="createSubject"
    centered
    title="Créer un nouveau sujet"
    hide-footer>
    <b-form class="d-flex flex-column">
        <b-form-group
            id="input-group-subjectName"
            label="Titre* :"
            label-for="subjectName">
            <b-form-input
                id="subjectName"
                type="text"
                required>
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-subjectDescription"
            label="Description* :"
            label-for="subjectDescription">
            <b-form-textarea
                id="subjectDescription"
                rows="3"
                required>
            </b-form-textarea>
        </b-form-group>
        <p class=" align-self-end"><small>* : obligatoire</small></p>
        <b-button
            type="submit"
            variant="primary"
            class="mx-auto">
            Créer
        </b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'CreateSubject',
};
</script>

<style>

</style>
