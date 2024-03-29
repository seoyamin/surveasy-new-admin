<template>
  <div id="admin-main">
    <div id="admin-main-navigator">
      <div id="admin-main-logo">
        <router-link to="/"><img src="./logo.png" id="admin-main-logo-img"></router-link>
      </div>
        <div class="admin-main-navigator-item">
          <div id="admin-main-navigator-item-title">Survey</div>
          <div id="admin-main-navigator-item-option"><router-link to="/admin/survey/order">주문 관리</router-link></div>
          <div id="admin-main-navigator-item-option"><router-link to="/admin/survey">설문 관리</router-link></div>
          <div id="admin-main-navigator-item-option"><router-link to="/admin/aggregation">정산 관리</router-link></div>
        </div>
        <div class="admin-main-navigator-item">
          <div id="admin-main-navigator-item-title">Panel</div>
          <div id="admin-main-navigator-item-option"><router-link to="/admin/panel">패널 관리</router-link></div>
        </div>
        <div class="admin-main-navigator-item">
          <div id="admin-main-navigator-item-title">Coupon</div>
          <div id="admin-main-navigator-item-option"><router-link to="/admin/coupon">쿠폰 관리</router-link></div>
        </div>
        <div class="admin-main-navigator-item">
          <div id="admin-main-navigator-item-title">Review</div>
          <div id="admin-main-navigator-item-option"><router-link to="/admin/review">리뷰 관리</router-link></div>
        </div>
        <button><router-link to="/admin/login">로그인</router-link></button>
        <button @click="logout">로그아웃</button>
      </div>
      
    <div id="admin-main-container">      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {initializeApp} from 'firebase/app'
import firebaseConfig from './config/firebaseConfig'
import { instanceWithAuth } from './api/index'
export default {
  name: 'App',

  mounted() {
    const firebaseApp = initializeApp(firebaseConfig)
  },

  methods: {
    async logout() {
      try {
          await instanceWithAuth.get('/panel/signout')
          this.$store.dispatch("logout")
        } catch (error) {
          alert("로그아웃에 실패했습니다")
          console.log(error)
        }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: auto;
  text-align: center;
  color: #2c3e50;
}
#admin-main {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: auto;
}
#admin-main-navigator {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background: rgb(244, 254, 244);
  text-align: left;
  padding: 20px;
}
#admin-main-logo-img {
  width: 150px;
  margin-bottom: 20px;
}
.admin-main-navigator-item {
  margin: 20px 0 20px 0;
}
#admin-main-navigator-item-title {
  font-size: 20px;
  color: #0AAC00;
  border-bottom: 1px solid #0AAC00;
}
#admin-main-navigator-item-option {
  font-size: 17px;
  margin-top: 10px;
}
.admin-main-navigator-item a {
  font-weight: lighter;
  color: #a4a4a4;
  text-decoration: none;
}
.admin-main-navigator-item a.router-link-exact-active {
  font-weight: bold;
  color: #000000;
}
#admin-main-container {
  width: 100%;
  align-items: center;
}
.admin-view-table {
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
}
.admin-view-title {
  font-size: 30px;
  font-weight: bold;
  color: green;
  padding: 30px;
  background: white;
}
</style>
