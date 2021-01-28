<template>
    <b-navbar class="flex-column flex-sm-row">
        <!-- Logo -->
        <b-navbar-brand
          href="#"
          to="/">
          <b-img
            fluid
            width="220"
            :src="require('../../assets/img/icon-left-font-removebg-cropped.png')"
            alt="Logo de Groupomania"></b-img>
        </b-navbar-brand>
        <b-navbar-nav class="w-100 justify-content-center justify-content-sm-end align-items-center">
          <!-- SEARCHBAR -->
          <SearchBar />
          <!-- ICONS -->
          <b-nav-item to="/" href="#">
            <b-icon
              aria-label="Visiter la page d'accueil"
              icon="house-door-fill"
              variant="dark"
              font-scale="1.5"
              title="Page d'acceuil">
            </b-icon>
          </b-nav-item>
          <b-nav-item to="/chat" href="#" class="position-relative">
            <b-icon
              aria-label="Visiter la messagerie"
              icon="chat-dots"
              variant="dark"
              font-scale="1.5">
            </b-icon>
            <b-badge
              v-if="unreadCount > 0"
              pill
              class="icon_counter"
              variant="danger">
              <span class="sr-only">Vous avez</span>
               {{ unreadCount }}
               <span class="sr-only">messages en attente d'être lus</span>
          </b-badge>
          </b-nav-item>
          <b-nav-item-dropdown
            right
            no-caret>
            <template v-slot:button-content>
              <b-icon
                aria-label="Votre compte"
                icon="person-fill"
                variant="dark"
                font-scale="1.5">
              </b-icon>
            </template>
            <b-dropdown-item :to="`/user/${userId}`" href="#">Voir votre profil</b-dropdown-item>
            <b-dropdown-item to="/personal" href="#">Modifier vos informations</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item @click.prevent="logout">
            <b-icon
              aria-label="Se déconnecter"
              icon="power"
              variant="dark"
              font-scale="1.5">
            </b-icon>
          </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import SearchBar from '@/components/Header/SearchBar.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Header',
  components: {
    SearchBar,
  },
  computed: {
    ...mapGetters([
      'userId',
      'unreadCount',
      'socket',
      'currentConversation',
    ]),
  },
  methods: {
    ...mapActions([
      'logout',
      'getUnreadMessagesCount',
      'readAllConversations',
    ]),
    ...mapMutations([
      'incrementUnreadCount',
    ]),
  },
  mounted() {
    this.readAllConversations();
    this.getUnreadMessagesCount();
  },
};
</script>

<style>
</style>
