<template>
    <section class="full-height d-flex flex-column justify-content-center">
      <h1 class="sr-only">Connexion ou inscription</h1>
      <b-row>
        <b-col cols="6" class="mx-auto p-5 shadow rounded">
            <h2 class="sr-only">Connexion</h2>
              <b-form >
              <b-form-group
                id="input-group-1"
                label="Email :"
                label-cols="3"
                label-for="input-1"
                label-class="sr-only"
              >
                <b-form-input
                v-model="login.email"
                  id="input-1"
                  type="email"
                  placeholder="user@mail.com"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="Mot de passe:"
                label-cols="3"
                label-for="input-3"
                label-class="sr-only">
                <b-form-input
                  v-model="login.password"
                  id="input-3"
                  placeholder="*********************"
                ></b-form-input>
              </b-form-group>
              <b-button
                @click.prevent="handleLogin"
                type="submit"
                variant="info"
                class="w-100">Envoyer</b-button>
              <b-button
                v-b-modal.signupForm
                variant="success"
                class="w-100 my-3">
                Créer un compte
              </b-button>
            </b-form>
          </b-col>
        <b-modal
          id="signupForm"
          hide-header
          hide-footer
          body-class="p-5">
            <h2 class="text-center mb-4">Rejoignez nous</h2>
            <b-form >
            <b-form-group
              id="input-group-1"
              label="Email :"
              label-cols="3"
              label-for="input-1"
            >
              <b-form-input
              v-model="signup.email"
                id="input-1"
                type="email"
                placeholder="user@mail.com"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Pseudo:"
              label-cols="3"
              label-for="input-2">
              <b-form-input
                v-model="signup.user_name"
                id="input-2"
                placeholder="Username"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Mot de passe:"
              label-cols="3"
              label-for="input-3">
              <b-form-input
                v-model="signup.password"
                id="input-3"
                placeholder="*********************"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-6"
              label="Photo de profil:"
              label-cols="3"
              label-for="input-6"
              class="d-flex">
              <b-form-file
                v-model="signup.image_url"
                id="input-6"
                :state="Boolean(signup.image_url)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept="image/*"
                class=" flex-grow-1"
              ></b-form-file>
            </b-form-group>

            <b-form-group
              id="input-group-7"
              label="Date de naissance:"
              label-cols="3"
              label-for="input-7">
              <b-form-datepicker
              v-model="signup.birthdate"
              id="input-7"
              placeholder="jj-mm-aaaa">
              </b-form-datepicker>
            </b-form-group>

            <b-form-group
              id="input-group-8"
              label="Email des responsables:"
              label-cols="3"
              label-for="input-8"
            >
              <b-form-input
                v-model="signup.parentEmail"
                id="input-8"
                type="email"
                placeholder="parents@mail.com"
              ></b-form-input>
            </b-form-group>
              <label for="restricted" class="mr-2">Restreindre l'usage de vos données</label>
              <input
              id="restricted"
              v-model="signup.restricted"
              value="false"
              type="checkbox">
              <label for="shareWithPartners" class="mr-2">
                Partage de vos données avec nos partenaires</label>
              <input
              id="shareWithPartners"
              v-model="signup.shareWithPartners"
              value="false"
              type="checkbox">
              <label for="contactable" class="mr-2">Recevoir des offres de nos partenaires</label>
              <input
              id="contactable"
              v-model="signup.contactable"
              value="false"
              type="checkbox">
            <b-button
              @click.prevent="handleRegister"
              type="submit"
              variant="success"
              class="w-100">S'inscrire</b-button>
          </b-form>
        </b-modal>
      </b-row>
    </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      signup: {
        user_name: '',
        email: '',
        password: '',
        image_url: null,
        birthdate: '',
        parentEmail: '',
        restricted: '',
        shareWithPartners: '',
        contactable: '',
      },
      login: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.Auth.status.loggedIn;
    },
  },
  methods: {
    ...mapActions(['register']),
    handleRegister() {
      const user = new FormData();
      user.append('user_name', this.signup.user_name);
      user.append('email', this.signup.email);
      user.append('password', this.signup.password);
      user.append('image_url', this.signup.image_url);
      user.append('birthdate', this.signup.birthdate);
      user.append('parentEmail', this.signup.parentEmail);
      user.append('restricted', this.signup.restricted);
      user.append('shareWithPartners', this.signup.shareWithPartners);
      user.append('contactable', this.signup.contactable);
      this.$store.dispatch('Auth/register', user);
    },
    handleLogin() {
      if (this.login.email && this.login.password) {
        this.$store.dispatch('Auth/login', this.login);
      }
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>

.full-height {
  height: 85vh;
}
</style>
