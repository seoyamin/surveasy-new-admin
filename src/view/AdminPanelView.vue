<template>
  <div>
    <h1>Admin Panel view</h1>
    <div>
      <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>job</th>
          <th>gender</th>
          <th>uid</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in panelList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.job}}</td>
          <td>{{item.gender}}</td>
          <td>{{item.uid}}</td>
          <td>{{item.email}}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      panelList : []
    }
  },
  mounted(){
    this.listAdminPanels()
  },
  methods : {
    async listAdminPanels(){
      console.log('listAdminpanels')
      try{
        const response = await axios.get("http://3.39.170.7/panel/admin/list")
        this.panelList = response.data.panelList
        console.log(response.data.panelList)
      }catch(error) {
        console.log(error)
      }

    }
  }
}
</script>

<style>

</style>