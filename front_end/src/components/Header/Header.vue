<template>
    <header id="mainHeader" class="bg-white shadow-sm w-100">
      <b-container role="navigation">
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

<style scoped>
#mainHeader {
  height: 100px;
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 576px) {
    #mainHeader {
    height: 60px;
    flex-direction: row;
  }
}
</style>
