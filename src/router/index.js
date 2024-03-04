import { createRouter, createWebHistory } from 'vue-router'
import AdminSurvey from '../view/survey/AdminSurveyListView.vue'
import AdminSurveyOrder from '../view/survey/AdminSurveyOrderListView.vue'
import AdminResponse from '../view/response/AdminResponseView.vue'
import AdminPanel from '../view/panel/AdminPanelListView.vue'
import AdminCoupon from '../view/coupon/AdminCouponListView.vue'
import AdminReview from '../view/review/AdminReviewListView.vue'

const routes = [
  {
    path:'/admin/survey/order',
    name: 'AdminSurveyOrder',
    component: AdminSurveyOrder
  },
  {
    path:'/admin/survey',
    name: 'AdminSurvey',
    component: AdminSurvey
  },
  {
    path: '/admin/survey/:id',
    name: 'AdminSurveyDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../view/survey/AdminSurveyDetailView.vue'),
    // true로 설정하면 데이터를 props로도 받습니다.
    props: true,
  },
  {
    path: '/admin/survey/:id/response',
    name: 'AdminResponseList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../view/response/AdminResponseList.vue'),
    // true로 설정하면 데이터를 props로도 받습니다.
    props: true,
  },
  {
    path:'/admin/response',
    name: 'AdminResponse',
    component: AdminResponse
  },
  {
    path:'/admin/panel',
    name: 'AdminPanel',
    component: AdminPanel
  },
  {
    path: '/admin/coupon',
    name: 'AdminCoupon',
    component: AdminCoupon
  },
  {
    path:'/admin/review',
    name: 'AdminReview',
    component: AdminReview
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
