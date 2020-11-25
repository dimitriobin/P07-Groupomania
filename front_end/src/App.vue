<template>
  <div id="app">
    <header class="bg-white shadow-sm mb-4">
      <b-container>
        <Navbar />
      </b-container>
    </header>
    <b-container tag="main">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Header/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #F9F9F9;
}
</style>
