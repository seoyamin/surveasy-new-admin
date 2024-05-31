<template>
  <div>
    <div class="input-container">
      <input type="text" class="search-input" v-model="panelInput">
      <button class="search-finBtn" @click="showResult">패널 검색</button>
    </div>
    <p>이름 / 이메일 / 전화번호로 검색 가능</p>
    <table class="admin-view-table">
    <thead>
      <tr>
        <th>id</th>
        <th>이름</th>
        <th>이메일</th>
        <th>전화번호</th>
        <th>유입경로</th>
        <th>정산총액</th>
        <th>성별</th>
        <th>출생</th>
        <th>직업</th>
        <th>지역</th>
        <th>반려동물</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in panelList" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.email}}</td>
        <td>{{item.phoneNumber}}</td>
        <td>
          <div v-if="item.inflowPath=='ETC'">{{item.inflowPathEtc}}</div>
          <div v-else>{{this.$store.state.maps.panelInflowPathMap[item.inflowPath]}}</div>
        </td>
        <td>{{item.rewardTotal}}</td>
        <td>{{this.$store.state.maps.surveyTargetGenderMap[item.gender]}}</td>
        <td>{{item.birth}}</td>
        <td>{{item.job}}</td>
        <td>{{item.city}}</td>
        <td>{{item.pet}}</td>
      </tr>
    </tbody>
  </table>
  <p v-if="this.inputEmpty">검색어를 다시 입력해주세요.</p>
  </div>
</template>

<script>
import { instanceWithAuth } from '../../api/index'
export default {
  data() {
    return{
      panelInput : "",
      panelList : [],
      inputEmpty : false
    }
  },

  methods: {
    async showResult(){
      if(this.panelInput.trim().length == 0){
        this.inputEmpty = true
        this.panelList = []
      }else{
        this.inputEmpty = false
        try{
          const response = await instanceWithAuth.get("/panel/admin", {
            params: {
              page: 0,
              keyword: this.panelInput.trim()
            }
          })
          this.panelList = response.data.panelList
        }catch(error) {
          console.log(error)
        }
      }
      
    }
  }

}
</script>

<style>
.input-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
}
.search-input{
  width: 30%;
  font-size: large;
  border-radius: 10px;
  margin-right: 10px;
  padding-left: 10px;
}
.search-finBtn{
  width: 10%;
  height: 40px;
  background-color: white;
  border: 2px solid green;
  border-radius: 40px;
  font-size: 16px;
  font-weight: bold;
  color: green;
  cursor: pointer;
}
.search-finBtn:hover{
  color: white;
  background: green;
}

</style>