<template>
  <div id="app">
    <Header v-show="isLogged" />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
  },
  computed: {
    ...mapGetters(['loggedUser']),
    isLogged() {
      return this.loggedUser.status.loggedIn;
    },
  },
};
</script>

<style>
</style>
