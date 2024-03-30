<template>
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
</template>

<script>
import { instanceWithAuth } from '../../api/index'
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
        const response = await instanceWithAuth.get('/file')
        this.fileList = response.data.fileList
      } catch(err) {
        console.log(err)
        alert(err.response.data.reason)
      }
    },

    async deleteFile(fileId) {
      try {
          if(window.confirm("파일을 삭제하시겠습니까?")) {
            await instanceWithAuth.delete(`/file/${fileId}`).then(alert("파일이 삭제되었습니다"))
            this.$router.go("/admin/aggregation")
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