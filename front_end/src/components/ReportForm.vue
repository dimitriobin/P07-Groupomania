<template>
<div>
  <ValidationObserver
    v-if="!created"
    ref="reportObserver"
    name="createReportForm"
    v-slot="{ handleSubmit }">
    <b-form
      class="d-flex flex-column"
      @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
        name="message"
        rules="required|min:20|max:250"
        v-slot="{ valid, errors }">
        <b-form-group
          id="input-group-message"
          label="Message* :"
          label-for="message">
          <b-form-textarea
            v-model="report.message"
            id="message"
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
      <p class=" align-self-end"><small>* : obligatoire</small></p>
      <b-button
        type="submit"
        variant="primary"
        class="mx-auto w-100">
        Envoyer le signalement
      </b-button>
    </b-form>
  </ValidationObserver>
  <div
    v-else
    class="d-flex flex-column align-items-center">
    <h4>Merci de nous avoir signalé ce contenu !</h4>
    <b-icon-check-circle
      variant="success"
      font-scale="7.5"
      class="my-4">
    </b-icon-check-circle>
    <p>Nous examinerons votre rapport dans les plus brefs délais</p>
  </div>
</div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { mapActions } from 'vuex';

export default {
  name: 'ReportForm',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: [
    'itemId',
    'itemType',
  ],
  data() {
    return {
      report: {
        message: '',
      },
      created: false,
    };
  },
  methods: {
    ...mapActions([
      'createReport',
    ]),
    onSubmit() {
      const reportObj = {
        item_id: this.itemId,
        item_type: this.itemType,
        message: this.report.message,
      };
      this.createReport(reportObj)
        .then(() => {
          this.message = '';
          this.created = true;
        });
    },
  },
};
</script>

<style>

</style>
