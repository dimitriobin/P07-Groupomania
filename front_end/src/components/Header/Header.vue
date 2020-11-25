<template>
  <header id="nav" class="shadow-sm mb-4">
    <b-container class="py-4">
      <b-row align-v="center" align-h="between" no-gutters>
        <b-col cols="12" lg='auto' class="text-lg-left mb-md-4 mb-lg-0">
          <!-- Logo -->
          <b-img :src="require('../../assets/icon-left-font-removebg-cropped.png')"
          alt="Logo de Groupomania" fluid></b-img>
        </b-col>
        <b-col md="7" lg="3" xl="4" class="my-3 my-md-0">
          <!-- Search bar -->
          <SearchBar />
        </b-col>
        <b-col tag="nav" md="auto" class="h2 my-0">
          <!-- Navigation with icons -->
          <b-icon icon="plus-circle" variant="dark" class="mx-2 mx-lg-2"></b-icon>
          <router-link to="/">
            <b-icon icon="house-door-fill" variant="dark" class="mx-2 mx-lg-2"></b-icon>
          </router-link>
          <b-icon icon="chat-dots" variant="dark" class="mx-2 mx-lg-2"></b-icon>
          <router-link to="/personal">
            <b-icon icon="person-fill" variant="dark" class="mx-2 mx-lg-2"></b-icon>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </header>
</template>

<script>
import SearchBar from '@/components/Header/SearchBar.vue';

export default {
  name: 'Header',
  components: {
    SearchBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
