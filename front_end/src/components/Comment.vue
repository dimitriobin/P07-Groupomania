<template>
  <b-row
      class="p-3 mt-3">
      <b-col cols="auto" class="d-flex flex-column text-left">
          <a
              href="#"
              class="card-text text-dark font-weight-bold">
              {{ data.User.user_name }}
          </a>
          <small>{{ dateToTimestamp(data.createdAt) }}</small>
      </b-col>
      <b-col tag="p" class="text-justify">{{ data.content }}</b-col>
  </b-row>
</template>

<script>
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import RelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(RelativeTime);
dayjs.locale(fr);

export default {
  name: 'Comment',
  props: [
    'data',
  ],
  methods: {
    dateToTimestamp(date) {
      return dayjs(date).fromNow();
    },
  },
};
</script>

<style>

</style>
