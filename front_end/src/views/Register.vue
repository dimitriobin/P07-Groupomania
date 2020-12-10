<template>
    <section class="full-height d-flex flex-column justify-content-center">
      <h1 class="sr-only">Inscription et connexion</h1>
      <b-img
        :src="require('../assets/img/icon-above-font.png')"
        fluid
        width="450"
        class="mx-auto mb-5">
      </b-img>
      <b-row>
        <b-col cols="6" class="mx-auto p-5 shadow rounded">
          <h2 class="sr-only">Connexion</h2>
          <Login />
        </b-col>
        <b-modal
          id="signupForm"
          size="lg"
          hide-header
          hide-footer
          body-class="p-5">
          <SubjectSuggest v-if="isSuggestVisible" />
          <Signup v-else @userSigned="showSuggests" />
        </b-modal>
      </b-row>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Signup from '../components/Register/Signup.vue';
import Login from '../components/Register/Login.vue';
import SubjectSuggest from '../components/Register/SubjectSuggest.vue';

export default {
  name: 'Register',
  components: {
    Signup,
    Login,
    SubjectSuggest,
  },
  data() {
    return {
      isSuggestVisible: false,
    };
  },
  computed: {
    ...mapGetters(['loggedUser']),
    loggedIn() {
      return this.loggedUser.status.loggedIn;
    },
  },
  methods: {
    showSuggests() {
      this.isSuggestVisible = true;
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
