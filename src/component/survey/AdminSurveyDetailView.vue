<template>
    <button @click="openModal()">수정하기</button>
        <!-- Modal -->

    <div v-if="editModal" class="edit-modal">
    <div class="edit-contentsbox">
      <div id="edit-top">
        <a class="edit-close" @click="closeModal">X</a>
        <p class="edit-title">설문 수정하기</p>

      </div>
  
      <div id="edit-container">
        <div id="detail-title">리워드</div>
          <input class="modal-input" type="text" v-model="editInfo.reward">

        <div id="detail-title">패널 유의사항</div>
        <div id="modal-notice">* 고객 입력 : {{this.editInfo.notice!='' ? editInfo.notice : '없음'}}</div>
          <input class="modal-input" type="text" v-model="editInfo.noticeToPanel">
        
        <div id="detail-title">링크</div>
          <input class="modal-input" type="text" v-model="editInfo.link">

        <div id="detail-title">마감일</div>
          <div>
            <input class="modal-input" type="Date" v-model="editDueDate.dueDate">
            <select class="modal-input" v-model="editDueDate.dueTime">
              <option :value="String('08:00')">08 : 00</option>
              <option :value="String('09:00')">09 : 00</option>
              <option :value="String('10:00')">10 : 00</option>
              <option :value="String('11:00')">11 : 00</option>
              <option :value="String('12:00')">12 : 00</option>
              <option :value="String('13:00')">13 : 00</option>
              <option :value="String('14:00')">14 : 00</option>
              <option :value="String('15:00')">15 : 00</option>
              <option :value="String('16:00')">16 : 00</option>
              <option :value="String('17:00')">17 : 00</option>
              <option :value="String('18:00')">18 : 00</option>
              <option :value="String('19:00')">19 : 00</option>
              <option :value="String('20:00')">20 : 00</option>
              <option :value="String('21:00')">21 : 00</option>
              <option :value="String('22:00')">22 : 00</option>
              <option :value="String('23:00')">23 : 00</option>
              <option :value="String('23:59')">23 : 59</option>
            </select>
          </div>
          
        
        <div id="detail-title">요구 응답수</div>
          <select class="modal-input" v-model="editInfo.headCount">
            <option :value="String('HEAD_30')">30명</option>
            <option :value="String('HEAD_40')">40명</option>
            <option :value="String('HEAD_50')">50명</option>
            <option :value="String('HEAD_60')">60명</option>
            <option :value="String('HEAD_70')">70명</option>
            <option :value="String('HEAD_80')">80명</option>
            <option :value="String('HEAD_90')">90명</option>
            <option :value="String('HEAD_100')">100명</option>
            <option :value="String('HEAD_120')">120명</option>
            <option :value="String('HEAD_140')">140명</option>
            <option :value="String('HEAD_160')">160명</option>
            <option :value="String('HEAD_180')">180명</option>
            <option :value="String('HEAD_200')">200명 (최대 응답수)</option>
          </select>
        
        <div>
          <button id="edit-fin-btn" @click="updateSurvey(detailedSurvey.id)">수정 완료</button>
        </div>
        
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
import { instanceWithAuth } from '../../api/index'
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
      editDueDate: {
        dueDate: this.$store.state.surveyToPass.dueDate.substring(0, 10),
        dueTime: this.$store.state.surveyToPass.dueDate.substring(11, 16)
      },
      editInfo: {
        reward : this.$store.state.surveyToPass.reward,
        notice: this.$store.state.surveyToPass.notice,
        noticeToPanel: this.$store.state.surveyToPass.noticeToPanel,
        link: this.$store.state.surveyToPass.link,
        dueDate: this.$store.state.surveyToPass.dueDate,
        headCount: this.$store.state.surveyToPass.headCount
      },
      editModal : false,
      editModalNotice : false,
    }
  },
  created() {
    
  },

  methods : {
    openModal() {
      this.editModal = true;
      console.log(this.editDueDate)
    },

    closeModal() {
      this.editModal = false;
    },

    async updateSurvey(id) {
      try {
        console.log(id)
        this.editInfo.dueDate = this.editDueDate.dueDate + "T" + this.editDueDate.dueTime + "Z"
        console.log(this.editInfo)
        await instanceWithAuth.patch(
          `/survey/admin/${id}`,
          this.editInfo
        )
        // await this.loadSurvey(id);
        this.closeModal();
      } catch (error) {
        console.log(error)
      }
    },

    async loadSurvey(id) {
      try {
        this.survey = await instanceWithAuth.get(
          `/survey/admin/${id}`
        )
        console.log(this.survey)
        this.detailedSurvey = this.survey
        this.$store.state.surveyToPass = this.survey
      } catch (error) {
        console.log(error)
      }
    }
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
#detail-title {
  font-size: 16px;
  color: #494949;
  text-align: left;
  font-weight: bold;
  margin: 10px;
}
#edit-fin-btn {
  padding: 7px 15px 7px 15px;
  margin: 15px 0px 0px 0px;
  color: green;
  background-color: #FFFFFF;
  border: 1.5px solid green;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
#edit-fin-btn:hover{
  color: white;
  background: green;
}
#modal-notice {
  text-align: left;
  color: rgb(187, 187, 187);
  font-size: 13px;
}
#modal-notice-red {
  text-align: left;
  color: rgb(199, 16, 16);
  font-size: 13px;
  margin-bottom: 20px;
}
</style>