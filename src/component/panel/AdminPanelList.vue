<template>
<div>
    <button @click="csvDownload()">csv 파일 다운로드</button>
</div>
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
  <button @click="prevPageSet" :disabled="startPage === 1">이전</button>
    <button class="page-btn"
      v-for="i in displayedPages" 
      :key="i" 
      @click="loadMorePanels(i-1)" 
      :class="{ active: currentPage === i }">
      {{ i }}
    </button>
    <button @click="nextPageSet" :disabled="endPage >= totalPages">다음</button>
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
      panelList : [],
      jsonPanelList: []
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
    this.listAdminPanels()
  },
  methods : {
    async listAdminPanels(){
      try{
        const response = await instanceWithAuth.get("/panel/admin?page=0")
        this.panelList = response.data.panelList
        this.totalPages = response.data.pageInfo.totalPages
        this.updatePageRange()
      }catch(error) {
        console.log(error)
      }
    },

    async loadMorePanels(i) {
      try {
        const response = await instanceWithAuth.get("/panel/admin?page=" + i)
        this.panelList = response.data.panelList
        this.currentPage = i+1
      } catch(err) {
        console.log(err)
      }
    },


    async csvDownload() {
      try {
        if(window.confirm("csv 파일을 다운로드하시겠습니까?")) {
           const response = await instanceWithAuth.get("/panel/admin/csv")
           this.jsonPanelList = response.data.panelList           
           this.jsonToCsv(this.jsonPanelList)
           
        } else {
            return;
        }
      } catch(err) {
        console.log(err)
      }
    },

    // Convert JSON to CSV manually
    jsonToCsv(jsonPanelList) {
        let csv = "data:text/csv;charset=utf-8,";
        
        // Extract headers
        const headers = Object.keys(jsonPanelList[0]);
        csv += headers.join(',') + '\n';
        
        // Extract values
        jsonPanelList.forEach(obj => {
            const values = headers.map(header => obj[header]);
            csv += values.join(',') + '\n';
        });


        var encodedUri = encodeURI(csv);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", new Date().toISOString().substring(0, 10) + ".csv");
        document.body.appendChild(link);

        link.click();
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
</style>