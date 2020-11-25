<template>
  <b-nav pills align="center"
      class="mb-4 bg-white rounded-lg p-2 shadow h5 font-weight-bold py-2">
      <b-nav-item class="mx-3" active>Top</b-nav-item>
      <b-nav-item class="mx-3">New</b-nav-item>
      <b-nav-item class="mx-3">Hot</b-nav-item>
  </b-nav>
</template>

<script>
export default {
  name: 'SortingNav',
};
</script>

<style lang="scss" scoped>
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  color: white !important;
  background-color: #dc3545;
}
</style>
