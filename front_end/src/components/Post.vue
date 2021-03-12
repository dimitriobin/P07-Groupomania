<template>
    <b-row
        no-gutters
        tag="article"
        class="bg-white rounded-lg shadow p-3 p-sm-4 mb-4">
        <div
            v-if="!edit"
            class="w-100">
            <b-col cols="12" tag="header" class="mb-2 p-0">
                <b-row no-gutters align-v="center">
                    <b-avatar
                        v-if="post.User.image_url"
                        :alt="`Photo de profil de ${post.User.user_name}`"
                        :src="post.User.image_url"
                        size="lg"
                        class="mr-2 mr-sm-4 bg-transparent">
                    </b-avatar>
                    <b-col class="text-left">
                        <router-link
                            :to="`/user?id=${post.User.id}`"
                            class="h5 font-weight-bold text-dark">
                            {{ post.User.user_name }}
                        </router-link>
                        <subject
                            @pressed="$emit('pressed', post.Subject.id)"
                            :subject="post.Subject">
                        </subject>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" class="my-3 p-0 text-left">
                <h3 class="h4 font-weight-bold text-break">
                    {{ post.title }}
                </h3>
                <b-img
                    v-if="post.image_url"
                    fluid
                    class="w-100 my-3"
                    :alt="post.image_url.replace('http://localhost:3000/images/', '').split('.')[0].replaceAll('-', ' ')"
                    :src="post.image_url"></b-img>
                <a v-if="post.url" target="_blank" :href="post.url">{{ post.url }}</a>
                <p class="mb-0 text-muted"><small>{{ dateToTimestamp(post.createdAt) }}</small></p>
            </b-col>
            <b-col cols="12" tag="footer" class="h2 p-0">
                <b-row align-h="around" class="px-0 px-sm-5">
                    <b-button
                      v-if="!isLiked"
                      class="bg-white border-0 position-relative"
                      @keypress.enter="likePost(post.id)"
                      @click="likePost(post.id)">
                      <b-icon
                        aria-label="Aimer ce post"
                        icon="heart"
                        variant="dark"
                        class="mx-1 mx-lg-2"
                        font-scale="2">
                      </b-icon>
                      <b-badge
                        v-if="post.Likes.length > 0"
                        pill
                        class="icon_counter"
                        variant="dark">
                        {{ post.Likes.length }}
                        <span class="sr-only"> personnes aiment ce post</span>
                      </b-badge>
                    </b-button>
                    <b-button
                      v-else
                      class="bg-white border-0 position-relative"
                      @keypress.enter="unlikePost(post.id)"
                      @click="unlikePost(post.id)">
                      <b-icon
                        aria-label="Ne plus aimer ce post ce post"
                        icon="heart-fill"
                        variant="dark"
                        class="mx-1 mx-lg-2"
                        font-scale="2">
                      </b-icon>
                      <b-badge
                        v-if="post.Likes.length > 0"
                        pill
                        class="icon_counter"
                        variant="dark">
                        {{ post.Likes.length }}
                        <span class="sr-only"> personnes aiment ce post</span>
                      </b-badge>
                    </b-button>
                    <b-button @click="collapse" class="bg-white border-0 position-relative">
                      <b-icon
                          aria-label="Afficher les commentaires de ce post"
                          icon="chat-left-text"
                          variant="dark"
                          class="mx-1 mx-lg-2"
                          font-scale="2">
                      </b-icon>
                      <b-badge
                          v-if="CommentsForOnePost(post.id)"
                          pill
                          class="icon_counter"
                          variant="dark">
                          {{ CommentsForOnePost(post.id).totalItems }}
                          <span class="sr-only"> personnes ont commentées ce post</span>
                      </b-badge>
                      <b-badge
                          v-else-if="post.Comments.length"
                          pill
                          class="icon_counter"
                          variant="dark">
                          {{ post.Comments.length }}
                          <span class="sr-only"> personnes ont commentées ce post</span>
                      </b-badge>
                    </b-button>
                    <b-dropdown
                        variant="link"
                        toggle-class="text-decoration-none"
                        no-caret>
                        <template v-slot:button-content>
                            <b-icon
                                aria-label="Afficher les options de ce post"
                                icon="three-dots"
                                variant="dark"
                                class="mx-1 mx-lg-2"
                                font-scale="2">
                            </b-icon>
                        </template>
                        <b-dropdown-item @click="$bvModal.show(`reportPost_${post.id}`)">
                          Signaler
                        </b-dropdown-item>
                        <b-modal
                          :id="`reportPost_${post.id}`"
                          title="Rapport de signalement"
                          hide-footer
                          centered
                          lazy>
                          <ReportForm
                            itemType="post"
                            :itemId="post.id" />
                        </b-modal>
                        <b-dropdown-item
                            v-if="isAuthor()"
                            href="#"
                            @click="edit = true">
                            Editer
                        </b-dropdown-item>
                        <b-dropdown-item
                            v-if="isAuthor()"
                            href="#"
                            @click="remove()">Supprimer</b-dropdown-item>
                    </b-dropdown>
                </b-row>
            </b-col>
            <!-- COMMENTS -->
            <b-collapse
                v-model="showComments"
                :id="'commentsFor' + post.id"
                class="w-100 mt-2 border-top text-center p-2 p-sm-3 p-md-4"
                @show.once="fetchAllCommentsByPost({ id: post.id, page: 0 })">
                <Comment :postId="post.id" />
            </b-collapse>
        </div>
        <PostForm
            class="w-100"
            v-else
            method="update"
            :post="post"
            @hide="edit = false" />
    </b-row>
</template>

<script>
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Subject from '@/components/Subject.vue';
import PostForm from '@/components/PostForm.vue';
import Comment from '@/components/Comment.vue';
import ReportForm from '@/components/ReportForm.vue';
import { mapActions, mapGetters } from 'vuex';

dayjs.extend(RelativeTime);
dayjs.locale(fr);

export default {
  name: 'Post',
  props: [
    'post',
  ],
  components: {
    Subject,
    PostForm,
    Comment,
    ReportForm,
  },
  data() {
    return {
      showComments: false,
      edit: false,
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'CommentsForOnePost',
    ]),
    isLiked() {
      return this.post.Likes.some((like) => like.UserId === this.userId);
    },
  },
  methods: {
    ...mapActions(['removePost', 'likePost', 'unlikePost', 'fetchAllCommentsByPost']),
    isAuthor() {
      return this.userId === this.post.user_id;
    },
    dateToTimestamp(date) {
      return dayjs(date).fromNow();
    },
    collapse() {
      this.showComments = !this.showComments;
    },
    remove() {
      this.removePost(this.post.id);
    },
  },
};
</script>

<style>
</style>
