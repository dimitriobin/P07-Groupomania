<template>
  <b-row no-gutters tag="aside" id="Sidebar">
    <b-col cols="12" class="p-4 rounded-lg bg-white mb-3">
      <h2 class="h5 text-muted text-left font-weight-bold mb-3">Top des sujets</h2>
      <b-row no-gutters tag="ol" class="px-md-3 px-lg-5">
        <b-col cols="12" class="d-flex">
          <li class="text-left flex-grow-1 font-weight-bold">News</li>
          <b-link to="/user" class="text-right">Suivre</b-link>
        </b-col>
        <b-col cols="12" class="d-flex">
          <li class="text-left flex-grow-1 font-weight-bold">Politics</li>
          <b-link to="/user" class="text-right">Suivre</b-link>
        </b-col>
        <b-col cols="12" class="d-flex">
          <li class="text-left flex-grow-1 font-weight-bold">Dogs</li>
          <b-link to="/user" class="text-right">Suivre</b-link>
        </b-col>
        <b-col cols="12" class="d-flex">
          <li class="text-left flex-grow-1 font-weight-bold">Humor</li>
          <b-link to="/user" class="text-right">Suivre</b-link>
        </b-col>
      </b-row>
      <router-link to="/subjects"
        class="btn btn-danger text-white font-weight-bold mx-auto">
        Tous les sujets
      </router-link>
    </b-col>
    <b-col cols="12" class=" p-4 rounded-lg bg-white">
      <h2 class="h5 text-muted text-wrap text-left font-weight-bolder mb-3">
        Visitez les profils de vos collègues
      </h2>
      <b-row no-gutters align-v="center" class="ml-3 mb-3">
        <b-img cols="3" src="https://picsum.photos/50" class="rounded-circle mr-3"></b-img>
        <b-col class="text-left">
          <p class="h5 mb-0">John Doe</p>
          <b-link href="#" class="h6 text-left">Visiter la page</b-link>
        </b-col>
      </b-row>
      <b-row no-gutters align-v="center" class="ml-3 mb-3">
        <b-img cols="3" src="https://picsum.photos/50" class="rounded-circle mr-3"></b-img>
        <b-col class="text-left">
          <p class="h5 mb-0">John Doe</p>
          <b-link href="#" class="h6 text-left">Visiter la page</b-link>
        </b-col>
      </b-row>
      <b-row no-gutters align-v="center" class="ml-3 mb-3">
        <b-img cols="3" src="https://picsum.photos/50" class="rounded-circle mr-3"></b-img>
        <b-col class="text-left">
          <p class="h5 mb-0">John Doe</p>
          <b-link href="#" class="h6 text-left">Visiter la page</b-link>
        </b-col>
      </b-row>
      <b-row no-gutters align-v="center" class="ml-3 mb-3">
        <b-img cols="3" src="https://picsum.photos/50" class="rounded-circle mr-3"></b-img>
        <b-col class="text-left">
          <p class="h5 mb-0">John Doe</p>
          <b-link href="#" class="h6 text-left">Visiter la page</b-link>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#Sidebar {
    a {
        color: #00B3D9;
    }
}
</style>
