<template>
  <b-list-group-item
    tag="div"
    class="d-flex align-items-center border-0 py-1 px-0"
    :class="{ 'justify-content-between': fill, 'justify-content-start': !fill }">
    <b-button
      @click="fetchAllPostsByOneSubject({ page: 0, id: subject.id })"
      :title="subject.name"
      variant="link"
      class="text-dark p-0 text-left text-overflow">
      {{ subject.name }}
    </b-button>
    <b-button
      v-if="isFollowed"
      title="Ne plus suivre"
      variant="link"
      class="text-right text-overflow"
      @click="unFollow(subject.id)">Ne plus suivre</b-button>
    <b-button
      v-else
      title="Suivre"
      variant="link"
      class="text-right text-overflow"
      @click="follow(subject.id)">Suivre</b-button>
  </b-list-group-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Subject',
  props: ['subject', 'fill'],
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
.text-overflow {
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
}
</style>
