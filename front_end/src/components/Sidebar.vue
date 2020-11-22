<template>
  <b-row no-gutters tag="aside" id="Sidebar" class="border border-dark">
    <b-col cols="12" class=" p-4 rounded-lg bg-white">
      <h2 class="h5 text-muted text-left font-weight-bold mb-3">Top des sujets</h2>
      <b-row no-gutters tag="ol" class="px-5">
        <b-col cols="12" class="d-flex">
          <li class="text-left flex-grow-1 font-weight-bold">News</li>
          <b-link href="#" class="text-right">Suivre</b-link>
        </b-col>
        <b-col cols="12" class="d-flex">
          <li class="text-left flex-grow-1 font-weight-bold">News</li>
          <b-link href="#" class="text-right">Suivre</b-link>
        </b-col>
        <b-col cols="12" class="d-flex">
          <li class="text-left flex-grow-1 font-weight-bold">News</li>
          <b-link href="#" class="text-right">Suivre</b-link>
        </b-col>
        <b-col cols="12" class="d-flex">
          <li class="text-left flex-grow-1 font-weight-bold">News</li>
          <b-link href="#" class="text-right">Suivre</b-link>
        </b-col>
      </b-row>
      <router-link to="/subjects"
        class="btn btn-danger text-white font-weight-bold mx-auto">
        Tous les sujets
      </router-link>
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
