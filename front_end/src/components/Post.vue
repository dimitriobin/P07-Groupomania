<template>
    <b-row id="post" tag="article" class="bg-white rounded-lg shadow px-3 py-4 mb-4">
        <b-col cols="12" tag="header" class="mb-2">
            <b-row no-gutters align-v="center">
                <b-img cols="3" src="https://picsum.photos/70" class="rounded-circle mr-4"></b-img>
                <b-col class="text-left">
                    <p class="h4">John Doe</p>
                    <p class="h6">Politics</p>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" class="my-3  text-left">
            <p class="h4 font-weight-bold">Lorem ipsum dolor sit amet,
                abitur vestibulum pretium ipsum, eget iaculis dolor convallis eg
                et. Nulla molestie lectus quis felis elementum maximus.</p>
            <b-img fluid class="w-100" src="https://picsum.photos/400/200"></b-img>
            <a href="#">https://www.reddit.com/</a>
            <p class="mb-0 text-muted"><small>Il Y A 4 HEURES</small></p>
        </b-col>
        <b-col cols="12" tag="footer" class="h2">
            <b-row align-h="around" class="px-5">
                <b-icon icon="heart" variant="dark" class="mx-1 mx-lg-2"></b-icon>
                <b-icon icon="chat-left-text" variant="dark" class="mx-1 mx-lg-2"></b-icon>
                <b-icon icon="share" variant="dark" class="mx-1 mx-lg-2"></b-icon>
                <b-icon icon="three-dots" variant="dark" class="mx-1 mx-lg-2"></b-icon>
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
#post {
    a {
        color: #00B3D9;
    }
}
</style>
