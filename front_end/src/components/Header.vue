<template>
  <div id="nav">
    <h1>This is the Header</h1>
    <router-link to="/">Home</router-link> |
    <router-link to="/subjects">Subjects</router-link> |
    <router-link to="/user">User</router-link>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#nav {
  padding: 30px;
  border: 1px solid black;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
