<template>
  <div class="admin-view-title">설문 상세</div>
  <AdminSurveyDetail :surveyId="surveyId" />
</template>

<script>
import AdminSurveyDetail from '../../component/survey/AdminSurveyDetailView.vue'
export default {
  components: {
    AdminSurveyDetail
  },
  data() {
    return {
      surveyId: this.$route.params.id
    }
  }
}
</script>