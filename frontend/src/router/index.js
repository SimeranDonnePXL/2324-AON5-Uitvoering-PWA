import { createRouter, createWebHistory } from 'vue-router'

import NotesView from "@/components/NotesView.vue"
import AboutView from "@/components/AboutView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: NotesView
      },
      {
        path: '/about',
        name: 'about',
        component: AboutView
      },
    ]
  })
  
  export default router
  