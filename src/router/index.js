import { createRouter, createWebHistory } from 'vue-router'
import AdminMain from '../view/AdminMainView.vue'
import AdminOrder from '../view/AdminOrderView.vue'
import AdminPanel from '../view/AdminPanelView.vue'
import AdminCoupon from '../view/AdminCoupon.vue'
const routes = [
  {
    path:'/adminmain',
    name: 'AdminMain',
    component: AdminMain
  },
  {
    path:'/adminorder',
    name: 'AdminOrder',
    component: AdminOrder
  },
  {
    path:'/adminpanel',
    name: 'AdminPanel',
    component: AdminPanel
  },
  {
    path: '/admincoupon',
    name: 'AdminCoupon',
    component: AdminCoupon
  },
  {
    path: '/surveyDetail/:id',
    name: 'SurveyDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../view/SurveyDetail.vue'),
    // true로 설정하면 데이터를 props로도 받습니다.
    props: true,
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  
})


export default router
