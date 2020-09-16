import { getToken } from '@/common/auth'

const userMap = {
  // 键名和token保持一致
  // permissions 是用户的权限
  // 相比于用role来做权限，permissions这样可以定制每一个用户的权限
  // permissions不能为空，最少
  admin: {
    token: 'admin',
    name: 'Admin',
    age: 10,
    permissions: '/excel,/clipboard,/theme',
    avatar: './static/image/avatar/0.jpg',
    verifiedMobile: '13900000001'
  },
  lucy: {
    token: 'lucy',
    name: 'Lucy',
    age: 12,
    permissions: '/excel,/theme',
    avatar: './static/image/avatar/1.jpg',
    verifiedMobile: '13900000002'
  }
}

function pullUserInfo() {
  return userMap[getToken()]
}

export { userMap, pullUserInfo }

export function getUserList() {
  return [
    {
      token: 'admin',
      name: 'Admin',
      age: 10,
      permissions: '/excel,/clipboard,/theme',
      avatar: './static/image/avatar/0.jpg',
      org: '单位1',
      type: 3,
      verifiedMobile: '13900000001'
    },
    {
      token: 'lucy',
      name: 'Lucy',
      age: 12,
      permissions: '/excel,/theme',
      avatar: './static/image/avatar/1.jpg',
      org: '单位1',
      type: 3,
      verifiedMobile: '13900000002'
    }
  ]
}
