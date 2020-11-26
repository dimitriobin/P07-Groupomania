<template>
    <b-row no-gutters tag="article" class="bg-white rounded-lg shadow p-4 mb-4">
        <b-col cols="12" tag="header" class="mb-2">
            <b-row no-gutters align-v="center">
                <b-avatar src="https://picsum.photos/100" size="lg" class="mr-4"></b-avatar>
                <b-col class="text-left">
                    <p class="h5 font-weight-bold">John Doe</p>
                    <p class="h6">Politics</p>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" class="my-3  text-left">
            <h3 class="h4 font-weight-bold">Lorem ipsum dolor sit amet,
                abitur vestibulum pretium ipsum, eget iaculis dolor convallis eg
                et. Nulla molestie lectus quis felis elementum maximus.</h3>
            <b-img
                fluid
                class="w-100"
                alt="Description de l'image"
                src="https://picsum.photos/400/200"></b-img>
            <a href="#">https://www.reddit.com/</a>
            <p class="mb-0 text-muted"><small>Il Y A 4 HEURES</small></p>
        </b-col>
        <b-col cols="12" tag="footer" class="h2">
            <b-row align-h="around" class="px-5">
                <b-button class="bg-white border-0 position-relative">
                    <b-icon icon="heart" variant="dark" class="mx-1 mx-lg-2" font-scale="2.5">
                    </b-icon>
                    <b-badge pill class="icon_counter" variant="dark">16</b-badge>
                </b-button>
                <b-button class="bg-white border-0 position-relative">
                    <b-icon
                        icon="chat-left-text" variant="dark" class="mx-1 mx-lg-2" font-scale="2.5">
                    </b-icon>
                    <b-badge pill class="icon_counter" variant="dark">16</b-badge>
                </b-button>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                    <template v-slot:button-content>
                        <b-icon
                            icon="three-dots" variant="dark" class="mx-1 mx-lg-2" font-scale="2.5">
                        </b-icon>
                    </template>
                    <b-dropdown-item href="#">Signaler</b-dropdown-item>
                    <b-dropdown-item href="#">Cacher</b-dropdown-item>
                </b-dropdown>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
  name: 'Post',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    a {
        color: #00B3D9 !important;
    }
    .icon_counter {
        font-size: 0.9rem !important;
        position: absolute !important;
        right: 0;
        top: 0;
    }
</style>
