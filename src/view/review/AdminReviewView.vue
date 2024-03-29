<template>
  <div class="admin-view-title">리뷰 관리</div>
  <AdminReviewList />
</template>

<script>
import AdminReviewList from '../../component/review/AdminReviewList.vue'
export default {
  components: {
    AdminReviewList
  }
}
</script>