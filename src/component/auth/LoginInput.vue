<template>
  <div id="admin-login-container">
    <div class="admin-view-title">로그인</div>
      <div id="admin-login-container">
      <input id="admin-login-input" type="email" placeholder="이메일" v-model="email" />
      <input id="admin-login-input" type="password" placeholder="비밀번호" v-model="password" />
      <button id="admin-login-button" @click="login">로그인하기</button>
    </div>
  </div>
</template>

<script>
import { instance } from '../../api/index'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    async login() {
      console.log("login start")
      if(this.email == '') {
        alert('이메일을 입력하세요')
        return
      } 

      else if(this.password == '') {
        alert('비밀번호를 입력하세요')
        return
      }

      else {
        try {
          const response = await instance.post(
            '/panel/signin',
            {
              uid: "admin",
              platform: "IOS",
              email: this.email,
              password: this.password
            }
          )
          this.$store.dispatch("setTokens", response.data)
          this.$router.go("/admin/survey/order")
        } catch (error) {
          alert(error.response.data.reason)
          console.log(error)
        }
      }
    }
  }
}
</script>

<style>
#admin-login-container {
  display: flex;
  flex-direction: column;
  height: 50%;
  align-items: center;
  justify-content: center;
}
#admin-login-input {
  width: 250px;
  height: 30px;
  margin: 5px;
  padding: 7px;
}
#admin-login-button {
  width: 270px;
  height: 43px;
  margin-top: 10px;
  background-color: white;
  border: 2px solid green;
  border-radius: 40px;
  font-size: 16px;
  font-weight: bold;
  color: green;
  cursor: pointer;
}
#admin-login-button:hover{
  color: white;
  background: green;
}
</style>
