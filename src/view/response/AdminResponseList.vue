<template>
  <div class="admin-view-title">응답 검수</div>
  <div class="admin-view-container">
    <span class="admin-response-item" v-for="(item, index) in responseList" :key="item.id">
      <img v-if="item.status=='WRONG'" :src="item.imgUrl" class="admin-response-img" id="admin-response-img-red">
      <img v-else :src="item.imgUrl" @click="updateResponseWrong(item.id, index)" class="admin-response-img" id="admin-response-img-not-red">
    </span>
  </div>
  
    
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      totalPages: 0,
      responseList : []
    }
  },
  mounted() {
    this.listResponseList()
  },
  methods : {
    async listResponseList() {
      try {
        console.log("fetch responses")
        const response = await axios.get("https://gosurveasy.co.kr/response/admin/" + this.$route.params.id)
        this.responseList = response.data.responseList
      } catch(error) {
        console.log(error)
      }
    },

    async updateResponseWrong(responseId, index) {
      try {
        await axios.patch(
          "https://gosurveasy.co.kr/response/admin/" + responseId,
          { status : "WRONG" }
        )
        var response = this.responseList[index]
        response.status = "WRONG"
        this.responseList[index] = response
      } catch(err) {
        console.log(err)
      }
    }
  }

  
}
</script>

<style>
.admin-response-item {
  margin: 20px;
  width: 120px;
}
.admin-response-img {
  width: 120px;
  margin: 10px;
  padding: 6px;
}
#admin-response-img-not-red {
  cursor: pointer;
}
#admin-response-img-red {
  background: rgb(191, 8, 8);
}
</style>