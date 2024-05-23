<template>
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
    <button @click="prevPageSet" :disabled="startPage === 1">이전</button>
    <button class="page-btn"
      v-for="i in displayedPages" 
      :key="i" 
      @click="loadMoreReviews(i-1)" 
      :class="{ active: currentPage === i }">
      {{ i }}
    </button>
    <button @click="nextPageSet" :disabled="endPage >= totalPages">다음</button>
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
import { instanceWithAuth } from '../../api/index'
export default {
  data(){
    return {
      totalPages: 0,
      startPage: 1,
      endPage: 10,
      currentPage : 1,
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
  computed: {
    displayedPages() {
      const pages = [];
      console.log(this.startPage, this.endPage, this.totalPages)
      for (let i = this.startPage; i <= Math.min(this.endPage, this.totalPages); i++) {
        
        pages.push(i);
      }
      console.log(pages)
      return pages;
    },
  },
  mounted(){
    this.listAdminReviews()
  },
  methods : {
    async listAdminReviews() {
      try{
        const response = await instanceWithAuth.get("/review/admin?page=0")
        this.reviewList = response.data.reviewList
        this.totalPages = response.data.pageInfo.totalPages
        this.updatePageRange()
      }catch(error) {
        console.log(error)
      }
    },
    
    async loadMoreReviews(i) {
      try {
        const response = await instanceWithAuth.get("/review/admin?page=" + i)
        this.reviewList = response.data.reviewList
        this.currentPage = i+1
      } catch(err) {
        console.log(err)
      }
    },
    updatePageRange() {
      const rangeSize = 10;
      const currentRangeStart = Math.floor(this.currentPage / rangeSize) * rangeSize + 1;
      this.startPage = currentRangeStart;
      this.endPage = Math.min(currentRangeStart + rangeSize - 1, this.totalPages);
    },
    prevPageSet() {
      if (this.startPage > 1) {
        this.startPage -= 10;
        this.endPage = this.startPage + 9;
      }
    },
    nextPageSet() {
      if (this.endPage < this.totalPages) {
        this.startPage += 10;
        this.endPage = Math.min(this.startPage + 9, this.totalPages);
      }
    },

    async updateReview(){
      try {
        const response = await instanceWithAuth.patch(
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