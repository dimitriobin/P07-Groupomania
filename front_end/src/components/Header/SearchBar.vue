<template>
  <b-nav-form
    @submit.prevent="handleSearch()"
    id="searchNav"
    class="mx-md-auto d-none d-md-block w-50">
    <label class="sr-only" for="searchBar">Rechercher des posts par mots-clefs</label>
    <b-form-input
      v-model="keyword"
      id="searchBar"
      type="text"
      size="sm"
      class="my-3 my-md-0 w-100">
    </b-form-input>
    <b-button
      type="submit"
      size="sm"
      variant="link">
      Rechercher
    </b-button>
  </b-nav-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchBar',
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
    ...mapActions(['displayBy', 'fetchAllPostsByKeyword']),
    handleSearch() {
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' });
      }
      this.fetchAllPostsByKeyword({ page: 0, keyword: this.keyword });
      this.keyword = '';
    },
  },
};
</script>

<style>
</style>
