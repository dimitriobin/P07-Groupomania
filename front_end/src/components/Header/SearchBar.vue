<template>
    <b-nav-form id="searchBar">
        <label class="sr-only" for="searchBar">Name</label>
        <b-form-input
            id="searchBar"
            class="mb-2 mr-sm-2 mb-sm-0">
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
    button {
        position: absolute;
        right: 10px;
        font-weight: light;
        color: black;
    }
}
</style>
