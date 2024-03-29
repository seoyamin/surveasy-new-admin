<template>
  <div class="admin-view-container">
    <span class="admin-response-item" v-for="(item, index) in responseList" :key="item.id">
      <img v-if="item.status=='WRONG'" @click="updateResponseStatus(item.id, index, 'CREATED')" :src="item.imgUrl" class="admin-response-img" id="admin-response-img-red">
      <img v-else-if="item.status=='DONE'||item.status=='WAITING'" :src="item.imgUrl" class="admin-response-img" id="admin-response-img-dark">
      <img v-else :src="item.imgUrl" @click="updateResponseStatus(item.id, index, 'WRONG')" class="admin-response-img" id="admin-response-img-not-red">
    </span>
  </div>
</template>

<script>
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
        const response = await this.axios.get("/response/admin/" + this.$route.params.id)
        this.responseList = response.data.responseList
      } catch(error) {
        console.log(error)
      }
    },

    async updateResponseStatus(responseId, index, status) {
      try {
        await this.axios.patch(
          "/response/admin/" + responseId,
          { status : status }
        )
        var response = this.responseList[index]
        response.status = status
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
#admin-response-img-dark {
  filter: brightness(30%)
}
</style>