<template>
  <div>
    <div class="admin-view-title">쿠폰 관리</div>
      <div class="coupon">
        <div class="coupon-register-container">
          <div id="coupon-register-title">쿠폰 발급</div>
          <input v-model="couponInfo.code" type="text" placeholder="쿠폰코드 " id="couponInput">
            <br>
          <input v-model="couponInfo.rate" type="text" placeholder="할인율 " id="couponInput">
          <br><br>
          <button @click="addCoupon" class="finBtn">쿠폰 발급하기</button>
        </div>


        <div class="coupon-list-container">
          <table class="admin-view-table">
            <tr>
              <th>id</th>
              <th>코드</th>
              <th>할인율 (%)</th>
              <th>발급 일자</th>
              <th>상태</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>

            <tr v-for="item in this.couponList" :key="item.id" class="cou-tds">
              <td>{{ item.id }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.discountPercent }}</td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.status }}</td>
              <td @click="openModel(item)" id="edit">수정하기</td>
              <td @click="deleteCoupon(item.id)" id="delete">삭제</td>
            
            </tr>
          </table>
        </div>
    </div>


    <!-- 쿠폰 수정 모달창 -->
      <div v-if="editModal == true" class="edit-modal">
        <div class="edit-contentsbox">
          <div id="edit-top">
            <a class="edit-close" @click="closeModal">X</a>
            <p class="edit-title">쿠폰 수정하기</p>

          </div>
      
          <div id="edit-container">
            <div id="detail-title">쿠폰 코드</div>
              <input class="modal-input" type="text" v-model="editInfo.code">
            
            <div id="detail-title">쿠폰 할인율</div>
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
    async getCouponList(){
      try {
        const response = await this.axios.get("/coupon")
        this.couponList = response.data.couponList
      } catch (error) {
        console.log(error)
      }
    },

    closeModal() {
      this.editModal = false
    },

    openModel(item){
      this.editModal = true
      this.editInfo = item
    },

    

    async addCoupon(){
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
    },

    async deleteCoupon(id){
      try {
        if (confirm("정말 삭제하시겠습니까?")) {
          const response = await this.axios.delete(`/coupon/${id}`)
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
        await this.axios.patch(
          `/coupon/${this.editInfo.id}`,
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
  padding: 0 20px 0 20px
}
.coupon-register-container {
  margin: 0 50px 0 50px;
  padding: 30px;
  border: 2px solid green;
  border-radius: 20px;
  background: #dff2dd;
}
#coupon-register-title {
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
.coupon-list-container {
  width: 100%;
}

.coupon-list-container th {
  font-size: 17px;
  font-weight: bold;
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
  width: 30%;
  margin: 120px auto;
  padding-top: 15px;
  padding-bottom: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(56, 56, 56, 0.042);
  transition: all .3s ease;
  z-index: 2;
}
.edit-title {
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 9px;
  color: green;
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
  color: #494949;
  text-align: left;
  font-weight: bold;
  margin: 10px;
}
#edit-fin-btn {
  padding: 7px 15px 7px 15px;
  margin: 15px 0px 0px 0px;
  color: green;
  background-color: #FFFFFF;
  border: 1.5px solid green;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
#edit-fin-btn:hover{
  color: white;
  background: green;
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