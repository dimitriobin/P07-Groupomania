<template>
  <b-row  id="Subject" >
    <b-col tag="header" cols="12">
      <div class=" bg-white shadow rounded-lg mb-4">
        <b-img
        fluid-grow
        src="https://picsum.photos/800/200"
        alt="bannière du sujet"></b-img>
        <h1 class="font-weight-bold py-3">Here is the subject title</h1>
      </div>
    </b-col>
    <b-col cols="12" lg="4" tag="aside" order-lg="3">
      <div class="bg-white shadow rounded-lg p-4 text-left mb-4">
        <h2 class="h3">A propos</h2>
        <p><small>Crée le 16 janvier 2021</small></p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Aperiam totam illo nulla, iure quas sed explicabo velit,
            mollitia id iste placeat dolorum libero dicta natus minus
            autem enim qui harum.</p>
        <p class="d-inline-block mr-5 mr-lg-5"><span class="h4">320</span><br>Membres</p>
        <p class="d-inline-block ml-5 ml-lg-5"><span class="h4">15</span><br>en ligne</p>
        <b-button block variant="info">Rejoindre</b-button>
      </div>
    </b-col>
    <b-col tag="main" cols="12" lg="8">
      <h2 class="sr-only">Les posts de ce sujets</h2>
      <SortingNav />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
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
