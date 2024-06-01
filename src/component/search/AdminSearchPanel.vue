<template>
  <div class="search-panel-container">
    <div class="input-container">
      <input type="text" class="search-input" v-model="panelInput">
      <button class="search-finBtn" @click="showResult">패널 검색</button>
    </div>
    <p>이름 / 이메일 / 전화번호로 검색</p>
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
  <button @click="prevPageSet" :disabled="startPage === 1">이전</button>
    <button class="page-btn"
      v-for="i in displayedPages" 
      :key="i" 
      @click="loadMorePanels(i-1)" 
      :class="{ active: currentPage === i }">
      {{ i }}
    </button>
    <button @click="nextPageSet" :disabled="endPage >= totalPages">다음</button>
  </div>
</template>

<script>
import { instanceWithAuth } from '../../api/index'
export default {
  data() {
    return{
      totalPages: 0,
      startPage: 1,
      endPage: 10,
      currentPage : 1,
      panelInput : "",
      panelList : [],
      inputEmpty : false
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
          this.totalPages = response.data.pageInfo.totalPages
          this.currentPage = 1
          this.updatePageRange()
          if(this.panelList.length == 0){
            alert("검색 결과가 없습니다.")
          }
        }catch(error) {
          console.log(error)
        }
      }
    },
    async loadMorePanels(i) {
      try {
        const response = await instanceWithAuth.get("/panel/admin", {
          params: {
              page: i,
              keyword: this.panelInput.trim()
            }
        })
        this.panelList = response.data.panelList
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
.search-panel-container{
  flex: 1; /* 컨텐츠 영역을 가능한 만큼 확장 */
  overflow-y: auto; /* 수직 오버플로우를 자동으로 스크롤 */
  padding: 10px; /* 컨텐츠 여백 */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 크기 계산 */
}
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