<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/scss/styles.scss';
body{
  background-color: #f5f5f5;
}
#app {
  font-family: Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  margin-top: 10px;
}
</style>
