<template>
  <div class="admin-view-title">리뷰 관리</div>
  <div class="admin-view-container">
    <table class="admin-view-table">
      <thead>
        <tr>
          <th>상태</th>
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
        <tr v-for="item in this.reviewList" :key="item.id" :class="{visible:item.status=='VISIBLE', invisible:item.status=='INVISIBLE'}">
          <td>{{ item.status }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.surveyTitle }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.grade }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.createdAt }}</td>
          <td><button @click="openModel(item)">변경하기</button></td>
        </tr>
      </tbody>
    </table>
    <button v-for="i in totalPages" :key="i" @click="loadMoreReviews(i-1)">{{i}}</button>
  </div>

  <div v-if="editModal == true" class="edit-modal">
      <div class="edit-contentsbox">
        <div id="edit-top">
          <a class="edit-close" @click="closeModal">X</a>
          <p class="edit-title">리뷰 수정하기</p>

        </div>
    
        <div id="edit-container">
          <div id="detail-title">상태</div>
            <select id="admin-review-select" v-model="editInfo.status">
              <option :value="String('VISIBLE')" >VISIBLE</option>
              <option :value="String('INVISIBLE')" >INVISIBLE</option>
            </select>

          <div id="detail-title">점수</div>
            <input class="modal-input" type="text" v-model="editInfo.grade">
          
          <div id="detail-title">내용</div>
            <input class="modal-input" type="text" v-model="editInfo.content">
          
          <button id="edit-fin-btn" @click="updateReview">수정 완료</button>
          
        </div> 
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      totalPages: 0,
      reviewList : [],
      editInfo: {
        id : 0,
        status : '',
        grade: 0,
        content: "",
      },
      editModal : false,
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

    async updateReview(){
      try {
        const response = await this.axios.patch(
          `/review/admin/${this.editInfo.id}`,
          { 
            status : this.editInfo.status,
            grade : this.editInfo.grade,
            content : this.editInfo.content 
          }
        )
        if(response.status == 200){
          alert("성공했습니다.")
          this.editModal = false
        }else{
          alert("다시 시도해주세요")
        }
      } catch(err) {
        console.log(err)
      }
    },
    
    closeModal() {
      this.editModal = false
      this.$router.go("/admin/review")
    },

    openModel(item){
      this.editModal = true
      this.editInfo = item
    },
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

.visible{
  color: green;
}

#admin-review-select{
  padding: 10px;
  width: 100%;
}
</style>