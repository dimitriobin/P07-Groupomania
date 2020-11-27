<template>
    <b-navbar class="flex-column flex-sm-row">
        <!-- Logo -->
        <b-navbar-brand
          to="/">
          <b-img
            fluid
            width="220"
            :src="require('../../assets/img/icon-left-font-removebg-cropped.png')"
            alt="Logo de Groupomania"></b-img>
        </b-navbar-brand>
        <b-navbar-nav  align="end" class="w-100 align-items-center">
          <!-- SEARCHBAR -->
          <SearchBar />
          <!-- ICONS -->
          <div class="d-flex mx-auto mx-sm-0">
            <b-nav-item-dropdown
              right
              no-caret>
              <template v-slot:button-content>
                <b-icon icon="plus-circle" variant="dark" font-scale="1.5"></b-icon>
              </template>
              <b-dropdown-item href="#">Créer un post</b-dropdown-item>
              <b-dropdown-item href="#">Créer un sujet</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/">
              <b-icon icon="house-door-fill" variant="dark" font-scale="1.5"></b-icon>
            </b-nav-item>
            <b-nav-item>
              <b-icon icon="chat-dots" variant="dark" font-scale="1.5"></b-icon>
            </b-nav-item>
            <b-nav-item-dropdown
              right
              no-caret>
              <template v-slot:button-content>
                <b-icon icon="person-fill" variant="dark" font-scale="1.5"></b-icon>
              </template>
              <b-dropdown-item to="/user">Voir votre profil</b-dropdown-item>
              <b-dropdown-item to="/personal">Modifier vos informations</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
    </b-navbar>
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

<style>
</style>
