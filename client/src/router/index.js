import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/Admin/AdminView.vue'
import LoginView from '../views/Admin/LoginView.vue'
import QuestionsView from '../views/Admin/QuestionsView.vue'
import CategoriesView from '../views/Admin/CategoriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children: [
        {
          path: "login",
          name: 'login',
          component: LoginView,
        },
        {
          path: "questions",
          name: 'questions',
          component: QuestionsView,
        },
        {
          path: "categories",
          name: 'categories',
          component: CategoriesView,
        },
      ],
    },
  ]
})

export default router
