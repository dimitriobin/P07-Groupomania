<template>
  <b-nav pills align="center"
      class="mb-4 bg-white rounded-lg p-2 shadow h5 font-weight-bold py-2">
      <b-nav-item
        class="mx-3"
        @click="handleSorting('top')"
        :active="selected === 'top'">
        Top
      </b-nav-item>
      <b-nav-item
        class="mx-3"
        @click="handleSorting('new')"
        :active="selected === 'new'">
        New
      </b-nav-item>
      <b-nav-item
        class="mx-3"
        @click="handleSorting('hot')"
        :active="selected === 'hot'">
        Hot
      </b-nav-item>
  </b-nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SortingNav',
  data() {
    return {
      selected: 'new',
    };
  },
  methods: {
    ...mapActions(['fetchAllPostsByNew', 'fetchAllPostsByTop', 'fetchAllPostsByHot']),
    handleSorting(keyword) {
      this.selected = keyword;
      switch (keyword) {
        case 'new':
          this.fetchAllPostsByNew(0);
          break;
        case 'top':
          this.fetchAllPostsByTop(0);
          break;
        case 'hot':
          this.fetchAllPostsByHot(0);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
</style>
