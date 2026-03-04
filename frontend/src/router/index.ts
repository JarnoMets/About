import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'home.title' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects.vue'),
    meta: { title: 'projects.title' }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue'),
    // dynamic title (per-project) is resolved by the title resolver
    meta: { title: 'projects.title' }
  },
  {
    path: '/cv',
    name: 'CV',
    component: () => import('@/views/CV.vue'),
    meta: { title: 'cv.title' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: { title: 'contact.title' }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
