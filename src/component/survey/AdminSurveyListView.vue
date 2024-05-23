<template>
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
          <th>유입</th>
          <th>상세</th>
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
          <td>{{item.inflow}}</td>
          <td>{{item.inflow_detail}}</td>
          <td>{{this.$store.state.maps.surveyIdentityMap[item.identity]}}</td>
          <!-- <td><button @click="updateSurvey(item.id, item.progress)">적용</button></td> -->
        </tr>
      </tbody>
    </table>
    <button @click="prevPageSet" :disabled="startPage === 1">이전</button>
    <button class="page-btn"
      v-for="i in displayedPages" 
      :key="i" 
      @click="loadMoreSurveys(i-1)" 
      :class="{ active: currentPage === i }">
      {{ i }}
    </button>
    <button @click="nextPageSet" :disabled="endPage >= totalPages">다음</button>
  </div>
</template>

<script>
import { instanceWithAuth } from '../../api/index'
import { getDoc, doc, getFirestore } from 'firebase/firestore';
export default {
  data(){
    return {
      totalPages: 0,
      startPage: 1,
      endPage: 10,
      currentPage : 1,
      progressList : [
        { name: 0, value: 0},
        { name: 2, value: 2},
        { name: 3, value: 3}
      ],
      progressChanged: null,
      surveyList : []
    }
  },
  computed : {
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
    this.listAdminSurveys()
  },
  methods : {
    async listAdminSurveys(){
      console.log('listAdminSurveys')
      try{
        const response = await instanceWithAuth.get("/survey/admin?page=0")
        this.surveyList = response.data.surveyList
        this.totalPages = response.data.pageInfo.totalPages
        this.getInflow()
        this.updatePageRange()
      }catch(error) {
        console.log(error)
      }
    },
    
    async loadMoreSurveys(i) {
      try {
        const response = await instanceWithAuth.get("/survey/admin?page=" + i)
        this.surveyList = response.data.surveyList
        this.getInflow()
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

    async updateSurvey(id, progress) {
      console.log('updateSurvey', progress)
      
      try {
        const response = await instanceWithAuth.patch(`/survey/admin/${id}`,{
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

    async getInflow() {
      const db = getFirestore()
      this.surveyList.forEach(async user => {
        const docSnap = await getDoc(doc(db, "userData", user.email))
        if(docSnap.exists()){
          const data = docSnap.data()
          user.inflow = data.funnel
          user.inflow_detail = data.funnel_detail
        }
      })
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