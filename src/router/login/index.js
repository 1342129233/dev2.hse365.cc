import Login from '@/views/login'
import Layout from '@/layout/layout'

const login = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/enterpriselogin',
    name: 'enterpriselogin',
    hidden: true,
    component: Layout,
    meta: {
      title: '企业登陆'
    },
    children: [
      {
        path: '/enterprise',
        name: 'enterprise',
        component: () => import('@/views/login/enterprise'),
        meta: {
          title: '企业登陆',
          sidebarHidden: true
        }
      },
      {
        path: '/addenterprise',
        name: 'addenterprise',
        component: () => import('@/views/login/enterprise/add.vue'),
        meta: {
          title: '企业登陆',
          sidebarHidden: true
        }
      },
      {
        path: '/iconset',
        name: 'iconset',
        component: () => import('@/views/login/enterprise/iconset.vue'),
        meta: {
          title: '企业登陆',
          sidebarHidden: true
        }
      }
    ]
  }
]
export default login
