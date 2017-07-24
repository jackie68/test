// import login from '@/components/login/login'
import inviteJoin from '@/components/inviteJoin/inviteJoin'

const routers = [
  {
    path: '/',
    name: 'home',
    component: resolve => require(['@/components/home/home'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/components/login/login'], resolve)
  },
  {
    path: '/codeLogin',
    name: 'codeLogin',
    component: resolve => require(['@/components/codeLogin/codeLogin'], resolve)
  },
  {
    path: '/mywallet',
    name: 'mywallet',
    component: resolve => require(['@/components/mywallet/mywallet'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: resolve => require(['@/components/statistics/statistics'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/invitatStatics',
    name: 'invitatStatics',
    component: resolve => require(['@/components/invitatStatics/invitatStatics'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/shopBindings',
    name: 'shopBindings',
    component: resolve => require(['@/components/shopBindings/shopBindings'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/scanning',
    name: 'scanning',
    component: resolve => require(['@/components/scanning/scanning'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/scanBindShop',
    name: 'scanBindShop',
    component: resolve => require(['@/components/scanBindShop/scanBindShop'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/inviteJoin',
    name: 'inviteJoin',
    component: inviteJoin,
    meta: { requiresAuth: false }
  },
  {
    path: '/bindSuccess',
    name: 'bindSuccess',
    component: resolve => require(['@/components/bindSuccess/bindSuccess'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/setting',
    name: 'setting',
    component: resolve => require(['@/components/setting/setting'], resolve)
  },
  {
    path: '/modifyPassword',
    name: 'modifyPassword',
    component: resolve => require(['@/components/modifyPassword/modifyPassword'], resolve)
  },
  {
    path: '/preApplication',
    name: 'preApplication',
    component: resolve => require(['@/components/preApplication/preApplication'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/presentSuccess',
    name: 'presentSuccess',
    component: resolve => require(['@/components/presentSuccess/presentSuccess'], resolve),
    meta: { requiresAuth: true }
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: resolve => require(['@/components/forgetPassword/forgetPassword'], resolve)
  },
  {
    path: '/register',
    name: '/register',
    component: resolve => require(['@/components/register/register'], resolve)
  }
]

export default routers

