<template>
    <b-navbar
      toggleable="md">
        <!-- Logo -->
        <b-navbar-brand
          tag="img"
          :src="require('../../assets/icon-left-font-220.png')"
          alt="Logo de Groupomania"
          fluid>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
         <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav justified align="end" class="w-100">
            <SearchBar />
            <div class="d-flex">
              <b-nav-item id="createPostorSubject">
                <b-icon icon="plus-circle" variant="dark" font-scale="1.5"></b-icon>
              </b-nav-item>
              <b-popover target="createPostorSubject" triggers="hover" placement="top">
                <b-button-group vertical>
                  <b-button variant="link">Créer un post</b-button>
                  <b-button variant="link">Créer un sujet</b-button>
                </b-button-group>
              </b-popover>
              <b-nav-item to="/">
                <b-icon icon="house-door-fill" variant="dark" font-scale="1.5"></b-icon>
              </b-nav-item>
              <b-nav-item>
                <b-icon icon="chat-dots" variant="dark" font-scale="1.5"></b-icon>
              </b-nav-item>
              <b-nav-item to="/personal">
                <b-icon icon="person-fill" variant="dark" font-scale="1.5"></b-icon>
              </b-nav-item>
            </div>
          </b-navbar-nav>
        </b-collapse>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.btn-link {
  color: #00B3D9 !important;
}
</style>
