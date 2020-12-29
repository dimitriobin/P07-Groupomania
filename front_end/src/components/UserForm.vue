<template>
  <ValidationObserver
    ref="registerObserver"
    name="userForm"
    v-slot="{ handleSubmit }">
    <h2 class="text-center my-5 h4">Vos informations personnelles</h2>
    <b-form @submit.prevent="handleSubmit(handleUpdate)">
<!-- ///////////////////////////////////EMAIL////////////////////////////////////// -->
      <ValidationProvider
        name="email"
        rules="email"
        v-slot="{ valid, errors }">
        <b-form-group
          id="userMail-group"
          label="Email :"
          label-cols="3"
          label-for="userMail">
          <p v-if="!edit">{{ userData.email }}</p>
          <b-form-input
            v-else
            v-model="user.email"
            id="userMail"
            type="text"
            :placeholder="userData.email"
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
        rules="alpha_spaces"
        v-slot="{ valid, errors }">
        <b-form-group
          id="userName-group"
          label="Pseudo:"
          label-cols="3"
          label-for="userName">
          <p v-if="!edit">{{ userData.user_name }}</p>
          <b-form-input
            v-else
            v-model="user.user_name"
            id="userName"
            type="text"
            :placeholder="userData.user_name"
            trim
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
<!-- ///////////////////////////////////OLD PASSWORD////////////////////////////////////// -->
      <ValidationProvider
        v-if="edit"
        name="mot de passe"
        vid="mdp"
        rules="min:8|max:16|strongPassword"
        v-slot="{ valid, errors }">
        <b-form-group
          id="oldUserPass-group"
          label="Ancien mot de passe:"
          label-cols="3"
          label-for="oldUserPass">
          <b-form-input
            id="oldUserPass"
            v-model="user.oldPassword"
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
<!-- //////////////////////////NEW PASSWORD//////////////////////////////// -->
      <ValidationProvider
        v-if="edit"
        name="newPassword"
        vid="mdp"
        rules="min:8|max:16|strongPassword"
        v-slot="{ valid, errors }">
        <b-form-group
          id="newUserPass-group"
          label="Nouveau mot de passe:"
          label-cols="3"
          label-for="newUserPass">
          <b-form-input
            id="newUserPass"
            v-model="user.newPassword"
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
<!-- //////////////////////////NEW PASSWORD CONFIRMATION//////////////////////////////// -->
      <ValidationProvider
        v-if="edit"
        name="confirmation"
        rules="confirmed:mdp"
        v-slot="{ valid, errors }">
        <b-form-group
          id="userConfirmPass-group"
          label="Confirmation du mot de passe:"
          label-cols="3"
          label-for="userConfirmPass">
          <b-form-input
            id="userConfirmPass"
            v-model="user.confirmation"
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
<!-- ///////////////////////////////////img////////////////////////////////////// -->
      <ValidationProvider
        name="photo de profil"
        rules="image"
        v-slot="{ valid, errors }">
        <b-form-group
          id="userImage-group"
          label="Photo de profil:"
          label-cols="3"
          label-for="userImage"
          class="d-flex align-items-center">
          <b-img
            :src="previewUrl"
            class="rounded-circle"
            width="100"
            height="100"></b-img>
          <b-form-file
            v-if="edit"
            v-model="user.image_url"
            id="userImage"
            @change="showPreview($event)"
            placeholder="Faites glisser ou sélectionnez une photo"
            drop-placeholder="Déposez ici..."
            accept="image/*"
            class="w-50 ml-5"
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
        rules="isDate|isPast"
        v-slot="{ valid, errors }">
        <b-form-group
          id="userBirthdate-group"
          label="Date de naissance:"
          label-cols="3"
          label-for="userBirthdate">
          <p v-if="!edit">{{ userData.birthdate }}</p>
          <input
            v-else
            id="userBirthdate"
            type="date"
            v-model="user.birthdate"
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
        v-if="edit"
        name="email des parents"
        rules="email"
        v-slot="{ valid, errors }">
        <b-form-group
          id="userParentMail-group"
          label="Email des responsables:"
          label-cols="3"
          label-for="userParentMail"
          v-show="userIsMajor">
          <b-form-input
            v-model="user.parentEmail"
            id="userParentMail"
            type="email"
            :placeholder="userData.parentEmail"
            :state="errors[0] ? false : (valid ? true : null)">
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
      </b-form-group>
      </ValidationProvider>
      <b-button
        v-if="edit"
        type="button"
        variant="danger"
        class="w-100 mt-4"
        @click="edit = false">Annuler</b-button>
      <b-button
        v-if="edit"
        type="submit"
        variant="success"
        class="w-100 mt-4">Envoyer</b-button>
    </b-form>
      <b-button
        v-if="!edit"
        type="button"
        variant="info"
        class="w-100 mt-4"
        @click="edit = true">Modifier vos informations</b-button>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { mapActions, mapGetters } from 'vuex';

dayjs.extend(RelativeTime);

export default {
  name: 'UserForm',
  props: [
    'userData',
  ],
  data() {
    return {
      edit: false,
      previewUrl: null,
      user: {
        email: '',
        user_name: '',
        oldPassword: '',
        newPassword: '',
        confirmation: '',
        image_url: null,
        birthdate: '',
        parentEmail: '',
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ...mapGetters(['userId']),
    userIsMajor() {
      const now = dayjs();
      const birthdate = dayjs(this.user.birthdate);
      return now.diff(birthdate, 'year') <= 18;
    },
  },
  methods: {
    ...mapActions(['updateUser']),
    showPreview(e) {
      const file = e.target.files[0];
      this.previewUrl = URL.createObjectURL(file);
    },
    handleUpdate() {
      const data = new FormData();
      Object.entries(this.user).forEach(
        ([key, value]) => {
          if (value !== null && value !== '') {
            data.append(`${key}`, value);
          }
        },
      );
      this.updateUser({
        id: this.userId,
        data,
      })
        .then(() => {
          this.edit = false;
        });
    },
  },
  mounted() {
    this.user = {
      ...this.userData,
      image_url: null,
    };
    this.previewUrl = this.userData.image_url;
  },
};
</script>

<style>

</style>
