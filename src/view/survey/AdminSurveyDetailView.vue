<template>
  <div class="admin-view-title">설문 상세 보기</div>

    <!-- <button v-for="item in progressMap"></button> -->
    <!-- <select v-model="this.$store.state.surveyprogressmap">
              <option v-for="(item, index) in progressMap" :key="index" :value="item.value">{{item.name}}</option>
            </select> -->
    <!-- <button @click="openModal()">수정하기</button> -->
        <!-- Modal -->
    <div class="modal" v-if="isModalOpen">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>설문 수정 (아직 개발 미완)</h2>

        <label for="rewardInput">Set Reward:</label>
        <input type="text" id="rewardInput" v-model="rewardValue" />

        <button @click="setReward">Set Reward</button>
        <div class="input-group">
          <label for="input1">Input 1:</label>
          <input type="text" id="input1" v-model="input1Value" />
        </div>

        <div class="input-group">
          <label for="input2">Input 2:</label>
          <input type="text" id="input2" v-model="input2Value" />
        </div>

        <div class="input-group">
          <label for="input3">Input 3:</label>
          <input type="text" id="input3" v-model="input3Value" />
        </div>
      </div>
    </div>

  <div class="admin-survey-detail-container">
    <table class="admin-view-survey-detail-table" id="admin-survey-detail-table">
      <tbody>
        <tr>
          <td id="admin-survey-detail-table-title">id</td>
          <td>{{detailedSurvey.id}}</td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">sid</td>
          <td><p>{{detailedSurvey.sid}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">상태</td>
          <td><p>{{this.$store.state.maps.surveyStatusMap[detailedSurvey.status]}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">제목</td>
          <td><p>{{detailedSurvey.title}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">요구 응답수</td>
          <td>{{detailedSurvey.responseCount}} / {{detailedSurvey.headCount.substring(5)}}</td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">소요시간</td>
          <td><p>{{this.$store.state.maps.surveySpendTimeMap[detailedSurvey.spendTime]}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">마감기한</td>
          <td><p>{{detailedSurvey.dueDate}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">링크</td>
          <td><a :href="detailedSurvey.link" target="_blank">{{detailedSurvey.link}}</a></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">타겟 성별</td>
          <td><p>{{this.$store.state.maps.surveyTargetGenderMap[detailedSurvey.targetGender]}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">타겟 연령</td>
          <td><div v-for="age in detailedSurvey.targetAgeListStr.split(', ')" :key="age.value">{{this.$store.state.maps.surveyTargetAgeMap[age]}}</div></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">타겟 정보 (고객)</td>
          <td><p>{{detailedSurvey.targetInput}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">패널 유의사항 (고객)</td>
          <td><p>{{detailedSurvey.notice}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">패널 유의사항 (어드민)</td>
          <td><p>{{detailedSurvey.noticeToPanel}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">언어</td>
          <td><p>{{detailedSurvey.language}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">기관</td>
          <td><p>{{detailedSurvey.institute}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">계좌주</td>
          <td><p>{{detailedSurvey.accountName}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">가격</td>
          <td><p>{{detailedSurvey.price}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">할인된 가격</td>
          <td><p>{{detailedSurvey.priceDiscounted}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">적립금</td>
          <td><p>{{detailedSurvey.pointAdd}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">리워드</td>
          <td><p>{{detailedSurvey.reward}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">주문 시각</td>
          <td><p>{{detailedSurvey.uploadedAt}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">고객명</td>
          <td><p>{{detailedSurvey.username}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">이메일</td>
          <td><p>{{detailedSurvey.email}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">선택 신분</td>
          <td><p>{{this.$store.state.maps.surveyIdentityMap[detailedSurvey.identity]}}</p></td>
        </tr>
        <tr>
          <td id="admin-survey-detail-table-title">리뷰</td>
          <td><p>{{detailedSurvey.reviewId}}</p></td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script>
// import axios from 'axios'
import { mapState } from 'vuex';
export default {
  name: "SurveyDetail",
  computed: {
    ...mapState(['surveyStatusMap']),
  },
  data(){
    return {
      survey : null,
      detailedSurvey : this.$store.state.surveyToPass,
      isModalOpen: false,
      updatedOptions: {
        status: this.$store.state.surveyToPass.status,
        reward: this.$store.state.surveyToPass.reward,
        noticeToPanel: this.$store.state.surveyToPass.noticeToPanel,
        link: this.$store.state.surveyToPass.link
      },
      rewardValue: '',
      input1Value: '', // Store the value entered in the first additional input
      input2Value: '', // Store the value entered in the second additional input
      input3Value: '',
    }
  },
  created() {

  },

  methods : {
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    setReward() {
      // Implement the logic to handle the reward value as needed
      console.log('Setting reward:', this.rewardValue);

      // Close the modal after setting the reward
      this.closeModal();
    },
  }
};
</script>

<style>
.admin-survey-detail-container {
  align-items: center;
}
.admin-view-survey-detail-table {
  margin: auto;
  width: 70%;
  border: 1px solid #444444;
  border-collapse: collapse;
}
.admin-view-survey-detail-table td {
  text-align: left;
  padding: 20px;
}
#admin-survey-detail-table-title {
  font-weight: bold;
  text-align: center;
  background: green;
  color: white;
  width: 200px;
}
#admin-survey-detail-select {
  width: 150px;
  padding: 10px;
}



#surveydetail-progress {
  background-color: cadetblue;
}

.bordered-table th, .bordered-table td {
  border: 1px solid black;
  padding: 8px; /* Adjust the padding as needed */
}

.input-group {
  margin-bottom: 10px;
}

.input-group label {
  display: inline-block;
  width: 100px; /* Adjust as needed */
  margin-right: 10px;
}

.input-group input {
  width: 200px; /* Adjust as needed */
}


.modal {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  margin: auto;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>