<template>
  <div class="admin-view-title">설문 관리</div>
  <div class="admin-view-container">
    <table class="admin-view-table">
      <thead>
        <tr>
          <th>sid</th>
          <th>제목</th>
          <th>주문일</th>
          <th>마감일</th>
          <th>응답수</th>
          <th>소요시간</th>
          <th>기관</th>
          <th>가격</th>
          <th>리워드</th>
          <th>고객명</th>
          <th>선택신분</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in this.surveyList" :key="item.id">
          <td>{{item.sid}}</td>
          <td>{{item.title}}</td>
          <td>{{item.uploadedAt.substring(0, 10)}}</td>
          <td>{{item.dueDate.substring(0, 10)}}</td>
          <td>{{item.responseCount}} / {{item.headCount.substring(5)}}</td>
          <td>{{this.$store.state.maps.surveySpendTimeMap[item.spendTime]}}</td>
          <td>{{item.institute}}</td>
          <td>{{item.price}}</td>
          <td>{{item.reward}}</td>
          <td>{{item.username}}</td>
          <td>{{this.$store.state.maps.surveyIdentityMap[item.identity]}}</td>
          <!-- <td><button @click="updateSurvey(item.id, item.progress)">적용</button></td> -->
        </tr>
      </tbody>
    </table>
    <button v-for="i in totalPages" :key="i" @click="loadMoreSurveys(i-1)">{{i}}</button>
  </div>
  
    
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      totalPages: 0,
      progressList : [
        { name: 0, value: 0},
        { name: 2, value: 2},
        { name: 3, value: 3}
      ],
      progressChanged: null,
      surveyList : []
    }
  },
  mounted(){
    this.listAdminSurveys()
  },
  methods : {
    async listAdminSurveys(){
      console.log('listAdminSurveys')
      try{
        const response = await axios.get("https://gosurveasy.co.kr/survey/admin?page=0")
        this.surveyList = response.data.surveyList
        this.totalPages = response.data.pageInfo.totalPages
      }catch(error) {
        console.log(error)
      }
    },
    
    async loadMoreSurveys(i) {
      try {
        const response = await axios.get("https://gosurveasy.co.kr/survey/admin?page=" + i)
        this.surveyList = response.data.surveyList
      } catch(err) {
        console.log(err)
      }
    },

    async updateSurvey(id, progress) {
      console.log('updateSurvey', progress)
      
      try {
        const response = await axios.patch(`https://gosurveasy.co.kr/survey/admin/${id}`,{
          progress : progress,
          noticeToPanel : "",
          reward : 0,
          link : ""
        })
        console.log(response)
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
#admin-view-survey-table tr, th, td {
  border: 1px solid #444444;
}
#admin-view-survey-table tr, th {
  background: green;
  color: white;
}
.fixed-col {
  width: 400px;
  min-width: 400px;
  max-width: 400px;
}
</style>