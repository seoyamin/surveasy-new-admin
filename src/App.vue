<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
/* eslint-disable */
import HelloWorld from './components/HelloWorld.vue'
import {initializeApp} from 'firebase/app'
import firebaseConfig from './config/firebaseConfig'
export default {
  name: 'App',
  components: {
    HelloWorld
  },

  mounted() {
    const firebaseApp = initializeApp(firebaseConfig)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
