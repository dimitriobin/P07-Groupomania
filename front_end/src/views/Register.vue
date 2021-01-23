<template>
    <main class="full-height d-flex flex-column justify-content-center">
      <h1 class="sr-only">Inscription et connexion</h1>
      <b-img
        :src="require('../assets/img/icon-above-font.png')"
        alt="Logo de groupomania"
        fluid
        width="450"
        class="mx-auto mb-5">
      </b-img>
      <b-row>
        <b-col cols="12" sm="10" md="8" lg="6" class="mx-auto p-4 shadow rounded">
          <h2 class="sr-only">Connexion</h2>
          <Login @isLogged="$bvModal.show('subjectSuggest')" />
        </b-col>
        <b-modal
          aria-label="Formulaire de création d'utilisateur"
          id="signupForm"
          size="lg"
          centered
          hide-header
          hide-footer
          body-class="p-4">
          <Signup @isLogged="$bvModal.show('subjectSuggest')" />
        </b-modal>
        <b-modal
          id="subjectSuggest"
          lazy
          centered
          size="lg"
          hide-header
          hide-footer
          body-class="p-5">
          <SubjectSuggest />
        </b-modal>
      </b-row>
    </main>
</template>

<script>
import { mapGetters } from 'vuex';
import Signup from '@/components/Register/Signup.vue';
import Login from '@/components/Register/Login.vue';
import SubjectSuggest from '@/components/SubjectSuggest.vue';

export default {
  name: 'Register',
  components: {
    Signup,
    Login,
    SubjectSuggest,
  },
  computed: {
    ...mapGetters(['loggedUser', 'allFollows']),
    loggedIn() {
      return this.loggedUser.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push({ name: 'Home' });
    }
  },
};
</script>

<style scoped>

.full-height {
  height: 85vh;
}
</style>
