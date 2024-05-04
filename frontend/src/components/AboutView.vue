<template>
    <LogoBar></LogoBar>
    <main>
        <p>This is a PWA for notes</p>
    </main>
</template>
<script>
import LogoBar from "./LogoBar.vue";

export default {
    name: "AboutView",
    data: () => {
        return {

        }
    },
    components: {
        LogoBar: LogoBar,
    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style scoped>
main {
    text-align: center;
    margin-top: 40px;
    font-size: larger;
    font-weight: bold;
}
</style>