import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [{
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
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/domain',
    name: '我的域名',
    meta: {
      title: '我的域名',
      icon: 'nested'
    },
    children: [{
        path: 'mydomain',
        component: () => import('@/views/nested/domain/mydomain'),
        name: 'mydomain',
        meta: {
          title: '我的域名'
        }
      }, {
        path: 'push',
        component: () => import('@/views/nested/domain/push'),
        name: 'push',
        meta: {
          title: '域名push'
        }
      }, {
        path: 'template',
        component: () => import('@/views/nested/domain/template'),
        name: 'template',
        meta: {
          title: '模板管理'
        }
      }, {
        path: 'transfer',
        component: () => import('@/views/nested/domain/transfer'),
        name: 'transfer',
        meta: {
          title: '域名转入'
        }
      },
      {
        path: 'transferout',
        component: () => import('@/views/nested/domain/transferout'),
        name: 'transferout',
        meta: {
          title: '域名转出'
        }
      }

    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
