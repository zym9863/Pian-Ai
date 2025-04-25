import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DiaryView from '../views/DiaryView.vue'
import GoalsView from '../views/GoalsView.vue'
import VisualBoardView from '../views/VisualBoardView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/diary',
    name: 'diary',
    component: DiaryView
  },
  {
    path: '/goals',
    name: 'goals',
    component: GoalsView
  },
  {
    path: '/visual-board',
    name: 'visual-board',
    component: VisualBoardView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
