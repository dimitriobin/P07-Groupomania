<template>
  <b-row id="SubjectSuggest" class="shadow rounded-lg p-5">
    <b-col cols="12">
      <h2>Bonjour </h2>
      <p>Vous ne suivez actuellement aucun sujet de conversation,
        nous vous proposons une selection de sujets qui pourraient vous correspondre.</p>
      <p class="mb-0">Selectionnez en au moins 3 pour commencer à remplir votre fil de posts
        et voir ce que vos collègues ont à dire !</p>
    </b-col>
    <b-col cols="12">
      <b-row
        tag="ul"
        cols="1"
        class="col-12 mx-auto my-5">
        <subject
          v-for="(subject, index) in allSubjects"
          :key="index"
          :subject="subject">
        </subject>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import Subject from '@/components/Subject.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SubjectSuggest',
  components: {
    Subject,
  },
  data() {
    return {
      subjects: '',
    };
  },
  computed: {
    ...mapGetters(['allSubjects', 'allFollows', 'loggedUser']),
  },
  methods: {
    ...mapActions(['fetchAllSubjects', 'follow', 'getFollows']),
  },
  mounted() {
    this.fetchAllSubjects();
  },
};
</script>

<style scoped>
.suggest {
  background: transparent;
  border: 1px solid orange;
  list-style-type: none;
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  position: relative;
  margin-bottom: 2%;
}
.suggest:hover,
.active{
  cursor: pointer;
  background: orange;
  color: white;
  transition: all 0.3s;
}
</style>
