<template>
  <b-row no-gutters id="Sidebar">
    <b-col cols="12" class="p-4 rounded-lg bg-white mb-3 shadow">
      <h2 class="h5 text-muted text-left font-weight-bold mb-3">Top des sujets</h2>
      <b-list-group tag="ol">
        <b-list-group-item
          tag="li"
          class="d-flex justify-content-between align-items-center border-0 py-2 text-left">
          1. Histoires d'afterwork
          <b-link to="/subject" class="text-right">Suivre</b-link>
        </b-list-group-item>
        <b-list-group-item
          tag="li"
          class="d-flex justify-content-between align-items-center border-0 py-2">
          2. J'aime mon boss
          <b-link to="/subject" class="text-right">Suivre</b-link>
        </b-list-group-item>
        <b-list-group-item
          tag="li"
          class="d-flex justify-content-between align-items-center border-0 py-2">
          3. Machine à café
          <b-link to="/subject" class="text-right">Suivre</b-link>
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col cols="12" class=" p-4 rounded-lg bg-white  shadow">
      <h2 class="h5 text-muted text-wrap text-left font-weight-bolder mb-3">
        Visitez les profils de vos collègues
      </h2>
      <b-row no-gutters align-v="center" class="ml-3 mb-3">
        <b-img
          alt="Photo de profil"
          src="https://picsum.photos/50"
          class="rounded-circle mr-3"></b-img>
        <b-col class="text-left">
          <p class="h5 mb-0">John Doe</p>
          <b-link href="#" class="h6 text-left">Visiter la page</b-link>
        </b-col>
      </b-row>
      <b-row no-gutters align-v="center" class="ml-3 mb-3">
        <b-img
          alt="Photo de profil"
          src="https://picsum.photos/50"
          class="rounded-circle mr-3"></b-img>
        <b-col class="text-left">
          <p class="h5 mb-0">John Doe</p>
          <b-link href="#" class="h6 text-left">Visiter la page</b-link>
        </b-col>
      </b-row>
      <b-row no-gutters align-v="center" class="ml-3 mb-3">
        <b-img
          alt="Photo de profil"
          src="https://picsum.photos/50"
          class="rounded-circle mr-3"></b-img>
        <b-col class="text-left">
          <p class="h5 mb-0">John Doe</p>
          <b-link href="#" class="h6 text-left">Visiter la page</b-link>
        </b-col>
      </b-row>
      <b-row no-gutters align-v="center" class="ml-3 mb-3">
        <b-img
          alt="Photo de profil"
          src="https://picsum.photos/50"
          class="rounded-circle mr-3"></b-img>
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
