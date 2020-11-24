<template>
  <div id="PersonalAccount">
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Profile">
        <b-form >
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-cols="2"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="email"
              placeholder="Enter new email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your User Name:"
            label-cols="2"
            label-for="input-2">
            <b-form-input
              id="input-2"
              placeholder="Enter new user name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Change password:"
            label-cols="2"
            label-for="input-3">
            <b-form-input
              id="input-3"
              placeholder="Enter new password"
            ></b-form-input>
          </b-form-group>

          <b-form-group
          id="input-group-4"
          label="Your avatar:"
          label-cols="2"
          label-for="input-4">
            <b-form-file
              id="input-4"
              :state="Boolean(/*file1*/)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              accept="image/*"
            ></b-form-file>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Birthday date:"
            label-cols="2"
            label-for="input-5">
            <b-form-datepicker
            id="input-5">
            </b-form-datepicker>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Parent email:"
            label-cols="2"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              type="email"
              placeholder="If you're less than 18 please entre your parent email"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="dark">Submit</b-button>
        </b-form>
      </b-tab>
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
