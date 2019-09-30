<template>
  <div id="app">
    <Masonary/>
  </div>
</template>

<script>
import Masonary from "./components/Masonary.vue"

export default {
  name: 'app',
  components: {
    Masonary
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
