<template>
  <b-row
    tag="section"
    id="User"
    class="m-0">
    <b-col
      tag="h1"
      cols="12"
      class="text-center sr-only">
      User name
      </b-col>
    <b-col cols="12" order="1">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </b-col>
    <!-- ASIDE INFOS -->
    <b-col
      tag="aside"
      cols="12"
      class="d-flex flex-column justify-start align-items-center mb-4">
      <b-card
        class="w-100 align-items-center border-0 shadow mb-4">
        <b-avatar
          src="https://picsum.photos/200"
          size="150px"
          class="mb-3">
        </b-avatar>
        <h2 class="mb-3">User_name</h2>
        <b-button variant="info">Envoyer un message</b-button>
      </b-card>
      <b-card
        class="w-100 align-items-center border-0 shadow"
        body-class="w-100 py-4 px-5">
        <h2>Sujets suivis :</h2>
        <b-list-group tag="ul">
          <b-list-group-item
            tag="li"
            class="d-flex justify-content-between align-items-center border-0 py-2 text-left">
            <b-button variant="link" class="text-dark p-0 text-left">
              Histoires d'afterwork</b-button>
            <b-link to="/subject" class="text-right">Suivre</b-link>
          </b-list-group-item>
          <b-list-group-item
            tag="li"
            class="d-flex justify-content-between align-items-center border-0 py-2">
            <b-button variant="link" class="text-dark p-0 text-left">
              J'aime mon boss</b-button>
            <b-link to="/subject" class="text-right">Suivre</b-link>
          </b-list-group-item>
          <b-list-group-item
            tag="li"
            class="d-flex justify-content-between align-items-center border-0 py-2">
            <b-button variant="link" class="text-dark p-0 text-left">
              Machine à café</b-button>
            <b-link to="/subject" class="text-right">Suivre</b-link>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue';

export default {
  name: 'User',
  components: {
    Post,
  },
};
</script>

<style>
</style>
