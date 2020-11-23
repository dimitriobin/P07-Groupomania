<template>
  <b-row id="Post" class="bg-white shadow rounded-lg p-4">
    <b-col cols="12" tag="header" class="mb-2">
      <b-row no-gutters align-v="center">
        <b-img cols="3" src="https://picsum.photos/70" class="rounded-circle mr-4"></b-img>
        <b-col class="text-left">
          <p class="h4">John Doe</p>
          <p class="h6">Politics</p>
        </b-col>
      </b-row>
      </b-col>
      <b-col cols="12" class="my-3  text-left">
        <p class="h4 font-weight-bold">Lorem ipsum dolor sit amet,
            abitur vestibulum pretium ipsum, eget iaculis dolor convallis eg
            et. Nulla molestie lectus quis felis elementum maximus.</p>
        <b-img fluid class="w-100 my-4" src="https://picsum.photos/400/200"></b-img>
        <a href="#">https://www.reddit.com/</a>
        <p class="mb-0 text-muted"><small>Il Y A 4 HEURES</small></p>
      </b-col>
      <b-col cols="12" class="h2 mb-5">
        <b-form class="w-100" @submit="onSubmit">
          <b-row align-v="center">
            <b-col cols="11">
              <b-form-textarea
                  id="textarea-rows"
                  placeholder="Add a comment ..."
              ></b-form-textarea>
            </b-col>
            <b-col cols="1">
              <b-button type="submit" variant="link" class="text-decoration-none">Submit</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
      <!-- Comment test -->
      <b-col cols="12"  class="text-left mb-4">
        <b-row align-v="start">
          <b-col cols="1">
              <b-avatar
              size="4rem"
              variant="info"
              src="https://placekitten.com/300/300"
              class="mr-3"></b-avatar>
          </b-col>
          <b-col cols="11" class="border-bottom border-muted">
            <p class="h5 font-weight-bold">John Doe <small>- Il y a 2 heures</small></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cum ab quas blanditiis voluptas tempora laudantium nam sit
            maxime aliquid a saepe libero fugit eaque ex quasi molestias,
            doloremque natus rem?</p>
          </b-col>
        </b-row>
      </b-col>
      <!-- Comment test -->
      <b-col cols="12"  class="text-left mb-4">
        <b-row align-v="start">
          <b-col cols="1">
              <b-avatar
              size="4rem"
              variant="info"
              src="https://placekitten.com/300/300"
              class="mr-3"></b-avatar>
          </b-col>
          <b-col cols="11" class="border-bottom border-muted">
            <p class="h5 font-weight-bold">John Doe <small>- Il y a 2 heures</small></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cum ab quas blanditiis voluptas tempora laudantium nam sit
            maxime aliquid a saepe libero fugit eaque ex quasi molestias,
            doloremque natus rem?</p>
          </b-col>
        </b-row>
      </b-col>
      <!-- Comment test -->
      <b-col cols="12"  class="text-left mb-4">
        <b-row align-v="start">
          <b-col cols="1">
              <b-avatar
              size="4rem"
              variant="info"
              src="https://placekitten.com/300/300"
              class="mr-3"></b-avatar>
          </b-col>
          <b-col cols="11" class="border-bottom border-muted">
            <p class="h5 font-weight-bold">John Doe <small>- Il y a 2 heures</small></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cum ab quas blanditiis voluptas tempora laudantium nam sit
            maxime aliquid a saepe libero fugit eaque ex quasi molestias,
            doloremque natus rem?</p>
          </b-col>
        </b-row>
      </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Post',
  components: {},
};
</script>

<style scoped>
  body {
    background: black;
  }
</style>
