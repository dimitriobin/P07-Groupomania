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
          <b-nav-item to="/">
            <b-icon icon="house-door-fill" variant="dark" font-scale="1.5"></b-icon>
          </b-nav-item>
          <b-nav-item to="/chat" class="position-relative">
            <b-icon
              icon="chat-dots"
              variant="dark"
              font-scale="1.5">
            </b-icon>
            <b-badge
              pill
              class="icon_counter"
              variant="danger">
              {{ unreadCount }}
          </b-badge>
          </b-nav-item>
          <b-nav-item-dropdown
            right
            no-caret>
            <template v-slot:button-content>
              <b-icon icon="person-fill" variant="dark" font-scale="1.5"></b-icon>
            </template>
            <b-dropdown-item :to="`/user/${userId}`">Voir votre profil</b-dropdown-item>
            <b-dropdown-item to="/personal">Modifier vos informations</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item @click.prevent="logout">
            <b-icon icon="power" variant="dark" font-scale="1.5"></b-icon>
          </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import SearchBar from '@/components/Header/SearchBar.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Header',
  components: {
    SearchBar,
  },
  computed: {
    ...mapGetters([
      'userId',
      'unreadCount',
    ]),
  },
  methods: {
    ...mapActions([
      'logout',
      'getUnreadMessagesCount',
    ]),
  },
  mounted() {
    this.getUnreadMessagesCount();
  },
};
</script>

<style>
</style>
