<template>
  <b-row no-gutters id="sidebar">
    <!-- //////////////////////////////////////////////////////// -->
    <!-- //////////////// SUBJECTS SUGGESTIONS ////////////////// -->
    <!-- //////////////////////////////////////////////////////// -->
    <b-col cols="12" class="p-4 rounded-lg bg-white mb-3 shadow">
      <h2 class="h5 text-muted text-left font-weight-bold mb-3">Top des sujets</h2>
      <b-list-group
        tag="ol"
        class="px-4 px-lg-2 list-unstyled">
          <li>
            <subject
              v-for="(subject, index) in topFive"
              :key="index"
              @pressed="$emit('subjectClick', subject.id)"
              :subject="subject"
              :fill="true"
              class="text-dark p-0 text-left">
            </subject>
          </li>
      </b-list-group>
    </b-col>
    <b-col cols="12" class=" p-4 rounded-lg bg-white shadow d-none d-lg-block">
    <!-- //////////////////////////////////////////////////////// -->
    <!-- /////////////// COLLEGUES SUGGESTIONS ////////////////// -->
    <!-- //////////////////////////////////////////////////////// -->
      <h2 class="h5 text-muted text-wrap text-left font-weight-bolder mb-3">
        Des collègues qui peuvent vous intéresser
      </h2>
      <b-row
        v-for="(user, index) in userSuggest"
        :key="index"
        no-gutters
        align-v="center"
        class="ml-3 mb-3">
        <b-avatar
          v-if="user.image_url"
          :alt="`Photo de profil de ${user.user_name}`"
          :src="user.image_url"
          class="rounded-circle mr-3 bg-transparent"></b-avatar>
        <b-col class="text-left">
          <p class="h5 mb-0">{{ user.user_name }}</p>
          <router-link :to="`/user/${user.id}`" class="h6 text-left">Visiter la page</router-link>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Subject from '@/components/Subject.vue';

export default {
  name: 'Sidebar',
  components: {
    Subject,
  },
  computed: {
    ...mapGetters(['allSubjects', 'allUsers']),
    userSuggest() {
      const users = this.allUsers;
      return users.slice(0, 7);
    },
    topFive() {
      return this.allSubjects.filter((subject, index) => index < 5);
    },
  },
  methods: {
    ...mapActions(['fetchAllSubjects', 'fetchAllUsers', 'fetchAllPostsBySubject']),
  },
  mounted() {
    this.fetchAllSubjects();
    this.fetchAllUsers();
  },
};
</script>

<style>
@media screen and (min-width: 992px) {
  #sidebar {
    position: sticky !important;
    top: 80px;
  }
}
</style>>
