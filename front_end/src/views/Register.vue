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
                  id="registerMail-group"
                  label="Email :"
                  label-cols="3"
                  label-for="registerMail">
                  <b-form-input
                    v-model="signup.email"
                    id="registerMail"
                    type="text"
                    placeholder="john@mail.com"
                    autofocus
                    trim
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////USERNAME////////////////////////////////////// -->
              <ValidationProvider
                name="nom"
                rules="required|alpha_spaces"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="registerName-group"
                  label="Pseudo:"
                  label-cols="3"
                  label-for="registerName">
                  <b-form-input
                    v-model="signup.user_name"
                    id="registerName"
                    type="text"
                    placeholder="John Doe"
                    trim
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////PASSWORD////////////////////////////////////// -->
              <ValidationProvider
                name="mot de passe"
                vid="mdp"
                rules="required|min:8|max:16|strongPassword"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="registerPass-group"
                  label="Mot de passe:"
                  label-cols="3"
                  label-for="registerPass">
                  <b-form-input
                    id="registerPass"
                    v-model="signup.password"
                    type="password"
                    trim
                    placeholder="*********************"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- //////////////////////////PASSWORD CONFIRMATION//////////////////////////////// -->
              <ValidationProvider
                name="confirmation"
                rules="required|confirmed:mdp"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="registerConfirmPass-group"
                  label="Confirmation du mot de passe:"
                  label-cols="3"
                  label-for="registerConfirmPass">
                  <b-form-input
                    id="registerConfirmPass"
                    v-model="signup.confirmation"
                    type="password"
                    placeholder="*********************"
                    trim
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////AVATAR////////////////////////////////////// -->
              <ValidationProvider
                name="photo de profil"
                rules="image"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="registerImage-group"
                  label="Photo de profil:"
                  label-cols="3"
                  label-for="registerImage"
                  class="d-flex">
                  <b-form-file
                    v-model="signup.image_url"
                    id="registerImage"
                    placeholder="Faites glisser ou sélectionnez une photo"
                    drop-placeholder="Déposez ici..."
                    accept="image/*"
                    class=" flex-grow-1"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-file>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////BIRTHDATE////////////////////////////////////// -->
              <ValidationProvider
                name="date de naissance"
                rules="required|isDate|isPast"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="registerBirthdate-group"
                  label="Date de naissance:"
                  label-cols="3"
                  label-for="registerBirthdate">
                  <input
                    id="registerBirthdate"
                    type="date"
                    v-model="signup.birthdate"
                    placeholder="jj-mm-aaaa"
                    class="form-control"
                    :class="{ 'is-invalid' : errors[0], 'is-valid' : valid}"
                    :state="errors[0] ? false : (valid ? true : null)">
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////PARENTS EMAIL////////////////////////////////////// -->
              <ValidationProvider
                name="email des parents"
                rules="email"
                v-slot="{ valid, errors }">
                <b-form-group
                  id="registerParentMail-group"
                  label="Email des responsables:"
                  label-cols="3"
                  label-for="registerParentMail"
                  v-show="userIsMajor">
                  <b-form-input
                    v-model="signup.parentEmail"
                    id="registerParentMail"
                    type="email"
                    placeholder="parents@mail.com"
                    :state="errors[0] ? false : (valid ? true : null)">
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
              </b-form-group>
              </ValidationProvider>
<!-- ///////////////////////////////////RGPD////////////////////////////////////// -->
                <b-form-group
                  id="registerRgpd-group"
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
import { mapActions, mapGetters } from 'vuex';
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
      user: {
        email: '',
        password: '',
      },
      visible: true,
    };
  },
  computed: {
    ...mapGetters(['loggedUser']),
    loggedIn() {
      return this.loggedUser.status.loggedIn;
    },
    userIsMajor() {
      const now = dayjs();
      const birthdate = dayjs(this.signup.birthdate);
      return now.diff(birthdate, 'year') <= 18;
    },
  },
  methods: {
    ...mapActions(['register', 'login']),
    resetInputs() {
      this.signup = {
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
      };
    },
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
      this.register(user)
        .then(() => {
          const newUser = {
            email: this.signup.email,
            password: this.signup.password,
          };
          this.login(newUser);
        })
        .then(() => {
          this.resetInputs();
          return this.$router.push({ name: 'Home' });
        })
        .catch((error) => console.log(error));
    },
    handleLogin() {
      if (this.login.email && this.login.password) {
        this.$store.dispatch('Auth/login', this.login);
      }
    },
  },
  mounted() {
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
