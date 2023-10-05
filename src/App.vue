<template>
  <h1>서베이지 어드민 페이지</h1>
  <div class="AdminMain-menu-web">
    <router-link to="/adminmain"><div id="menu-detail-item">메인</div></router-link> 
    <router-link to="/adminorder"><div id="menu-detail-item">주문</div></router-link>
    <router-link to="/adminmain/adminwebcoupon"><div id="menu-detail-item">쿠폰 관리</div></router-link>
  </div>
  <router-view></router-view>
</template>

<script>
/* eslint-disable */
import AdminMainView from './view/AdminMainView.vue'
import {initializeApp} from 'firebase/app'
import firebaseConfig from './config/firebaseConfig'
export default {
  name: 'App',
  components: {
    AdminMainView
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

.AdminMain-menu-web {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-right: 300px;
  padding-left: 300px;
}

#menu-detail-item {
  margin-left: 15px;
  margin-right: 15px;
  font-size:17px; 
  font-weight:bold; 
}
</style>
