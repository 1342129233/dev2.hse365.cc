import Vue from 'vue'
import Router from 'vue-router'

import login from './login'
import error from './error'
import home from './home'
import user from './user'
// import Login from '@/views/login'
// import Layout from '@/layout/layout'

Vue.use(Router)

/**
 * alwaysShow: true           if set true, will always show the root menu, whatever its child routes length
 *                            if not set alwaysShow, only more than ont route under the children
 *                            it will becomes nested mode, otherwise not show the root menu
 * alwaysShow: true           如果设置为true,它将总是现在在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                            它的唯一子路由放到跟目录上来，而不显示它自己本身。
 */

export const constantRouterMap = [
  ...login,
  ...home,
  ...user,
  ...error
  // {
  //   path: '/settings',
  //   component: Layout,
  //   redirect: '/settings/index',
  //   // alwaysShow: true,
  //   // meta: {
  //   //   icon: 'svg-aperture',
  //   //   title: '系统设置'
  //   // },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/settings/index'),
  //       name: 'Settings',
  //       meta: { title: '设置', icon: 'svg-pifu' }
  //     }
  //   ]
  // },
  // {
  //   path: '/user/list',
  //   component: Layout,
  //   meta: {
  //     icon: 'svg-aperture',
  //     title: '用户管理'
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@/views/user/userlist'),
  //       name: 'Userlist',
  //       meta: { title: '用户管理', icon: 'svg-pifu' }
  //     },
  //     {
  //       path: 'add',
  //       name: 'adduser',
  //       hidden: true,
  //       component: () => import('@/views/user/newadd'),
  //       meta: {icon: 'star-on', title: '添加用户'}
  //     }
  //   ]
  // },
  // {
  //   path: '/sendarticle',
  //   component: Layout,
  //   redirect: '/sendarticle/index',
  //   // alwaysShow: true,
  //   meta: {
  //     icon: 'svg-aperture',
  //     title: '报送信息'
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/sendarticle/index'),
  //       name: 'Sendarticle',
  //       meta: { title: '报送信息', icon: 'svg-pifu' }
  //     },
  //     {
  //       path: 'add',
  //       hidden: true,
  //       component: () => import('@/views/sendarticle/add'),
  //       name: 'Sendarticle',
  //       meta: { title: '创建信息', icon: 'svg-pifu' }
  //     }
  //   ]
  // },
  // {
  //   path: '/verifyarticle',
  //   component: Layout,
  //   redirect: '/verifyarticle/index',
  //   // alwaysShow: true,
  //   meta: {
  //     icon: 'svg-aperture',
  //     title: '采编信息'
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/verifyarticle/index'),
  //       name: 'Verifyarticle',
  //       meta: { title: '采编信息', icon: 'svg-pifu' }
  //     },
  //     {
  //       path: 'add',
  //       hidden: true,
  //       component: () => import('@/views/verifyarticle/add'),
  //       name: 'AddVefifyArticle',
  //       meta: { title: '审核信息', icon: 'svg-pifu' }
  //     }
  //   ]
  // },
  // {
  //   path: '/category',
  //   component: Layout,
  //   redirect: '/category/index',
  //   // alwaysShow: true,
  //   meta: {
  //     icon: 'svg-aperture',
  //     title: '栏目设置'
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/category/index'),
  //       name: 'Category',
  //       meta: { title: '栏目设置', icon: 'svg-pifu' }
  //     },
  //     {
  //       path: 'add',
  //       hidden: true,
  //       component: () => import('@/views/category/add'),
  //       name: 'AddCategory',
  //       meta: { title: '添加栏目', icon: 'svg-pifu' }
  //     }
  //   ]
  // },
  // {
  //   path: '/articletype',
  //   component: Layout,
  //   redirect: '/articletype/index',
  //   // alwaysShow: true,
  //   meta: {
  //     icon: 'svg-aperture',
  //     title: '分类设置'
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/articletype/index'),
  //       name: 'Articletype',
  //       meta: { title: '分类设置', icon: 'svg-pifu' }
  //     },
  //     {
  //       path: 'add',
  //       hidden: true,
  //       component: () => import('@/views/articletype/add'),
  //       name: 'AddArticleType',
  //       meta: { title: '添加分类', icon: 'svg-pifu' }
  //     }
  //   ]
  // },
  // {
  //   path: '/invitearticle',
  //   component: Layout,
  //   redirect: '/invitearticle/index',
  //   // alwaysShow: true,
  //   meta: {
  //     icon: 'svg-aperture',
  //     title: '约稿管理'
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/invitearticle/index'),
  //       name: 'Invitearticle',
  //       meta: { title: '约稿管理', icon: 'svg-pifu' }
  //     },
  //     {
  //       path: 'add',
  //       hidden: true,
  //       component: () => import('@/views/invitearticle/add'),
  //       name: 'AddInvitearticle',
  //       meta: { title: '创建约稿', icon: 'svg-pifu' }
  //     }
  //   ]
  // },
  // {
  //   path: '/data',
  //   name: 'data',
  //   component: Layout,
  //   meta: {
  //     icon: 'svg-layers',
  //     title: '数据统计'
  //   },
  //   children: [
  //     {
  //       path: '/data/details',
  //       name: 'DataDetails',
  //       meta: { icon: 'share', title: '统计台账' },
  //       component: () => import('@/views/data/details')
  //     },
  //     {
  //       path: '/data/report',
  //       name: 'DataReports',
  //       component: () => import('@/views/data/reports'),
  //       meta: {icon: 'star-on', title: '情况通报'}
  //     }
  //   ]
  // }
  /*
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    // alwaysShow: true,
    meta: {
      icon: 'svg-aperture',
      title: '简述'
    },
    children: [
      {
        path: 'index',
        name: 'Introduction',
        component: () => import('@/views/introduction/index'),
        meta: {icon: 'svg-aperture', title: '简述'}
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    meta: {
      icon: 'svg-layers',
      title: '路由嵌套'
    },
    children: [
      {
        path: 'menu1',
        meta: { icon: 'share', title: '嵌套路由1' },
        component: () => import('@/views/nested/menu1/index'),
        children: [
          {
            path: 'menu1-1',
            name: 'menu1-1',
            component: () => import('@/views/introduction/index'),
            meta: {icon: 'success', title: '嵌套路由1-1'}
          },
          {
            path: 'menu1-2',
            name: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index'),
            alwaysShow: true,
            meta: {icon: 'error', title: '嵌套路由1-2'},
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/introduction/index'),
                name: 'menu1-2-1',
                meta: {icon: 'warning', title: '嵌套路由1-2-1'}
              }
            ]
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        component: () => import('@/views/user/add'),
        meta: {icon: 'star-on', title: '嵌套路由2'}
      }
    ]
  },
  {
    path: '/custom-component',
    component: Layout,
    meta: {
      icon: 'question',
      title: '自定义组件'
    },
    redirect: '/custom-component/index',
    children: [
      {
        path: 'index',
        name: 'CustomComponent',
        component: () => import('@/views/custom-component/index'),
        meta: {icon: 'guide', title: '自定义组件'}
      }
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: 'index',
    alwaysShow: true,
    meta: {
      title: '可视化',
      icon: 'svg-droplet'
    },
    children: [
      {
        path: 'index',
        name: '数量统计',
        component: () => import('@/views/echarts'),
        meta: {title: '数量统计', icon: 'svg-heart'}
      }
    ]
  },
  {
    path: '/rich-editor',
    component: Layout,
    alwaysShow: true,
    meta: {
      icon: 's-order',
      title: '富文本'
    },
    redirect: 'quill',
    children: [
      {
        path: 'quill',
        name: 'QuillEditor',
        component: () => import('@/views/rich-editor/quill'),
        meta: {icon: 's-order', title: 'quill'}
      },
      {
        path: 'tinymce',
        name: 'TinyMCE',
        component: () => import('@/views/rich-editor/tinymce'),
        meta: {icon: 'svg-type', title: 'tinymce'}
      }
    ]
  }
  */
  /*
  {
    path: '/'
  }
  */
]

export default new Router({
  mode: 'hash',  // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /*
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    alwaysShow: true,
    meta: {
      title: '表格',
      icon: 'date'
    },
    children: [
      {
        path: 'export-excel',
        name: '导出表格',
        component: () => import('@/views/excel/export-excel'),
        meta: {icon: 'download', title: '导出表格'}
      },
      {
        path: 'upload-excel',
        name: '上传表格',
        component: () => import('@/views/excel/upload-excel'),
        meta: {icon: 'upload', title: '上传表格'}
      },
      {
        path: 'merge-count',
        name: '合并&统计',
        component: () => import('@/views/excel/merge-count'),
        meta: {icon: 'upload', title: '合并&统计'}
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'index',
    meta: {
      icon: 'document',
      title: '剪切板'
    },
    children: [
      {
        path: 'index',
        name: 'clipBoard',
        component: () => import('@/views/clipboard'),
        meta: {title: '剪切板示例', icon: 'document'}
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    meta: {
      icon: 'document',
      title: 'theme'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: '主题', icon: 'svg-pifu' }
      }
    ]
  },
  */
  { path: '*', redirect: '/404', hidden: true }
]
