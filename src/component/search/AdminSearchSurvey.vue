<template>
  <div>
    <div class="input-container">
      <input type="text" class="search-input" v-model="surveyInput">
      <button class="search-finBtn" @click="showResult">설문 검색</button>
    </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return{
      surveyInput : ""
    }
  },

  methods: {
    showResult(){
      console.log(this.surveyInput)
    }
  }

}
</script>

<style>

</style>