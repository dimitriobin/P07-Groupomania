<template>
  <b-row id="Subject" >
    <b-col cols="12">
      <b-img fluid-grow src="https://picsum.photos/800/200"></b-img>
      <h1 class="mb-4 bg-white rounded-lg p-2 font-weight-bold">Here is the subject title</h1>
    </b-col>
    <b-col cols="12" lg="8">
      <SortingNav />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </b-col>
    <b-col cols="12" lg="4" tag="aside" class="bg-white shadow rounded-lg p-4 h-100 text-left">
      <h2 class="h3 mb-3">A propos du sujet</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
         Aperiam totam illo nulla, iure quas sed explicabo velit,
          mollitia id iste placeat dolorum libero dicta natus minus
           autem enim qui harum.</p>
      <p class="d-inline-block mr-5"><span class="h4">320</span><br>Membres</p>
      <p class="d-inline-block ml-5"><span class="h4">15</span><br>en ligne</p>
      <b-button block variant="info">Rejoindre</b-button>
      <p><small>Crée le 16 janvier 2021</small></p>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import SortingNav from '@/components/SortingNav.vue';
import Post from '@/components/Post.vue';

export default {
  name: 'Subject',
  components: {
    SortingNav,
    Post,
  },
};
</script>

<style scoped>
  body {
    background: black;
  }
</style>
