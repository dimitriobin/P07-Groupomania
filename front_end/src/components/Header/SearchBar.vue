<template>
    <b-nav-form id="searchBar" class="mx-md-auto">
        <label class="sr-only" for="searchBar">Name</label>
        <b-form-input
            id="searchBar"
            size="sm"
            class="my-3 my-md-0">
        </b-form-input>
        <b-button size="sm" variant="link">Search</b-button>
    </b-nav-form>
</template>

<script>
export default {
  name: 'SearchBar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#searchBar {
    width: 100%;
    position: relative;
    button {
        position: absolute;
        right: 10px;
        font-weight: light;
        color: #00B3D9;
    }
}
</style>
