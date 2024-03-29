<template>
  <div class="aggregation-container">
    <div id="aggregation-title">정산 완료 처리</div>
    <button @click="doneAggregation" class="finBtn">완료</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  methods: {

    async doneAggregation() {
      try {
        if(window.confirm("정산 완료 처리하시겠습니까?")) {
          await this.axios.get(`/response/admin/done`)
          .then(alert('정산 완료 처리되었습니다'))
        } else {
            return;
        }
      } catch(err) {
        console.log(err)
        alert(err.response.data.reason)
      }
    }
  }
}
</script>

<style>
.aggregation {
  display: flex;
  flex-direction: row;
  padding: 0 20px 0 20px
}
.aggregation-container {
  margin: 0 50px 0 50px;
  padding: 30px;
  border: 2px solid green;
  border-radius: 20px;
  background: #dff2dd;
}
#aggregation-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: green;
}
.finBtn {
  width: 90%;
  height: 40px;
  background-color: white;
  border: 2px solid green;
  border-radius: 40px;
  font-size: 16px;
  font-weight: bold;
  color: green;
  cursor: pointer;
}
.finBtn:hover{
  color: white;
  background: green;
}
</style>