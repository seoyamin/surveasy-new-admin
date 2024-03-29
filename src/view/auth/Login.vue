<template>
  <div id="admin-login-container">
    <div class="admin-view-title">로그인</div>
    <LoginInput />
  </div>
</template>

<script>
import LoginInput from '../../component/auth/LoginInput.vue'
export default {
  components: {
    LoginInput
  }
}
</script>

<style>
#admin-login-container {
  height: 50%;
  align-items: center;
  justify-content: center;
}
</style>
