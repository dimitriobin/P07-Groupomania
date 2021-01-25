<template>
  <div id="app" class="h-100">
    <Header v-if="isLogged" />
    <b-container class="p-4 h-100">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
  },
  watch: {
    $route(to, from) {
      if (from.path === '/chat' && to.path !== '/chat') {
        this.setCurrentConversation(0);
      }
    },
  },
  computed: {
    ...mapGetters([
      'loggedUser',
    ]),
    isLogged() {
      return this.loggedUser.status.loggedIn;
    },
  },
  methods: {
    ...mapMutations(['setCurrentConversation']),
  },
};
</script>

<style>
#app {
  box-sizing: border-box;
  padding-top: 100px;
}

@media screen and (min-width: 576px) {
  #app {
    padding-top: 60px;
  }
}
</style>
