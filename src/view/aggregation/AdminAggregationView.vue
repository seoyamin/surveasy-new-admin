<template>
  <div>
    <div class="admin-view-title">정산 관리</div>
      <div class="aggregation">
        <div class="aggregation-container">
          <div id="aggregation-title">정산 완료 처리</div>
          <button @click="doneAggregation" class="finBtn">완료</button>
        </div>


        <div class="file-list-container">
          <table class="admin-view-table">
            <tr>
              <th>id</th>
              <th>파일명</th>
              <th>다운로드</th>
              <th>삭제</th>
            </tr>

            <tr v-for="item in this.fileList" :key="item.id" class="cou-tds">
              <td>{{ item.id }}</td>
              <td>{{ item.originalFilename }}</td>
              <td><a :href="item.s3Url">다운로드</a></td>
              <td @click="deleteFile(item.id)" id="delete">삭제</td>
            
            </tr>
          </table>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    }
  },

  mounted() {
    this.getFileList()
  },

  methods: {
    async getFileList() {
      try {
        const response = await this.axios.get('/file')
        this.fileList = response.data.fileList
      } catch(err) {
        console.log(err)
        alert(err.response.data.reason)
      }
    },

    async deleteFile(fileId) {
      try {
          if(window.confirm("파일을 삭제하시겠습니까?")) {
            await this.axios.delete(`/file/${fileId}`).then(alert("파일이 삭제되었습니다"))
            this.$router.go("/admin/aggregation")
          } else {
            return;
          }
        } catch(err) {
        console.log(err)
        alert(err.response.data.reason)
      }
    },

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
.file-list-container {
  width: 100%;
}

.file-list-container th {
  font-size: 17px;
  font-weight: bold;
}

#delete{
  cursor: pointer;
  color: red;
}

.cou-tds.group {
  color: rgb(69, 149, 235);
}
</style>