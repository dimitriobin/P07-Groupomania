<template>
    <b-nav-form
        class="mx-md-auto d-none d-md-block w-50">
        <label class="sr-only" for="searchBar">Name</label>
        <b-form-input
            id="searchBar"
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

<style>
</style>
