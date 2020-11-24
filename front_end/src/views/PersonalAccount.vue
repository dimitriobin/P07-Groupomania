<template>
  <div id="PersonalAccount">
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Account" active>
        <p>I'm the first tab</p>
      </b-tab>
      <b-tab title="Profile"><p>I'm the second tab</p></b-tab>
      <b-tab title="Privacy"><p>I'm the tab with the very, very long title</p></b-tab>
    </b-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'PersonalAccount',
  components: {},
};
</script>

<style scoped>
  body {
    background: black;
  }
</style>
