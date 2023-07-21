import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import('@/views/Auth.vue')
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('@/views/CatalogPage')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/CategoryPage'),
  },
  {
    path: '/catalog-edit/:id?/:name?',
    name: 'CatalogEdit',
    props: (route) => {
      return {
        id: route.params.id,
        name: route.params.name
      }
    },
    component: () => import('@/views/CatalogEdit'),
  },
  {
    path: '/category-edit/:id?/:name?',
    name: 'CategoryEdit',
    props: (route) => {
      return {
        id: route.params.id,
        name: route.params.name
      }
    },
    component: () => import('@/views/CategoryEdit'),
  },
  {
    path: '/catalog-sorted/:filter_id?',
    name: 'CatalogSorted',
    props: (route) => {
      return {
        id: route.params.filter_id,
      }
    },
    component: () => import('@/views/CatalogSorted'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/CatalogPage'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
