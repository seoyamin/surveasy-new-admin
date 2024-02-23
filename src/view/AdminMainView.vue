<template>
  <div>admin main view</div>
  <div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>sid</th>
          <th>상태</th>
          <th>요구응답수</th>
          <th>참여인원</th>
          <th>마감일</th>
          <th>username</th>
          <th>price</th>
          <th>소요시간</th>
          <th>제목</th>
          <th>대상</th>
          <th>신분</th>
          <th>메모</th>
          <th>상세이동</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in surveyList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.sid}}</td>
          <td>{{item.status}}</td>
          <td>{{item.headCount}}</td>
          <td>{{item.responseCount}}</td>
          <td>{{item.dueDate}}</td>
          <!-- <td>
            <select v-model="item.progress">
              <option v-for="(item, index) in progressList" :key="index" :value="item.value">{{item.name}}</option>
            </select>
          </td> -->
          <td>{{item.username}}</td>
          <td>{{item.price}}</td>
          <td>{{item.spendTime}}</td>
          <td>{{item.title}}</td>
          <td>{{item.targetGender}} / {{item.targetAgeListStr}}</td>
          <td>{{item.identity}}</td>
          <td>메모구현</td>
          <td><button @click="moveToSurveyDetailPage(item.id, item)">상세</button></td>
          <!-- <td><button @click="updateSurvey(item.id, item.progress)">적용</button></td> -->
        </tr>
      </tbody>
    </table>
    <button @click="loadMoreSurveys()">더 불러오기</button>
  </div>
  
    
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
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
        const response = await axios.get("http://3.39.170.7/survey/admin/list?page=0")
        this.surveyList = response.data.surveyList
        console.log("surveylist")
        console.log(response.data.surveyList)
      }catch(error) {
        console.log(error)
      }
    },
    
    async loadMoreSurveys() {
      console.log('loadMoreSurveys')
      try {
        const response = await axios.get("http://3.39.170.7/survey/admin/list?page=1")
        console.log(response.data)
        // this.surveyList += response.data.surveyList
      } catch(err) {
        console.log(err)
      }
    },

    async updateSurvey(id, progress) {
      console.log('updateSurvey', progress)
      
      try {
        const response = await axios.patch(`http://3.39.170.7/survey/admin/${id}`,{
          progress : progress,
          noticeToPanel : "",
          reward : 0,
          link : ""
        })
        console.log(response)
      } catch(err) {
        console.log(err)
      }
    },

    moveToSurveyDetailPage(id, survey) {
      this.$store.state.surveyToPass = survey
      const paramToPass = { 'id' : id}
      this.$router.push({ name : 'SurveyDetail', params: {'id' : paramToPass.id}})
    }

  }
}
</script>

<style>

</style>