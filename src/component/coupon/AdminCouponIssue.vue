<template>
  <div class="coupon-issue-container">
    <div id="coupon-issue-title">쿠폰 발급</div>
    <input v-model="couponInfo.code" type="text" placeholder="쿠폰코드 " id="couponInput">
      <br>
    <input v-model="couponInfo.rate" type="text" placeholder="할인율 " id="couponInput">
    <br><br>
    <button @click="issueCoupon" class="finBtn">쿠폰 발급하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponInfo: {
        code: '',
        discountPercent: 0,
      },
    }
  },

  methods: {  
    async issueCoupon(){
      try {
        await this.axios.post(
          '/coupon',
          {
            code : this.couponInfo.code.toString(),
            discountPercent : this.couponInfo.rate
          }
        )
        this.$router.go("/admincoupon")
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.coupon-issue-container {
  margin: 0 50px 0 50px;
  padding: 30px;
  border: 2px solid green;
  border-radius: 20px;
  background: #dff2dd;
}
#coupon-issue-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: green;
}
#couponInput {
  width: 90%;
  height: 40px;
  margin-bottom: 20px;
  padding: 5px;
  font-size: 17px;
  border: 2px solid green;
  border-radius: 10px;
}
.finBtn {
  width: 90%;
  height: 40px;
  background-color: white;
  border: 2px solid green;
  border-radius: 40px;
  font-size: 16px;
  font-weight: bold;
  color: green;
  cursor: pointer;
}
.finBtn:hover{
  color: white;
  background: green;
}
</style>