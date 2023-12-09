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
              <th>편집</th>
              <th>삭제</th>
            </tr>

            <tr v-for="item in this.couponList" :key="item.id" class="cou-tds">
              <td>{{ item.id }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.discountPercent }}</td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.status }}</td>
              <td @click="openModel(item)" id="edit">편집</td>
              <td @click="deleteCoupon(item.id)" id="delete">삭제</td>
            
            </tr>
          </table>
        </div>
    </div>


    <!-- 설문 수정 모달창 -->
      <div v-if="editModal == true" class="edit-modal">
        <div class="edit-contentsbox">
          <div id="edit-top">
            <a class="edit-close" @click="closeModal">X</a>
            <p class="edit-title">쿠폰 수정하기</p>

          </div>
      
          <div id="edit-container">
            <div id="detail-title">쿠폰 코드</div>
              <input class="modal-input" type="text" v-model="editInfo.code">
            
            <div id="detail-title">쿠폰 rate</div>
              <input class="modal-input" type="text" v-model="editInfo.discountPercent">
            
            <div id="detail-title">쿠폰 상태</div>
                <select class="modal-input" v-model="editInfo.status" aria-label="Default select example">
                  <option v-for="item in statusType" :key="item.key" :value=item>{{ item }}</option>
                </select>
            
            <button id="edit-fin-btn" @click="editCoupon">수정 완료</button>
           </div> 
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
        discountPercent: 0,
      },

      editInfo: {
        id : 0,
        code : '',
        discountPercent : 0,
        status : ''
      },
      statusType: ["VALID", "INVALID"],
      couponList: [],

      editModal : false,


    }
  },

  mounted() {
    this.getCouponList()
  },

  methods: {

    closeModal() {
      this.editModal = false
    },

    openModel(item){
      this.editModal = true
      this.editInfo = item
    },

    async getCouponList(){
      try {
        const response = await axios.get("https://gosurveasy.co.kr/coupon")
        this.couponList = response.data.couponList
        console.log(response.data.surveyList)
      } catch (error) {
        console.log(error)
      }
        
    },

    async addCoupon(){
      try {
        await axios.post(
          'https://gosurveasy.co.kr/coupon',
          {
            code : this.couponInfo.code.toString(),
            discountPercent : this.couponInfo.rate
          }
        )
        this.$router.go("/admincoupon")
      } catch (error) {
        console.log(error)
      }
    },

    async deleteCoupon(id){
      try {
        if (confirm("정말 삭제하시겠습니까?")) {
          const response = await axios.delete(`https://gosurveasy.co.kr/coupon/${id}`)
          if (response.status == 200) {
            if (confirm("삭제되었습니다.")) {
              this.$router.go("/admincoupon")
            }
          } else {
            if (confirm("삭제에 실패하였습니다. 다시 시도해주세요.")) {
              this.$router.go("/admincoupon")
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    async editCoupon() {
      try {
        console.log(this.editInfo)
        await axios.patch(
          `https://gosurveasy.co.kr/coupon/${this.editInfo.id}`,
          {
            code : this.editInfo.code,
            discountPercent : this.editInfo.discountPercent,
            status : this.editInfo.status
          }
        )
        this.editModal = false
        this.$router.go("/admincoupon")
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

#delete{
  cursor: pointer;
  color: red;
}

.cou-tds.group {
  color: rgb(69, 149, 235);
}

.edit-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.202);
  display: table;
  transition: opacity .3s ease;
}
.edit-contentsbox {
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  font-family: 'Noto Sans KR', sans-serif;
  width: 600px;
  height: 560px;
  margin: 120px auto;
  padding-top: 15px;
  padding-bottom: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(56, 56, 56, 0.042);
  transition: all .3s ease;
  z-index: 2;
}
#edit-container-price {
  text-align: right;
}
#edit-container-price-diff {
  text-align: center;
  color: #0AAB00;
}
#edit-container-price-after {
  padding: 3px;
  font-size: 20px;
  text-align: center;
  background: #0AAB00;
  color: #FFFFFF;
}
.edit-title {
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 9px;
  color: #0CAE02;
}
.edit-close {
  display: flex;
  flex-direction: row;
  justify-content: right;
  cursor: pointer;
  color:#494949;
}
#detail-title {
  font-size: 16px;
  color: #000000;
  text-align: left;
  margin: 5px;
}
#container-link-btn {
  display: flex;
  justify-content: right;
}
#link-btn {
  border: 0;
  font-size: 15px;
  color: #0CAE02;
}
#edit-fin-btn {
  padding: 7px;
  margin: 15px 0px 0px 0px;
  color:#0CAE02;
  background-color: #FFFFFF;
  border: 1.5px solid #0CAE02;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
#edit-fin-btn:hover{
  color: white;
  background: #0AAB00;
}

.modal-input {
  margin-top: 10px;
  margin-bottom: 15px;
  width: 98%;
  height: 40px;
  padding-left: 7px;
  color: #a0a0a0;
  background-color: white;
  border: solid 1px #dadada;
  border-radius: 5px;
}

#edit{
  cursor: pointer;
  color: #0AAB00;
}
</style>