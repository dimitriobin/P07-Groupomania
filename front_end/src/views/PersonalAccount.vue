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
          tag="ul"
          class="w-50 mx-auto">
          <b-list-group-item
            v-for="(subject, index) in oneUser.Subjects"
            :key="index"
            tag="li"
            class="d-flex justify-content-between align-items-center border-0 py-2 text-left">
              {{ subject.name }}
            <b-link class="text-right">Suivre</b-link>
          </b-list-group-item>
          <b-list-group-item :class="{ 'd-none' : moreSubjects}">
            <a
              @click="moreSubjects = !moreSubjects"
              v-b-toggle.moreSubjects>
              Voir plus de sujets</a>
          </b-list-group-item>
        </b-list-group>
        <b-collapse
          id="moreSubjects">
          <b-list-group
            flush
            tag="ul"
            class="w-50 mx-auto">
            <b-list-group-item
              v-for="(subject, index) in subjectsNotFollowed"
              :key="index"
              tag="li"
              class="d-flex justify-content-between align-items-center border-0 py-2 text-left">
                {{ subject.name }}
              <b-link class="text-right">Suivre</b-link>
            </b-list-group-item>
          </b-list-group>
        </b-collapse>
      </b-tab>
      <!-- Profile -->
      <b-tab title="Profile">
        <b-form >
          <b-form-group
            id="input-group-1"
            label="Email :"
            label-cols="2"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="email"
              :placeholder="oneUser.email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Pseudo:"
            label-cols="2"
            label-for="input-2">
            <b-form-input
              id="input-2"
              :placeholder="oneUser.user_name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Ancien mot de passe:"
            label-cols="2"
            label-for="input-3">
            <b-form-input
              id="input-3"
              placeholder="*********************"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Nouveau mot de passe:"
            label-cols="2"
            label-for="input-4">
            <b-form-input
              id="input-4"
              placeholder="*********************"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Confirmer le mot de passe:"
            label-cols="2"
            label-for="input-5">
            <b-form-input
              id="input-5"
              placeholder="*********************"
            ></b-form-input>
          </b-form-group>

          <b-form-group
          id="input-group-6"
          label="Photo de profil:"
          label-cols="2"
          label-for="input-6"
          class="d-flex">
            <b-form-file
                id="input-6"
                :state="Boolean(oneUser.image_url)"
                placeholder="Selectionner un fichier"
                drop-placeholder="Drop file here..."
                accept="image/*"
                class=" flex-grow-1"
              ></b-form-file>
          </b-form-group>

          <b-form-group
            id="input-group-7"
            label="Date de naissance:"
            label-cols="2"
            label-for="input-7">
            <b-form-datepicker
            id="input-7"
            :placeholder="oneUser.birthdate">
            </b-form-datepicker>
          </b-form-group>

          <b-form-group
            id="input-group-8"
            label="Email des responsables:"
            label-cols="2"
            label-for="input-8"
          >
            <b-form-input
              id="input-8"
              type="email"
              :placeholder="oneUser.parentEmail"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="dark">Envoyer</b-button>
        </b-form>
      </b-tab>
      <!-- Privacy -->
      <b-tab title="Privacy">
        <b-form>
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
                  cols="9"
                  id="restricted"
                  type="checkbox"
                  :checked="oneUser.restricted">
              </b-col>
              <b-col
                cols="12"
                class="d-flex align-items-center flex-row-reverse justify-content-end">
                <label
                  for="contactable"
                  class="ml-2 my-0">
                  Etre contacté par des partenaires commerciaux</label>
                <input
                  cols="9"
                  id="contactable"
                  type="checkbox"
                  :checked="oneUser.contactable">
              </b-col>
              <b-col
                cols="12"
                class="d-flex align-items-center flex-row-reverse justify-content-end">
                <label
                  for="sharedWithPartners"
                  class="ml-2 my-0">
                  Accepter que les données soient transmises a des partenaires</label>
                <input
                  cols="9"
                  id="sharedWithPartners"
                  type="checkbox"
                  :checked="oneUser.sharedWithPartners">
              </b-col>
            </b-row>
          <!-- </b-form-group> -->
          <b-button
            type="submit"
            variant="dark"
            class="my-3">Envoyer</b-button>
        </b-form>
        <b-button type="submit" variant="link">Supprimer mon compte</b-button>
        <b-button type="submit" variant="link">Télécharger les données de votre compte</b-button>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PersonalAccount',
  data() {
    return {
      moreSubjects: false,
    };
  },
  created() {
    this.fetchAllSubjects();
    this.fetchUser(this.getUserId);
  },
  computed: {
    ...mapGetters(['oneUser', 'Auth/loggedUser', 'allSubjects']),
    getUserId() {
      return this['Auth/loggedUser'].storedUser.userId;
    },
    subjectsNotFollowed() {
      const followed = this.oneUser.Subjects.map((subject) => subject.id);
      return this.allSubjects.filter((subject) => !followed.includes(subject.id));
    },
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchAllSubjects']),
  },
};
</script>

<style>
</style>
