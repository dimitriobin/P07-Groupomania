<template>
    <b-form inline id="searchBar" class="w-100">
        <label class="sr-only" for="searchBar">Name</label>
        <b-form-input
            id="searchBar"
            class="mb-2 mr-sm-2 mb-sm-0 w-100">
        </b-form-input>
        <b-button variant="link">Search</b-button>
    </b-form>
</template>

<script>
export default {
  name: 'SearchBar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#searchBar {
    button {
        position: absolute;
        right: 10px;
        font-weight: light;
        color: black;
    }
}
</style>
