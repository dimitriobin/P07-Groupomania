<template>
  <b-list-group-item
    tag="li"
    class="d-flex align-items-center justify-content-start border-0 py-1 px-0 text-left">
    <b-button
      @click="$emit('pressed')"
      variant="link"
      class="text-dark p-0 mr-3">
      {{ subject.name }}
    </b-button>
    <b-link
      v-if="!followed"
      @click="toFollow(subject.id)">Suivre</b-link>
    <b-link
      v-else
      @click="toUnFollow(subject.id)">Ne plus suivre</b-link>
  </b-list-group-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Subject',
  props: ['subject'],
  data() {
    return {
      datas: this.subject,
      followed: '',
    };
  },
  computed: {
    ...mapGetters(['allFollows', 'userId']),
  },
  methods: {
    ...mapActions(['follow', 'unFollow']),
    isFollowed() {
      const follows = [];
      this.allFollows.forEach((item) => {
        follows.push(item.id);
      });
      return follows.includes(this.datas.id);
    },
    toFollow(id) {
      this.follow(id);
      this.followed = true;
    },
    toUnFollow(id) {
      this.unFollow(id);
      this.followed = false;
    },
  },
  mounted() {
    this.followed = this.isFollowed();
  },
};
</script>

<style scoped>
.suggest {
  background: transparent;
  border: 1px solid orange;
  list-style-type: none;
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  position: relative;
  margin-bottom: 2%;
}
.suggest:hover,
.active{
  cursor: pointer;
  background: orange;
  color: white;
  transition: all 0.3s;
}
</style>
