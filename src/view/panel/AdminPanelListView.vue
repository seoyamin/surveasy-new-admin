<template>
  <div>
    <div class="admin-view-title">패널 관리</div>
    <div>
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
    <button v-for="i in totalPages" :key="i" @click="loadMorePanels(i-1)">{{i}}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      totalPages : 0,
      panelList : []
    }
  },
  mounted(){
    this.listAdminPanels()
  },
  methods : {
    async listAdminPanels(){
      try{
        const response = await axios.get("https://gosurveasy.co.kr/panel/admin?page=0")
        this.panelList = response.data.panelList
        this.totalPages = response.data.pageInfo.totalPages
      }catch(error) {
        console.log(error)
      }
    },

    async loadMorePanels(i) {
      try {
        const response = await axios.get("https://gosurveasy.co.kr/panel/admin?page=" + i)
        this.panelList = response.data.panelList
      } catch(err) {
        console.log(err)
      }
    },
  }
}
</script>

<style>

</style>