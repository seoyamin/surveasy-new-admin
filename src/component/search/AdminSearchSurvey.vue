<template>
  <div class="search-survey-container">
    <div class="input-container">
      <input type="text" class="search-input" v-model="surveyInput">
      <button class="search-finBtn" @click="showResult">설문 검색</button>
    </div>
    <p>고객명으로 검색</p>
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
          <td>{{item.uploadedAt.substring(0, 16)}}</td>
          <td>{{item.dueDate.substring(0, 16)}}</td>
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
    <p v-if="this.inputEmpty">검색어를 다시 입력해주세요.</p>
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
  data() {
    return{
      totalPages: 0,
      startPage: 1,
      endPage: 10,
      currentPage : 1,
      surveyInput : "",
      surveyList : [],
      inputEmpty : false
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

  methods: {
    async showResult(){
      if(this.surveyInput.trim().length == 0){
        this.inputEmpty = true
        this.surveyList = []
      }else{
        this.inputEmpty = false
        try{
          const response = await instanceWithAuth.get("/survey/admin", {
            params: {
              page: 0,
              username: this.surveyInput.trim()
            }
          })
          this.surveyList = response.data.surveyList
          this.totalPages = response.data.pageInfo.totalPages
          this.getInflow()
          this.updatePageRange()
          if(this.surveyList.length == 0){
            alert("검색 결과가 없습니다.")
          }
        }catch(error) {
          console.log(error)
        }
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
    },
    async loadMoreSurveys(i) {
      try {
        const response = await instanceWithAuth.get("/survey/admin", {
            params: {
              page: i,
              username: this.surveyInput.trim()
            }
          })
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
  }
}
</script>

<style>
.search-survey-container{
  flex: 1; 
  overflow-y: auto; 
  padding: 10px; 
  box-sizing: border-box; 
}
</style>