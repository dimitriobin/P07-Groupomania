<template>
<!-- ////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ///////////////////////////////////REGISTER FORM////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////// -->
  <ValidationObserver
    tag="div"
    ref="registerObserver"
    v-slot="{ handleSubmit }">
    <h2 class="text-center mb-4">Rejoignez nous</h2>
    <b-form @submit.prevent="handleSubmit(handleRegister)">
<!-- ///////////////////////////////////EMAIL////////////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="email"
        rules="required|email"
        v-slot="{ valid, errors }">
        <b-form-group
          id="registerMail-group"
          label="Email :"
          label-cols="12"
          label-cols-lg="3"
          label-for="registerMail"
          class="align-items-center">
          <b-form-input
            v-model="signup.email"
            id="registerMail"
            type="text"
            placeholder="john@mail.com"
            autofocus
            trim
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback
            aria-live="polite">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
<!-- ///////////////////////////////////USERNAME////////////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="pseudo"
        rules="required|alpha_num"
        v-slot="{ valid, errors }">
        <b-form-group
          id="registerName-group"
          label="Pseudo:"
          label-cols="12"
          label-cols-lg="3"
          label-for="registerName"
          class="align-items-center">
          <b-form-input
            v-model="signup.user_name"
            id="registerName"
            type="text"
            placeholder="John Doe"
            trim
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback
            aria-live="polite">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
<!-- ///////////////////////////////////PASSWORD////////////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="mot de passe"
        vid="mdp"
        rules="required|min:8|max:16|strongPassword"
        v-slot="{ valid, errors }">
        <b-form-group
          id="registerPass-group"
          label="Mot de passe:"
          label-cols="12"
          label-cols-lg="3"
          label-for="registerPass"
          class="align-items-center">
          <b-form-input
            id="registerPass"
            v-model="signup.password"
            type="password"
            trim
            placeholder="*********************"
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback
            aria-live="polite">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
<!-- //////////////////////////PASSWORD CONFIRMATION//////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="confirmation"
        rules="required|confirmed:mdp"
        v-slot="{ valid, errors }">
        <b-form-group
          id="registerConfirmPass-group"
          label="Confirmation du mot de passe:"
          label-cols="12"
          label-cols-lg="3"
          label-for="registerConfirmPass"
          class="align-items-center">
          <b-form-input
            id="registerConfirmPass"
            v-model="signup.confirmation"
            type="password"
            placeholder="*********************"
            trim
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback
            aria-live="polite">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
<!-- ///////////////////////////////////img////////////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="photo de profil"
        rules="image"
        v-slot="{ valid, errors }">
        <b-form-group
          id="registerImage-group"
          label="Photo de profil:"
          label-cols="12"
          label-cols-lg="3"
          label-for="registerImage"
          class="d-flex align-items-center">
          <b-form-file
            v-model="signup.image_url"
            id="registerImage"
            browse-text="Parcourir"
            placeholder="Faites glisser ou sélectionnez une photo"
            drop-placeholder="Déposez ici..."
            accept="image/*"
            class=" flex-grow-1"
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-file>
          <b-form-invalid-feedback
            aria-live="polite">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
<!-- ///////////////////////////////////BIRTHDATE////////////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="date de naissance"
        rules="required|isDate|isPast"
        v-slot="{ valid, errors }">
        <b-form-group
          id="registerBirthdate-group"
          label="Date de naissance:"
          label-cols="12"
          label-cols-lg="3"
          label-for="registerBirthdate"
          class="align-items-center">
          <input
            id="registerBirthdate"
            type="date"
            v-model="signup.birthdate"
            class="form-control"
            :class="{ 'is-invalid' : errors[0], 'is-valid' : valid}">
          <b-form-invalid-feedback
            aria-live="polite">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
<!-- ///////////////////////////////////PARENTS EMAIL////////////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="email des parents"
        rules="email"
        v-slot="{ valid, errors }">
        <b-form-group
          id="registerParentMail-group"
          label="Email des responsables:"
          label-cols="12"
          label-cols-lg="3"
          label-for="registerParentMail"
          v-show="userIsMajor"
          class="align-items-center">
          <b-form-input
            v-model="signup.parentEmail"
            id="registerParentMail"
            type="email"
            placeholder="parents@mail.com"
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback
            aria-live="polite">
            {{ errors[0] }}
          </b-form-invalid-feedback>
      </b-form-group>
      </ValidationProvider>
<!-- ///////////////////////////////////RGPD////////////////////////////////////// -->
      <div class="row">
        <label class="col-12 col-lg-3 col-form-label">RGPD</label>
        <div class="col-12 col-lg-9">
          <p class="sr-only">Voici un ensemble de cases à cocher pour nous permettre de respecter au mieux vos données d'utilisation.</p>
          <b-form-checkbox
            v-model="signup.restricted"
            class="mb-2">
            Restreindre l'usage de vos données
          </b-form-checkbox>
          <b-form-checkbox
            v-model="signup.shareWithPartners"
            class="mb-2">
            Partage de vos données avec nos partenaires
          </b-form-checkbox>
          <b-form-checkbox
            v-model="signup.contactable"
            class="mb-2">
            Recevoir des offres de nos partenaires
          </b-form-checkbox>
        </div>
      </div>
      <b-button
        type="submit"
        variant="dark"
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
          this.login(newUser)
            .then(() => {
              // if the user is logged , refresh the page
              this.$emit('isLogged');
            });
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
