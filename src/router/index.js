import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/integral-grade',
  },
  {
    path: '/integral-grade',
    component: Layout,
    redirect: '/integral-grade/list',
    meta: { title: '积分等级管理', icon: 'dashboard' },
    children: [
      {
      path: 'list',
      name: 'integralGradeList',
      component: () => import('@/views/integral-grade/table'),
      meta: { title: '积分等级列表', icon: 'table' }
    },
    {
      path: 'form',
      name: 'integralGradeForm',
      component: () => import('@/views/integral-grade/form'),
      meta: { title: '积分等级表单', icon: 'form' }
    }
  ]
  },
  {
    path: '/dict',
    component: Layout,
    redirect: '/dict/list',
    alwaysShow: true ,
    meta: { title: '系统设置', icon: 'dashboard' },
    children: [
      {
      path: 'list',
      name: 'dictList',
      component: () => import('@/views/dict/table'),
      meta: { title: '数字字典', icon: 'table' }
    },
  ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    alwaysShow: true ,
    meta: { title: '会员管理', icon: 'dashboard' },
    children: [
      {
      path: 'list',
      name: 'userInfoList',
      component: () => import('@/views/user/userinfo'),
      meta: { title: '会员列表', icon: 'table' }
    },
  ]
  },
  {
    path: '/borrower',
    component: Layout,
    redirect: '/borrower/list',
    alwaysShow: true ,
    meta: { title: '借款管理', icon: 'dashboard' },
    children: [
      {
      path: 'list',
      name: 'borrowerList',
      component: () => import('@/views/borrower/list'),
      meta: { title: '借款人列表', icon: 'table' }
    },
    {
      path: 'infoList',
      name: 'borrowerInfoList',
      component: () => import('@/views/borrower/borrowerinfo'),
      meta: { title: '借款列表', icon: 'table' }
    },
    {
      path: 'detail/:id',
      hidden:true,
      name: 'detailBorrowerList',
      component: () => import('@/views/borrower/form'),
      meta: { title: '借款人详情', icon: 'form' }
    },
    {
      path: 'info-detail/:id',
      name: 'detailBorrowerInfoList',
      hidden: true,
      component: () => import('@/views/borrower/borrowerinfo-detail'),
      meta: { title: '借款详情', icon: 'table' }
    },
  ]
  },
  {
    path: '/lend',
    component: Layout,
    redirect: '/lend/list',
    alwaysShow: true ,
    meta: { title: '标的管理', icon: 'dashboard' },
    children: [
      {
      path: 'list',
      name: 'lendList',
      component: () => import('@/views/lend/list'),
      meta: { title: '标的列表', icon: 'table' }
    },
    {
      path: 'detail/:id',
      name: 'detail',
      hidden:true,
      component: () => import('@/views/lend/detail'),
      meta: { title: '标的详情', icon: 'table' }
    },
  ]
  },
  


 



  
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
 

 

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
