import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import('@/views/Auth.vue')
  },
  {
    path: '/admin/catalog',
    name: 'Catalog',
    component: () => import('@/views/CatalogPage')
  },
  {
    path: '/admin/categories',
    name: 'Categories',
    component: () => import('@/views/CategoryPage'),
  },
  {
    path: '/admin/catalog-edit/:id?/:name?',
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
    path: '/admin/category-edit/:id?/:name?',
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
    path: '/admin/catalog-sorted/:filter_id?',
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
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../components/CommonUserComponents/v-catalog.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../components/CommonUserComponents/v-cart.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
