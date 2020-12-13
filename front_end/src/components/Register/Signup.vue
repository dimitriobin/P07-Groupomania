<template>
<!-- ////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ///////////////////////////////////REGISTER FORM////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////// -->
  <ValidationObserver
    ref="registerObserver"
    name="signupForm"
    v-slot="{ handleSubmit }">
    <h2 class="text-center mb-4">Rejoignez nous</h2>
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
        name="pseudo"
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
        variant="info"
        class="w-100 mt-4">Suivant</b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(RelativeTime);

export default {
  name: 'Signup',
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
        parentEmail: null,
        restricted: true,
        shareWithPartners: false,
        contactable: false,
      },
    };
  },
  computed: {
    userIsMajor() {
      const now = dayjs();
      const birthdate = dayjs(this.signup.birthdate);
      return now.diff(birthdate, 'year') <= 18;
    },
  },
  methods: {
    ...mapActions(['register', 'login']),
    handleRegister() {
      // Create a formData
      const user = new FormData();
      // Append only no-nule values in the formdata
      Object.entries(this.signup).forEach(([key, value]) => {
        if (value !== null) {
          return user.append(`${key}`, value);
        }
        return '';
      });
      // Call the register function with the formdata in arg
      this.register(user)
        .then(() => {
          // if the register succeed, log the user
          const newUser = {
            email: this.signup.email,
            password: this.signup.password,
          };
          return this.login(newUser);
        })
        .then(() => {
          // ig the user is logged , refresh the page
          document.location.reload();
        })
        .catch((error) => {
          // If some known errors are send by the back end, display them in the UI
          switch (error) {
            case 'user.user_name must be unique':
              this.$refs.registerObserver.setErrors({
                pseudo: ['Ce pseudo est déjà utilisé'],
              });
              break;
            case 'user.email must be unique':
              this.$refs.registerObserver.setErrors({
                email: ['Cet email est déjà utilisé'],
              });
              break;
            default:
              break;
          }
          // for errors that aren't known, display in the console
          return console.error(error);
        });
    },

  },
};
</script>

<style>

</style>
