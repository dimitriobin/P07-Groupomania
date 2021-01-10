<template>
  <section id="PersonalAccount">
    <h1 class="h2 text-center mb-4 sr-only">Vos données personnelles</h1>
    <b-tabs
      content-class="p-5"
      pills
      fill>
      <!-- Subjects -->
      <b-tab
        title="Sujets">
        <h2 class="h4 text-center my-5">Vous suivez ces sujets</h2>
        <b-list-group
          flush
          class="w-50 mx-auto">
          <Subject
            v-for="subject in allFollows"
            :key="subject.id"
            :subject="subject" />
          <b-button
            v-if="!showAllSubjects"
            @click="showMoreSubjects()"
            variant="link">Voir tous les sujets</b-button>
          <Subject
            v-else
            v-for="subject in subjectsNotFollowed"
            :key="subject.id"
            :subject="subject" />
        </b-list-group>
      </b-tab>
      <!-- Profile -->
      <b-tab title="Profile" lazy>
        <UserForm :userData="oneUser" />
      </b-tab>
      <!-- Privacy -->
      <b-tab title="Privacy">
        <b-form @submit.prevent="handleUpdateRgpd()">
          <!-- <b-form-group description="rgpd"> -->
            <b-row>
              <b-col
                cols="12"
                class="d-flex align-items-center flex-row-reverse justify-content-end">
                <label
                  for="restricted"
                  class="ml-2 my-0">
                  Restreindre l'utilisation de mes données</label>
                <input
                  v-model="rgpdCheckboxes.restricted"
                  @change="updateSuccess = false"
                  cols="9"
                  id="restricted"
                  type="checkbox">
              </b-col>
              <b-col
                cols="12"
                class="d-flex align-items-center flex-row-reverse justify-content-end">
                <label
                  for="contactable"
                  class="ml-2 my-0">
                  Etre contacté par des partenaires commerciaux</label>
                <input
                  v-model="rgpdCheckboxes.contactable"
                  @change="updateSuccess = false"
                  cols="9"
                  id="contactable"
                  type="checkbox">
              </b-col>
              <b-col
                cols="12"
                class="d-flex align-items-center flex-row-reverse justify-content-end">
                <label
                  for="shareWithPartners"
                  class="ml-2 my-0">
                  Accepter que les données soient transmises a des partenaires</label>
                <input
                  v-model="rgpdCheckboxes.shareWithPartners"
                  @change="updateSuccess = false"
                  cols="9"
                  id="shareWithPartners"
                  type="checkbox">
              </b-col>
            </b-row>
          <!-- </b-form-group> -->
          <p v-if="updateSuccess" class="text-success mt-2 mb-0">
            Les modifications ont bien été prises en compte
          </p>
          <b-button
            id="submitRgpd"
            type="submit"
            variant="dark"
            class="my-3">Envoyer</b-button>
        </b-form>
        <b-button
          v-b-modal.supressAccount
          type="button"
          variant="link">
          Supprimer mon compte
        </b-button>
          <b-modal
            id="supressAccount"
            title="BootstrapVue"
            centered
            hide-header
            hide-footer
            body-class="p-4 d-flex flex-column align-items-center">
            <p class="my-4 text-center">
              Vous êtes sur le point de supprimer votre compte de manière
              définitive.
            </p>
            <b-button
              @click="handleDelete()"
              variant="success"
              class="w-50 mb-2">
              Supprimer votre compte
            </b-button>
            <b-button
              @click="$bvModal.hide('supressAccount')"
              variant="danger"
              class="w-50">
              Annuler
            </b-button>
          </b-modal>
        <b-button
          @click="handleExport()"
          type="button"
          variant="link">
          Télécharger les données de votre compte
        </b-button>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import Subject from '@/components/Subject.vue';
import UserForm from '@/components/UserForm.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PersonalAccount',
  components: {
    Subject,
    UserForm,
  },
  data() {
    return {
      showAllSubjects: false,
      rgpdCheckboxes: {
        restricted: '',
        contactable: '',
        shareWithPartners: '',
      },
      updateSuccess: false,
      exportedDataURL: '',
    };
  },
  computed: {
    ...mapGetters(['oneUser', 'userId', 'allSubjects', 'allFollows']),
    subjectsNotFollowed() {
      const followsId = this.allFollows.map((follow) => follow.id);
      return this.allSubjects.filter((subject) => !followsId.includes(subject.id));
    },
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'fetchAllSubjects',
      'getFollows',
      'updateUser',
      'deleteUser',
      'logout',
      'exportUser']),
    showMoreSubjects() {
      this.showAllSubjects = true;
      this.fetchAllSubjects();
    },
    handleUpdateRgpd() {
      this.updateSuccess = false;
      this.updateUser({
        id: this.userId,
        data: this.rgpdCheckboxes,
      })
        .then(() => {
          this.updateSuccess = true;
        });
    },
    handleDelete() {
      this.deleteUser(this.userId)
        .then(() => {
          this.logout();
        });
    },
    handleExport() {
      this.exportUser(this.userId)
        .then((response) => {
          const exportedDataURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement('a');
          fileLink.href = exportedDataURL;
          fileLink.setAttribute('download', 'file.pdf');
          document.body.appendChild(fileLink);
          fileLink.click();
        });
    },
  },
  mounted() {
    this.getFollows(this.userId);
    this.fetchUser(this.userId)
      .then(() => {
        this.rgpdCheckboxes.restricted = this.oneUser.restricted;
        this.rgpdCheckboxes.contactable = this.oneUser.contactable;
        this.rgpdCheckboxes.shareWithPartners = this.oneUser.shareWithPartners;
      });
  },
};
</script>

<style>
</style>
