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
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  
})


export default router
