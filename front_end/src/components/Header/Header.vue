<template>
    <header class="bg-white shadow-sm mb-4">
      <b-container>
        <Navbar />
      </b-container>
    </header>
</template>

<script>
import Navbar from '@/components/Header/Navbar.vue';

export default {
  name: 'Header',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
</style>
