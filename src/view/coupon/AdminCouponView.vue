<template>
  <div>
    <div class="admin-view-title">쿠폰 관리</div>
      <div class="coupon">
        <AdminCouponIssue />
        <AdminCouponList />
      </div>
  </div>
</template>

<script>
import AdminCouponIssue from '../../component/coupon/AdminCouponIssue.vue'
import AdminCouponList from '../../component/coupon/AdminCouponList.vue'
export default {
  components: {
    AdminCouponIssue,
    AdminCouponList
  }
}
</script>

<style>
.coupon {
  display: flex;
  flex-direction: row;
  padding: 0 20px 0 20px
}
</style>