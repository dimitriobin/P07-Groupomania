<template>
  <div id="Sidebar">
    <p>Here will be printed some suggestions of subjects or users to follow</p>
    <router-link to="/subjects">Subjects</router-link> |
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #Sidebar {
    border: 1px solid black;
    width: 30%;
  }
</style>
