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
    ...mapActions(['fetchUser', 'fetchAllSubjects', 'getFollows']),
    showMoreSubjects() {
      this.showAllSubjects = true;
      this.fetchAllSubjects();
    },
  },
  mounted() {
    this.getFollows(this.userId);
    this.fetchUser(this.userId);
  },
};
</script>

<style>
</style>
