import Layout from '@/layout/layout'
const user = [
  {
    path: '/user',
    component: Layout,
    // hidden: true,
    meta: {
      icon: 'folder-add', // tickets
      title: '个人管理'
    },
    children: [
      {
        path: 'personalManagement',
        name: 'personalManagement',
        component: () => import('@/views/user/profile'),
        meta: {icon: 's-tools', title: '个人管理'}
      },
      {
        path: 'avatar',
        name: 'Avatar',
        component: () => import('@/views/user/profile'),
        meta: {icon: 'warning', title: '修改头像'}
      }
    ]
  }
]
export default user