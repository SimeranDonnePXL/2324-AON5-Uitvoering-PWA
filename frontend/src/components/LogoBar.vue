<template>
    <header class="header-container">
        <img src="https://img.icons8.com/dusk/64/note.png" alt="note" />
        <h1>AON5-PWA</h1>
    </header>
    <nav class="nav-bar">
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
</template>
<script>
export default {
    name: "LogoBar"
}
</script>
<style scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right, #f8bf33, #f4ae00, #e99c05);
    height: 100px;
}

.header-container img {
    margin-right: 20px;
    height: 70px;
}

.header-container h1 {
    display: inline-block;
    margin: 0;
    padding: 0;
    color: white;
    font-family: Impact;
    text-shadow: 3px 3px saddlebrown;
    font-size: xxx-large;
}

.nav-bar{
    background-color: rgb(242, 242, 242);
    padding: 5px;
}

.nav-bar a{
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    margin-left: 20px;
    color: #e99c05;
}
</style>
