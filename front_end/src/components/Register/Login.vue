<template>
<!-- ////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ///////////////////////////////////LOGIN FORM////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////// -->
  <ValidationObserver
    tag="div"
    ref="loginObserver"
    v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(handleLogin)">
<!-- ///////////////////////////////////EMAIL////////////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="email"
        rules="required|email"
        v-slot="{ valid, errors }">
        <b-form-group
          id="loginMail-group"
          label="Email :"
          label-cols="12"
          label-cols-lg="3"
          label-for="loginMail"
          class="align-items-center">
          <b-form-input
            v-model="user.email"
            id="loginMail"
            type="text"
            placeholder="john@mail.com"
            autofocus
            trim
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback
            aria-live="assertive">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
<!-- ///////////////////////////////////PASSWORD////////////////////////////////////// -->
      <ValidationProvider
        tag="div"
        name="mot de passe"
        vid="mdp"
        rules="required"
        v-slot="{ valid, errors }">
        <b-form-group
          id="loginPass-group"
          label="Mot de passe:"
          label-cols="12"
          label-cols-lg="3"
          label-for="loginPass"
          class="align-items-center">
          <b-form-input
            id="loginPass"
            v-model="user.password"
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
      <b-button
        type="submit"
        variant="outline-dark"
        class="w-100">
        Se connecter
      </b-button>
      <b-button
        v-b-modal.signupForm
        variant="dark"
        class="w-100 my-3">
        Créer un compte
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters(['isFollowing', 'userId']),
  },
  methods: {
    ...mapActions(['register', 'login', 'getFollows']),
    handleLogin() {
      let user = {};
      if (this.user.email && this.user.password) {
        user = { ...this.user };
      }
      this.login(user)
        .then(() => {
          this.getFollows(this.userId)
            .then(() => {
              if (this.isFollowing) {
                document.location.reload();
              } else {
                this.$emit('isLogged');
              }
            });
        })
        .catch((error) => {
        // If some known errors are send by the back end, display them in the UI
          switch (error) {
            case 'Wrong password':
              this.$refs.loginObserver.setErrors({
                mdp: ['Mot de passe incorrect'],
              });
              break;
            case 'User not found':
              this.$refs.loginObserver.setErrors({
                email: ['Email incorrect'],
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
