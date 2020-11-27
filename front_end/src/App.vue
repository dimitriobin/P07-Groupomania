<template>
  <div id="app">
    <Header />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
</style>
