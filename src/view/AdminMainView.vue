<template>
  <div>admin main view</div>
  <div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>progress</th>
          <th>username</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in surveyList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.progress}}</td>
          <td>{{item.username}}</td>
          <td>{{item.price}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
    
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      surveyList : []
    }
  },
  mounted(){
    this.listAdminSurveys()
  },
  methods : {
    async listAdminSurveys(){
      console.log('listAdminSurveys')
      try{
        const response = await axios.get("http://3.39.170.7/survey/admin/list")
        this.surveyList = response.data.surveyList
        console.log(response.data.surveyList)
      }catch(error) {
        console.log(error)
      }

    }
  }
}
</script>

<style>

</style>