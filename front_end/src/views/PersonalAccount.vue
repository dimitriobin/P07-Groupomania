<template>
  <section id="PersonalAccount">
    <h1 class="h2 text-center mb-4">Vos données personnelles</h1>
    <b-tabs content-class="mt-3" fill>
      <!-- Subjects -->
      <b-tab title="Sujets suivis">
        <b-list-group flush tag="ul">
          <b-list-group-item tag="li">
            <b-avatar class="mr-3"  src="https://picsum.photos/100"></b-avatar>
            Dapibus ac facilisis in
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <!-- Profile -->
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
            id="input-group-4"
            label="Nouveau mot de passe:"
            label-cols="2"
            label-for="input-4">
            <b-form-input
              id="input-4"
              placeholder="*********************"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Confirmer le mot de passe:"
            label-cols="2"
            label-for="input-5">
            <b-form-input
              id="input-5"
              placeholder="*********************"
            ></b-form-input>
          </b-form-group>

          <b-form-group
          id="input-group-6"
          label="Photo de profil:"
          label-cols="2"
          label-for="input-6"
          class="d-flex">
            <b-form-file
                id="input-6"
                :state="Boolean(/*file1*/)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept="image/*"
                class=" flex-grow-1"
              ></b-form-file>
          </b-form-group>

          <b-form-group
            id="input-group-7"
            label="Date de naissance:"
            label-cols="2"
            label-for="input-7">
            <b-form-datepicker
            id="input-7"
            placeholder="17-02-1984">
            </b-form-datepicker>
          </b-form-group>

          <b-form-group
            id="input-group-8"
            label="Email des responsables:"
            label-cols="2"
            label-for="input-8"
          >
            <b-form-input
              id="input-8"
              type="email"
              placeholder="parents@mail.com"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="dark">Envoyer</b-button>
        </b-form>
      </b-tab>
      <!-- Privacy -->
      <b-tab title="Privacy">
        <b-form>
          <b-form-group description="rgpd">
            <b-form-checkbox-group id="checkboxes" stacked>
              <b-form-checkbox value="restricted">
                Restreindre l'utilisation de mes données
              </b-form-checkbox>
              <b-form-checkbox value="contacted">
                Etre contacté par des partenaires commerciaux
              </b-form-checkbox>
              <b-form-checkbox value="sharedWithPartners">
                Accepter que les données soient transmises a des partenaires
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <b-button type="submit" variant="dark">Envoyer</b-button>
        </b-form>
        <b-button type="submit" variant="link">Supprimer mon compte</b-button>
        <b-button type="submit" variant="link">Télécharger les données de votre compte</b-button>
      </b-tab>
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
