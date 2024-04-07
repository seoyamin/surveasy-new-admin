<template>
  <div class="admin-view-title">응답 검수</div>
  <AdminResponseList :surveyId="surveyId" />
</template>

<script>
import AdminResponseList from '../../component/response/AdminResponseList.vue'
export default {
  components: {
    AdminResponseList
  },
  data() {
    return {
      surveyId: this.$route.params.id
    }
  }
}
</script>