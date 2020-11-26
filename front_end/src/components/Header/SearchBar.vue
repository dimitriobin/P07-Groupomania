<template>
    <b-nav-form
        id="searchBar"
        class="mx-md-auto d-none d-md-block w-50">
        <label class="sr-only" for="searchBar">Name</label>
        <b-form-input
            size="sm"
            class="my-3 my-md-0 w-100">
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
    position: relative;
    button {
        position: absolute;
        right: 10px;
        font-weight: light;
        color: #00B3D9;
    }
}
</style>
