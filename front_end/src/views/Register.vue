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
<!-- ////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ///////////////////////////////////REGISTER FORM////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////// -->
        <b-modal
          v-model="visible"
          id="signupForm"
          size="lg"
          hide-header
          hide-footer
          body-class="p-5">
          <h2 class="text-center mb-4">Rejoignez nous</h2>
          <ValidationObserver
            ref="observer"
            v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(handleRegister)">
<!-- ///////////////////////////////////EMAIL////////////////////////////////////// -->
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="input-group-1"
                  label="Email :"
                  label-cols="3"
                  label-for="input-1">
                  <b-form-input
                    v-model="signup.email"
                    id="input-1"
                    type="email"
                    placeholder="john@mail.com"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalide-feedback>
                    {{ errors[0] }}
                  </b-form-invalide-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////USERNAME////////////////////////////////////// -->
              <ValidationProvider
                name="nom"
                rules="required|alpha_spaces"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="input-group-2"
                  label="Pseudo:"
                  label-cols="3"
                  label-for="input-2">
                  <b-form-input
                    v-model="signup.user_name"
                    id="input-2"
                    placeholder="John Doe"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalide-feedback>
                    {{ errors[0] }}
                  </b-form-invalide-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////PASSWORD////////////////////////////////////// -->
              <ValidationProvider
                name="mot de passe"
                vid="mdp"
                rules="required|strongPassword"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="input-group-3"
                  label="Mot de passe:"
                  label-cols="3"
                  label-for="input-3">
                  <b-form-input
                    id="input-3"
                    v-model="signup.password"
                    type="password"
                    placeholder="*********************"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalide-feedback>
                    {{ errors[0] }}
                  </b-form-invalide-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- //////////////////////////PASSWORD CONFIRMATION//////////////////////////////// -->
              <ValidationProvider
                name="confirmation"
                rules="required|confirmed:mdp"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="input-group-3-confirmation"
                  label="Confirmation du mot de passe:"
                  label-cols="3"
                  label-for="input-3-confirmation">
                  <b-form-input
                    id="input-3-confirmation"
                    v-model="signup.confirmation"
                    type="password"
                    placeholder="*********************"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalide-feedback>
                    {{ errors[0] }}
                  </b-form-invalide-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////AVATAR////////////////////////////////////// -->
              <ValidationProvider
                name="photo de profil"
                rules="image"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="input-group-6"
                  label="Photo de profil:"
                  label-cols="3"
                  label-for="input-6"
                  class="d-flex">
                  <b-form-file
                    v-model="signup.image_url"
                    id="input-6"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept="image/*"
                    class=" flex-grow-1"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-file>
                  <b-form-invalide-feedback>
                    {{ errors[0] }}
                  </b-form-invalide-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////BIRTHDATE////////////////////////////////////// -->
              <ValidationProvider
                name="date de naissance"
                rules="required|isDate|isPast"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="input-group-7"
                  label="Date de naissance:"
                  label-cols="3"
                  label-for="input-7">
                  <input
                    type="date"
                    v-model="signup.birthdate"
                    id="input-7"
                    placeholder="jj-mm-aaaa"
                    class="form-control"
                    :class="{ 'is-invalid' : errors[0], 'is-valid' : valid}"
                    @input="userIsMajor"
                    :state="errors[0] ? false : (valid ? true : null)">
                  <b-form-invalide-feedback>
                    {{ errors[0] }}
                  </b-form-invalide-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////PARENTS EMAIL////////////////////////////////////// -->
              <ValidationProvider
                name="email des parents"
                rules="email"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="input-group-8"
                  label="Email des responsables:"
                  label-cols="3"
                  label-for="input-8"
                  v-show="userIsMajor">
                  <b-form-input
                    v-model="signup.parentEmail"
                    id="input-8"
                    type="email"
                    placeholder="parents@mail.com"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalide-feedback>
                    {{ errors[0] }}
                  </b-form-invalide-feedback>
              </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////RGPD////////////////////////////////////// -->
                <b-form-group
                  id="input-group-9"
                  label="RGPD:"
                  label-cols="3">
                  <b-form-checkbox
                    v-model="signup.restricted">
                    Restreindre l'usage de vos données
                  </b-form-checkbox>
                  <b-form-checkbox
                    v-model="signup.shareWithPartners">
                    Partage de vos données avec nos partenaires
                  </b-form-checkbox>
                  <b-form-checkbox
                    v-model="signup.contactable">
                    Recevoir des offres de nos partenaires
                  </b-form-checkbox>
                </b-form-group>
              <b-button
                type="submit"
                variant="success"
                class="w-100">S'inscrire</b-button>
            </b-form>
          </ValidationObserver>
        </b-modal>
      </b-row>
    </section>
</template>

<script>
import { mapActions } from 'vuex';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

dayjs.extend(RelativeTime);

export default {
  name: 'Register',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      signup: {
        user_name: '',
        email: '',
        password: '',
        confirmation: '',
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
      visible: true,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.Auth.status.loggedIn;
    },
    userIsMajor() {
      const now = dayjs();
      const birthdate = dayjs(this.signup.birthdate);
      return now.diff(birthdate, 'year') <= 18;
    },
    nameState() {
      return this.signup.user_name.length > 2;
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
