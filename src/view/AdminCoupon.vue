<template>
  <div>
    <div>coupone admin view</div>
      <div class="coupon">
        <div class="coupon-register">
          <h2>쿠폰 발급</h2>
          <input v-model="couponInfo.code" type="text" placeholder="쿠폰코드 " id="couponInput">
            <br>
          <input v-model="couponInfo.rate" type="text" placeholder="할인율 " id="couponInput">
          <br><br>
          <button @click="addCoupon" class="finBtn">쿠폰 발급하기</button>
        </div>


        <div class="coupon-list">
          <h2>쿠폰 리스트</h2>
          <table>
            <tr>
              <th>쿠폰 id</th>
              <th>쿠폰 코드</th>
              <th>할인율</th>
              <th>발급 일자</th>
              <th>상태</th>
            </tr>

            <tr v-for="item in this.couponList" :key="item.id" class="cou-tds">
              <td>{{ item.id }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.discountPercent }}</td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.status }}</td>
            
            </tr>
          </table>
        </div>


    </div>




  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      couponInfo: {
        code: '',
        rate: 0,
      },

      couponList: [],

      couponNum: 1,

      localCode: '',
      couponUser: { user: '', used: false },

      selectedCoupon: {
        code: '',
        rate: 0
      },
      price: 10000,

      receiver: '',
      transferCoupon: {
        code: '',
      },

      uploadDate: '',

    }
  },

  mounted() {
    this.getCouponList()
  },

  methods: {

    async getCouponList(){
      try {
        const response = await axios.get("http://3.39.170.7/coupon")
        this.couponList = response.data.couponList
        console.log(response.data.surveyList)
      } catch (error) {
        console.log(error)
      }
        
    },

    async addCoupon(){
      try {
        await axios.post(
          'http://3.39.170.7/coupon',
          {
            code : this.couponInfo.code.toString(),
            discountPercent : this.couponInfo.rate
          }
        )
      } catch (error) {
        console.log(error)
      }
    },

  }
}
</script>

<style>
.coupon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px;
}

.coupon-register {
  margin: 80px;
}

.coupon-type button {
  width: 100px;
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 30px;
  background: none;
  border: none;
  cursor: pointer;
}

.coupon-type .active_green {
  width: 100px;
  margin-left: 30px;
  margin-right: 30px;
  background: none;
  border: none;
  font-weight: bolder;
  font-size: 17px;
  color: rgb(126, 209, 66);
  cursor: pointer;
}

.coupon-line {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 2px;
  background: rgb(26, 226, 26);
}

#couponInput_num {
  width: 100px;
  height: 30px;
  margin-top: 5px;
  font-size: 15px;
}

#couponInput {
  width: 300px;
  height: 30px;
  margin-bottom: 20px;
  font-size: 13px;
}

.coupon-register select {
  width: 80px;
  height: 30px;
  margin-left: 20px;
  font-size: 15px;
}

.finBtn {
  margin: 20px;
  width: 200px;
  height: 40px;
  background-color: rgb(191, 243, 172);
  border: 1px solid grey;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.coupon-list {
  margin: 20px;
  font-size: 13px;
}

.coupon-list th {
  font-size: 17px;
  font-weight: bold;
}

.coupon-mypage {
  margin: 20px;
}

.coupon-use {
  margin: 20px;
}

.coupon-use input {
  width: 260px;
}

.cou-tds {
  color: rgb(0, 0, 0);
}

.cou-tds.group {
  color: rgb(69, 149, 235);
}</style>