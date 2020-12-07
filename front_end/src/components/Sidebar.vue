<template>
  <b-row no-gutters id="Sidebar">
    <b-col cols="12" class="p-4 rounded-lg bg-white mb-3 shadow">
      <h2 class="h5 text-muted text-left font-weight-bold mb-3">Top des sujets</h2>
      <b-list-group tag="ol">
        <b-list-group-item
          v-for="(subject, index) in topFive"
          :key="index"
          tag="li"
          class="d-flex justify-content-between align-items-center border-0 py-2 text-left">
          <b-button
            @click="fetchAllPostsBySubject(subject.id)"
            variant="link"
            class="text-dark p-0 text-left">
            {{ subject.name }}
          </b-button>
          <b-link class="text-right">Suivre</b-link>
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col cols="12" class=" p-4 rounded-lg bg-white  shadow">
      <h2 class="h5 text-muted text-wrap text-left font-weight-bolder mb-3">
        Des collègues qui peuvent vous intéresser
      </h2>
      <b-row
        no-gutters
        align-v="center"
        class="ml-3 mb-3">
        <b-img
          alt="Photo de profil"
          src="https://picsum.photos/50"
          class="rounded-circle mr-3"></b-img>
        <b-col class="text-left">
          <p class="h5 mb-0">John Doe</p>
          <b-link href="#" class="h6 text-left">Visiter la page</b-link>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters(['allSubjects', 'allUsers']),
    topFive() {
      const subjects = this.allSubjects;
      return subjects.sort((a, b) => a - b).slice(0, 5);
    },
  },
  methods: {
    ...mapActions(['fetchAllSubjects', 'fetchAllUsers']),
  },
  created() {
    this.fetchAllSubjects();
    this.fetchAllUsers();
  },
};
</script>

<style>
</style>
