<template>
  <b-list-group-item
    tag="div"
    class="d-flex flex-wrap align-items-center justify-content-start border-0 py-1 px-0">
    <b-button
      @click="fetchAllPostsByOneSubject({ page: 0, id: subject.id })"
      variant="link"
      class="text-dark p-0 mr-3 text-left">
      {{ subject.name }}
    </b-button>
    <b-link
      v-if="isFollowed"
      @click="unFollow(subject.id)">Ne plus suivre</b-link>
    <b-link
      v-else
      @click="follow(subject.id)">Suivre</b-link>
  </b-list-group-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Subject',
  props: ['subject'],
  computed: {
    ...mapGetters(['allFollows', 'userId']),
    isFollowed() {
      const followsId = [];
      this.allFollows.forEach((item) => {
        followsId.push(item.id);
      });
      return followsId.includes(this.subject.id);
    },
  },
  methods: {
    ...mapActions([
      'getFollows',
      'follow',
      'unFollow',
      'fetchAllPostsByOneSubject',
      'subjectToDisplay']),
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
