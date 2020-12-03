<template>
    <b-row
        no-gutters
        tag="article"
        class="bg-white rounded-lg shadow p-4 mb-4">
        <b-col cols="12" tag="header" class="mb-2">
            <b-row no-gutters align-v="center">
                <b-avatar src="https://picsum.photos/100" size="lg" class="mr-4"></b-avatar>
                <b-col class="text-left">
                    <a class="h5 font-weight-bold text-dark" href="#">John Doe</a>
                    <p class="mb-0">
                        <a class="h6 text-dark" href="#">Politics</a>
                        <a class="ml-2" href="#"><small>Suivre</small></a>
                    </p>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" class="my-3  text-left">
            <h3 class="h4 font-weight-bold">
                {{ title }}
            </h3>
            <b-img
                v-if="image_url !== null"
                fluid
                class="w-100 my-3"
                alt="Description de l'image"
                :src="image_url"></b-img>
            <a target="_blank" :href="url">{{ url }}</a>
            <p class="mb-0 text-muted"><small>Il Y A 4 HEURES</small></p>
        </b-col>
        <b-col cols="12" tag="footer" class="h2">
            <b-row align-h="around" class="px-5">
                <b-button class="bg-white border-0 position-relative">
                    <b-icon icon="heart" variant="dark" class="mx-1 mx-lg-2" font-scale="2">
                    </b-icon>
                    <b-badge pill class="icon_counter" variant="dark">16</b-badge>
                </b-button>
                <b-button v-b-toggle.comments class="bg-white border-0 position-relative">
                    <b-icon
                        icon="chat-left-text" variant="dark" class="mx-1 mx-lg-2" font-scale="2">
                    </b-icon>
                    <b-badge pill class="icon_counter" variant="dark">16</b-badge>
                </b-button>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                    <template v-slot:button-content>
                        <b-icon
                            icon="three-dots" variant="dark" class="mx-1 mx-lg-2" font-scale="2">
                        </b-icon>
                    </template>
                    <b-dropdown-item href="#">Signaler</b-dropdown-item>
                    <b-dropdown-item href="#">Cacher</b-dropdown-item>
                </b-dropdown>
            </b-row>
        </b-col>
        <!-- Need to change the id of comment with the dynamique id of the post -->
        <b-collapse id="comments" class="w-100 mt-2 border-top">
            <b-row class="p-3 mt-3">
                <b-col cols="auto" class="d-flex flex-column text-left">
                    <a href="#" class="card-text text-dark font-weight-bold">John Doe</a>
                    <small>Il y'a 2 jours</small>
                </b-col>
                <b-col tag="p" class="text-justify">
                     Accusamus consectetur, harum ab inventore natus, aut
                      similique nisi ea id vel dolores repellat veniam </b-col>
            </b-row>
        </b-collapse>
    </b-row>
</template>

<script>

export default {
  name: 'Post',
  props: [
    'title',
    'image_url',
    'url',
  ],
};
</script>

<style>
</style>
