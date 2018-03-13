import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/admin/layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/admin/views/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/admin/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/admin/views/dashboard')
      }
    ]
  },

  {
    path: '/configure',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Configure',
        component: () => import('@/admin/views/configure'),
        meta: { title: '配置页', icon: 'example' }
      }
    ]
  },

  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/admin/views/preview')
  },

  {
    path: '/mall/:id',
    name: 'mall',
    component: () => import('@/client/mall/index')
  },

  {
    path: '/activity/:id(\\d+)',
    name: 'activity',
    component: () => import('@/client/activity/index')
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
