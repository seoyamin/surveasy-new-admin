<template>
  <div>
    <div class="admin-view-title">정산 관리</div>
      <div class="aggregation">
        <AdminAggregationDone />
        <AdminAggregationTable />
    </div>

  </div>
</template>

<script>
import AdminAggregationDone from '../../component/aggregation/AdminAggregationDone.vue'
import AdminAggregationTable from '../../component/aggregation/AdminAggregationTable.vue'
export default {
  components: {
    AdminAggregationDone,
    AdminAggregationTable
  }
}
</script>

<style>
.aggregation {
  display: flex;
  flex-direction: row;
  padding: 0 20px 0 20px
}
</style>