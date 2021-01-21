<template>
  <ValidationObserver
    ref="registerObserver"
    name="userForm"
    v-slot="{ handleSubmit }">
    <h2 class="text-center my-5 h4">Vos informations personnelles</h2>
    <div v-if="!editInfos && !editPass">
      <div class="d-flex align-items-center mb-4">
        <h3 class="h4 mr-4">Pseudo</h3>
        <p v-if="!editInfos" class="m-0">{{ userData.user_name }}</p>
      </div>
      <div class="d-flex align-items-center mb-4">
        <h3 class="h4 mr-4">Email</h3>
        <p v-if="!editInfos" class="m-0">{{ userData.email }}</p>
      </div>
      <div class="d-flex align-items-center mb-4">
        <h3 class="h4 mr-4">Photo de profil</h3>
          <b-img
            :src="previewUrl"
            class="rounded-circle"
            width="100"
            height="100"></b-img>
      </div>
      <div class="d-flex align-items-center">
        <h3 class="h4 mr-4">Date de naissance</h3>
        <p v-if="!editInfos" class="m-0">{{ userData.birthdate }}</p>
      </div>
    </div>
    <!-- ////////////////////////////////////////////////////////////////////////////////// -->
    <!-- ////////////////////////////////// INFOS FORM ////////////////////////////////// -->
    <!-- ////////////////////////////////////////////////////////////////////////////////// -->
    <b-form v-if="editInfos" @submit.prevent="handleSubmit(handleUpdateInfos)">
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
          <b-form-input
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
        rules="alpha_num"
        v-slot="{ valid, errors }">
        <b-form-group
          id="userName-group"
          label="Pseudo:"
          label-cols="3"
          label-for="userName">
          <b-form-input
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
            v-if="editInfos"
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
<!-- ///////////////////////////////////PARENTS EMAIL////////////////////////////////////// -->
      <ValidationProvider
        v-if="editInfos && !userIsMajor"
        name="email des parents"
        rules="email"
        v-slot="{ valid, errors }">
        <b-form-group
          id="userParentMail-group"
          label="Email des responsables:"
          label-cols="3"
          label-for="userParentMail">
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
        v-if="editInfos"
        type="button"
        variant="danger"
        class="w-100 mt-4"
        @click="editInfos = false">Annuler</b-button>
      <b-button
        v-if="editInfos"
        type="submit"
        variant="success"
        class="w-100 mt-4">Envoyer</b-button>
    </b-form>
    <!-- ////////////////////////////////////////////////////////////////////////////////// -->
    <!-- ////////////////////////////////// PASSWORD FORM ////////////////////////////////// -->
    <!-- ////////////////////////////////////////////////////////////////////////////////// -->
    <b-form v-if="editPass" @submit.prevent="handleSubmit(handleUpdatePassword)">
<!-- ///////////////////////////////////OLD PASSWORD////////////////////////////////////// -->
      <ValidationProvider
        name="oldMdp"
        rules="required|strongPassword"
        v-slot="{ valid, errors }">
        <b-form-group
          id="oldUserPass-group"
          label="Ancien mot de passe:"
          label-cols="3"
          label-for="oldUserPass">
          <b-form-input
            id="oldUserPass"
            v-model="user.oldPassword"
            name="ancien mot de passe"
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
        name="newPassword"
        vid="mdp"
        rules="required|strongPassword"
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
        name="confirmation du nouveau mot de passe"
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
      <b-button
        type="button"
        variant="danger"
        class="w-100 mt-4"
        @click="editPass = false">Annuler</b-button>
      <b-button
        type="submit"
        variant="success"
        class="w-100 mt-4">Envoyer</b-button>
    </b-form>
      <b-button
        v-if="!editInfos && !editPass"
        type="button"
        variant="info"
        class="mt-4 mr-2"
        @click="editInfos = true">Modifier vos informations</b-button>
      <b-button
        v-if="!editInfos && !editPass"
        type="button"
        variant="info"
        class="mt-4"
        @click="editPass = true">Modifier votre mot de passe</b-button>
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
      editInfos: false,
      editPass: false,
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
    ...mapGetters(['userId', 'oneUser']),
    userIsMajor() {
      const now = dayjs();
      const birthdate = dayjs(this.userData.birthdate);
      return now.diff(birthdate, 'year') >= 18;
    },
  },
  methods: {
    ...mapActions([
      'updateUser',
      'updatePassword',
    ]),
    showPreview(e) {
      const file = e.target.files[0];
      this.previewUrl = URL.createObjectURL(file);
    },
    handleUpdateInfos() {
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
          this.editInfos = false;
        });
    },
    handleUpdatePassword() {
      const requestBody = {
        oldPassword: this.user.oldPassword,
        newPassword: this.user.confirmation,
      };
      this.updatePassword({ id: this.userId, requestBody })
        .then(() => {
          this.editPass = false;
          this.user.oldPassword = '';
          this.user.newPassword = '';
          this.user.confirmation = '';
        })
        .catch((error) => {
          // If some known errors are send by the back end, display them in the UI
          switch (error) {
            case 'Wrong password':
              this.$refs.registerObserver.setErrors({
                oldMdp: ['Mot de passe invalide'],
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
