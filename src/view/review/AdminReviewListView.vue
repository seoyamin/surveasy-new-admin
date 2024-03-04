<template>
  <div class="admin-view-title">리뷰 관리</div>
  <div class="admin-view-container">
    <table class="admin-view-table">
      <thead>
        <tr>
          <th>id</th>
          <th>설문 제목</th>
          <th>고객명</th>
          <th>리뷰 별점</th>
          <th>리뷰 내용</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in this.reviewList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.surveyTitle}}</td>
          <td>{{item.username}}</td>
          <td>{{item.grade}}</td>
          <td>{{item.content}}</td>
          <td>{{item.createdAt}}</td>
        </tr>
      </tbody>
    </table>
    <button v-for="i in totalPages" :key="i" @click="loadMoreReviews(i-1)">{{i}}</button>
  </div>
  
    
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      totalPages: 0,
      reviewList : []
    }
  },
  mounted(){
    this.listAdminReviews()
  },
  methods : {
    async listAdminReviews() {
      try{
        const response = await axios.get("http://localhost:8080/review/admin?page=0")
        this.reviewList = response.data.reviewList
        this.totalPages = response.data.pageInfo.totalPages
      }catch(error) {
        console.log(error)
      }
    },
    
    async loadMoreReviews(i) {
      try {
        const response = await axios.get("http://localhost:8080/review/admin?page=" + i)
        this.reviewList = response.data.reviewList
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