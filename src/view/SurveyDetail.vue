<template>
  <h1>surveydetail</h1>

  <div id='surveydetail-progress'>
    <h2>프로그레스 변경</h2>
    <ul>
      <li v-for="item in progressMap" :key="item" :style="item == progressMap[this.$store.state.surveyToPass.status] ? {'color' : 'red'} : ''">{{item}}</li>
    </ul>

    <ul>
  <li v-for="key in Object.keys(surveyStatusMap)" :key="key" :style="{ color: key === this.$store.state.surveyToPass.status ? 'red' : 'black' }">
    {{ key }}
  </li>
</ul>

    <!-- <button v-for="item in progressMap"></button> -->
    <!-- <select v-model="this.$store.state.surveyprogressmap">
              <option v-for="(item, index) in progressMap" :key="index" :value="item.value">{{item.name}}</option>
            </select> -->
    <button @click="openModal()">openModal</button>
        <!-- Modal -->
    <div class="modal" v-if="isModalOpen">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Survey Detail</h2>

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
  </div>

  <table class="bordered-table">
    <thead>
      <tr>
        <th>항목</th>
        <th>내용</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>{{detailedSurvey.id}}</td>
      </tr>
      <tr>
        <td>요구응답수</td>
        <td>{{detailedSurvey.headCount}}</td>
      </tr>
      <tr>
        <td>소요시간</td>
        <td><p>{{detailedSurvey.spendTime}}</p></td>
      </tr>
      <tr>
        <td>마감기한</td>
        <td><p>{{detailedSurvey.dueDate}}</p></td>
      </tr>
      <tr>
        <td>타겟성별</td>
        <td><p>{{detailedSurvey.targetGender}}</p></td>
      </tr>
      <tr>
        <td>타겟연령</td>
        <td><p>{{detailedSurvey.targetAgeListStr}}</p></td>
      </tr>
      <tr>
        <td>언어</td>
        <td><p>{{detailedSurvey.language}}</p></td>
      </tr>
      <tr>
        <td>주문자신분</td>
        <td><p>{{detailedSurvey.identity}}</p></td>
      </tr>
      <tr>
        <td>설문제목</td>
        <td><p>{{detailedSurvey.title}}</p></td>
      </tr>
      <tr>
        <td>설문타겟정보</td>
        <td><p>{{detailedSurvey.targetInput}}</p></td>
      </tr>
      <tr>
        <td>설문기관</td>
        <td><p>{{detailedSurvey.institute}}</p></td>
      </tr>
      <tr>
        <td>설문링크</td>
        <td><p>{{detailedSurvey.link}}</p></td>
      </tr>
      <tr>
        <td>패널전달공지</td>
        <td><p>{{detailedSurvey.notice}}</p></td>
      </tr>
      <tr>
        <td>계좌주</td>
        <td><p>{{detailedSurvey.accountName}}</p></td>
      </tr>
      <tr>
        <td>가격</td>
        <td><p>{{detailedSurvey.price}}</p></td>
      </tr>
      <tr>
        <td>할인된가격</td>
        <td><p>{{detailedSurvey.priceDiscounted}}</p></td>
      </tr>
      <tr>
        <td>적립금</td>
        <td><p>{{detailedSurvey.pointAdd}}</p></td>
      </tr>
      <tr>
        <td>이메일</td>
        <td><p>{{detailedSurvey.email}}</p></td>
      </tr>
      <tr>
        <td>주문자이름</td>
        <td><p>{{detailedSurvey.username}}</p></td>
      </tr>
      <tr>
        <td>설문sid</td>
        <td><p>{{detailedSurvey.sid}}</p></td>
      </tr>
      <tr>
        <td>설문상태</td>
        <td><p>{{detailedSurvey.status}}</p></td>
      </tr>
      <tr>
        <td>업로드시간</td>
        <td><p>{{detailedSurvey.uploadedAt}}</p></td>
      </tr>
      <tr>
        <td>noticeToPanel</td>
        <td><p>{{detailedSurvey.noticeToPanel}}</p></td>
      </tr>
      <tr>
        <td>리워드</td>
        <td><p>{{detailedSurvey.reward}}</p></td>
      </tr>
      <tr>
        <td>현재응답수</td>
        <td><p>{{detailedSurvey.responseCount}}</p></td>
      </tr>
      <tr>
        <td>리뷰id</td>
        <td><p>{{detailedSurvey.reviewId}}</p></td>
      </tr>
    </tbody>
  </table>
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
      progressMap : this.$store.state.surveyStatusMap,
      detailedSurvey : this.$store.state.surveyToPass,
      isModalOpen: false,
      rewardValue: '',
      input1Value: '', // Store the value entered in the first additional input
      input2Value: '', // Store the value entered in the second additional input
      input3Value: '',
    }
  },
  created() {
    console.log(this.$route.params.survey);
    // this.querySurveyDetail(this.$route.params.id)
  },

  methods : {
    // async querySurveyDetail(id) {
    //   try {
    //     const response = await axios.get(`http://3.39.170.7/survey/app/${id}`)
    //     console.log(response.data)
    //     this.survey = response.data

    //   } catch(err) {
    //     console.log(err)
    //   }
    // }

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
#surveydetail-progress {
  background-color: cadetblue;
}

.bordered-table {
  border-collapse: collapse;
  width: 100%;
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