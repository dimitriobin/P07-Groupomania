<template>
  <b-container id="nav">
    <b-row align-v="center" align-h="between">
      <b-col cols="12" lg='auto' class="text-lg-left mb-md-4 mb-lg-0">
        <b-img :src="require('../assets/icon-left-font.jpg')"
        alt="Logo de Groupomania" fluid></b-img>
      </b-col>
      <b-col md="7" lg="4" class="my-3 my-md-0">
        <b-input-group size="sm">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input type="search" placeholder="Search"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col md="auto" class="h3 my-0">
        <b-icon icon="plus-circle" variant="dark" class="mx-1 mx-lg-2"></b-icon>
        <router-link to="/">
          <b-icon icon="house-door-fill" variant="dark" class="mx-1 mx-lg-2"></b-icon>
        </router-link>
        <b-icon icon="chat-dots" variant="dark" class="mx-1 mx-lg-2"></b-icon>
        <router-link to="/personal">
          <b-icon icon="person-fill" variant="dark" class="mx-1 mx-lg-2"></b-icon>
        </router-link>
      </b-col>
    </b-row>
  </b-container>
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

  .logo {
    max-width: 250px;
    width: 100%;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
