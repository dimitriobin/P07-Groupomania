<template>
  <div
    v-observe-visibility="handleScrolledToBottom">
    <b-spinner
      class="d-block my-5 mx-auto"
      label="Chargement...">
    </b-spinner>
  </div>
</template>

<script>
export default {
  name: 'LazyLoadingScroll',
  data() {
    return {
      page: 0,
    };
  },
  methods: {
    handleScrolledToBottom(isVisible) {
      if (!isVisible) return;
      this.page += 1;
      this.$emit('loadMore', this.page);
    },
  },
};
</script>

<style>

</style>
