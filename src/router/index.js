import { createRouter, createWebHistory } from 'vue-router'
import AdminMain from '../view/AdminMainView.vue'
import AdminOrder from '../view/AdminOrderView.vue'
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
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  
})


export default router
