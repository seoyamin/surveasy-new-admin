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
          <th>리뷰 상태 변경</th>
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
          <td><button @click="showReview(item.id)">보여주기</button></td>
        </tr>
      </tbody>
    </table>
    <button v-for="i in totalPages" :key="i" @click="loadMoreReviews(i-1)">{{i}}</button>
  </div>
</template>

<script>
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
        const response = await this.axios.get("/review/admin?page=0")
        this.reviewList = response.data.reviewList
        this.totalPages = response.data.pageInfo.totalPages
      }catch(error) {
        console.log(error)
      }
    },
    
    async loadMoreReviews(i) {
      try {
        const response = await this.axios.get("/review/admin?page=" + i)
        this.reviewList = response.data.reviewList
      } catch(err) {
        console.log(err)
      }
    },

    async showReview(id){
      try {
        const response = await this.axios.patch(
          `/review/admin/${id}`,
          { status : "VISIBLE" }
        )
        if(response.status == 200){
          alert("성공했습니다.")
        }else{
          alert("다시 시도해주세요")
        }
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