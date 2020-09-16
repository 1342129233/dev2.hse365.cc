import Layout from '@/layout/layout'
const home = [
  {
    path: '/',
    // hidden: true,
    component: Layout,
    redirect: '/home',
    // meta: {
    //   icon: 's-home',
    //   title: '首页'
    // },
    alwaysShow: false,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/homepage'),
        meta: {title: '首页', icon: 's-home'}
      }
    ]
  },
  {
    path: '/businessmanagement',
    // hidden: true,
    component: Layout,
    meta: {title: '企业管理', icon: 'folder-add'},
    alwaysShow: false,
    children: [
      {
        path: 'departmentset',
        name: 'departmentset',
        component: () => import('@/views/departmentset'),
        meta: {title: '部门设置', icon: 's-platform'}
      },
      {
        path: 'workcategory',
        name: 'workcategory',
        component: () => import('@/views/workcategory'),
        meta: {title: '工种设置', icon: 's-custom'}
      },
      {
        path: 'jobspecific',
        name: 'jobspecific',
        component: () => import('@/views/jobspecific'),
        meta: {title: '岗位设置', icon: 's-cooperation'}
      },
      {
        path: 'personset',
        name: 'personset',
        component: () => import('@/views/personset'),
        meta: {title: '人员管理', icon: 'user-solid'}
      },
      {
        path: 'rotation',
        name: 'rotation',
        component: () => import('@/views/rotation'),
        meta: {title: '轮播图', icon: 'camera-solid'}
      },
      {
        path: 'planstatistics',
        name: 'planstatistics',
        component: () => import('@/views/planstatistics/index'),
        meta: {title: '计划统计列表', icon: 'camera-solid'}
      },
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/notice/index'),
        meta: {title: '通知公告', icon: 'camera-solid'}
      }
    ]
  }
]
export default home
