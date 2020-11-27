<template>
  <section id="PersonalAccount">
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Sujets suivis">
        <b-list-group flush tag="ul">
          <b-list-group-item tag="li">
            <b-avatar class="mr-3"  src="https://picsum.photos/100"></b-avatar>
            Dapibus ac facilisis in
          </b-list-group-item>
          <b-list-group-item tag="li">
            <b-avatar class="mr-3"  src="https://picsum.photos/100"></b-avatar>
            Dapibus ac facilisis in
          </b-list-group-item>
          <b-list-group-item tag="li">
            <b-avatar class="mr-3"  src="https://picsum.photos/100"></b-avatar>
            Morbi leo risus
          </b-list-group-item>
          <b-list-group-item tag="li">
            <b-avatar class="mr-3"  src="https://picsum.photos/100"></b-avatar>
            Porta ac consectetur ac
          </b-list-group-item>
          <b-list-group-item tag="li">
            <b-avatar class="mr-3"  src="https://picsum.photos/100"></b-avatar>
            Vestibulum at eros
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="Profile">
        <b-form >
          <b-form-group
            id="input-group-1"
            label="Email :"
            label-cols="2"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="email"
              placeholder="user@mail.com"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Pseudo:"
            label-cols="2"
            label-for="input-2">
            <b-form-input
              id="input-2"
              placeholder="Username"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Ancien mot de passe:"
            label-cols="2"
            label-for="input-3">
            <b-form-input
              id="input-3"
              placeholder="*********************"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Nouveau mot de passe:"
            label-cols="2"
            label-for="input-3">
            <b-form-input
              id="input-3"
              placeholder="*********************"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Confirmer le mot de passe:"
            label-cols="2"
            label-for="input-3">
            <b-form-input
              id="input-3"
              placeholder="*********************"
            ></b-form-input>
          </b-form-group>

          <b-form-group
          id="input-group-4"
          label="Photo de profil:"
          label-cols="2"
          label-for="input-4"
          class="d-flex">
            <b-form-file
                id="input-4"
                :state="Boolean(/*file1*/)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept="image/*"
                class=" flex-grow-1"
              ></b-form-file>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Date de naissance:"
            label-cols="2"
            label-for="input-5">
            <b-form-datepicker
            id="input-5"
            placeholder="17-02-1984">
            </b-form-datepicker>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Email des responsables:"
            label-cols="2"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              type="email"
              placeholder="parents@mail.com"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="dark">Envoyer</b-button>
        </b-form>
      </b-tab>
      <b-tab title="Privacy"><p>I'm the tab with the very, very long title</p></b-tab>
    </b-tabs>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'PersonalAccount',
  components: {},
};
</script>

<style>
</style>
