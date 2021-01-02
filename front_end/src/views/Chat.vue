<template>
  <b-row tag="main" id ="chat" class="rounded-lg shadow h-100">
    <!-- users -->
    <b-col
      cols="12"
      lg="4"
      :class="{'d-none d-lg-flex': convSelected, 'd-flex': !convSelected}"
      class="h-100 border-right flex-column justify-content-between">
      <!-- users header -->
      <div class="d-flex justify-content-between align-items-center p-2">
        <h1 class="h3">Discussions</h1>
        <b-icon-pencil-square
          font-scale="1.5">
        </b-icon-pencil-square>
      </div>
      <!-- users list -->
      <ChatUser
        :users="users"
        @clickChild="convSelected = true" />
    </b-col>
    <!-- chat section -->
    <b-col
      v-if="convSelected"
      class="h-100 d-flex flex-column justify-content-between align-items-stretch">
      <!-- chat header -->
      <div
        class="p-3 d-flex align-items-center">
        <b-icon-arrow-left
          font-scale="1.5"
          class="mr-3"
          @click="convSelected = false">
        </b-icon-arrow-left>
        <b-avatar
          badge
          badge-variant="success"
          :src="users[0].image_url"
          size="2.5rem"
          class="mr-3">
        </b-avatar>
        <h2 class="h5 m-0">{{ users[0].user_name }}</h2>
      </div>
      <ChatMessages :messages="messages" />
      <!-- form message -->
      <form action="" class="d-flex justify-content-between align-items-center position-relative">
        <b-form-input class="my-3 w-100"></b-form-input>
        <b-button type="submit" variant="link" class="input__btn">Envoyer</b-button>
      </form>
    </b-col>
    <b-col
      v-else
      class="h-100 d-flex flex-column justify-content-center align-items-center">
      <!-- chat header -->
      <h5>Vos messages</h5>
      <p>Envoyez des messages privés à vos collègues </p>
      <b-button variant="info" pill>Envoyer un nouveau message</b-button>
    </b-col>
  </b-row>
</template>

<script>
import ChatUser from '@/components/Chat/ChatUser.vue';
import ChatMessages from '@/components/Chat/ChatMessages.vue';

export default {
  name: 'Chat',
  components: {
    ChatUser,
    ChatMessages,
  },
  data() {
    return {
      convSelected: false,
      users: [
        {
          id: 1,
          user_name: 'John',
          image_url: 'https://picsum.photos/200',
          connected: true,
        },
        {
          id: 2,
          user_name: 'David',
          image_url: 'https://picsum.photos/200',
          connected: false,
        },
      ],
      messages: [
        {
          id: 1,
          content: 'Bonjour',
        },
        {
          id: 2,
          content: 'Bonjour',
        },
        {
          id: 3,
          content: 'Tu vas bien ?',
        },
        {
          id: 4,
          content: 'Oui et toi ?',
        },
        {
          id: 5,
          content: 'Bonjour',
        },
        {
          id: 6,
          content: 'Tu vas bien ?',
        },
        {
          id: 7,
          content: 'Oui et toi ?',
        },
        {
          id: 8,
          content: 'Bonjour',
        },
        {
          id: 9,
          content: 'Tu vas bien ?',
        },
        {
          id: 10,
          content: 'Oui et toi ?',
        },
      ],
    };
  },
};
</script>

<style scoped>
#chat {
  height: 100%;
}

.input__btn {
  position: absolute;
  right: 10px;
}
</style>
