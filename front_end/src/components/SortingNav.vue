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
export default {
  name: 'SortingNav',
  data() {
    return {
      selected: 'new',
    };
  },
  methods: {
    handleSorting(keyword) {
      this.$emit('sortBy', keyword);
      this.selected = keyword;
    },
  },
};
</script>

<style>
</style>
