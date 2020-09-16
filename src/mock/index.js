import Mock from 'mockjs'
import * as loginAPI from './login'
import * as userAPI from './user'
import * as homepageAPI from './homepage'
import * as excel from './excel'
import * as echarts from './echarts'
import * as articleAPI from './articles'
import * as categoryAPI from './category'
import * as articletypeAPI from './articletype'

Mock.setup({
  timeout: '300-600'
})

// 登录相关接口
Mock.mock('/login/login', 'post', loginAPI.login)
Mock.mock('/login/logout', 'post', loginAPI.logout)

// 用户信息相关接口
Mock.mock('/user/getInfo', 'post', userAPI.pullUserInfo)

// 首页 homepage 相关的接口
Mock.mock('/homepage/hometotal', 'post', homepageAPI.getHomeTotal)
// 首页 homepageDetailItem 接口
Mock.mock('/homepage/detailItem', 'post', homepageAPI.getHomeDetailItem)
// 首页 investmentRank 接口
Mock.mock('/homepage/investmentRank', 'post', homepageAPI.getHomeInvestmentRank)

// 表格部分【导出表格中的票房数据】
Mock.mock('/api/getmoviepiaofang-mock', 'post', excel.piaofang)

// echarts菜单
Mock.mock('/echarts/getCateData', 'get', echarts.getCateData)
Mock.mock('/echarts/getDepartTop', 'post', echarts.getDepartTop)

Mock.mock('/homepage/getUnverifiedList', 'post', homepageAPI.getUnverifiedList)

Mock.mock('/user/getUserList', 'post', userAPI.getUserList)

Mock.mock('/article/getMySentList', 'post', articleAPI.getMySentList)

Mock.mock('/article/getAllArticleList', 'post', articleAPI.getAllArticleList)
Mock.mock('/article/getInviteList', 'post', articleAPI.getInviteList)

Mock.mock('/category/getCategoryList', 'post', categoryAPI.getCategoryList)

Mock.mock('/articletype/getArticleTypeList', 'post', articletypeAPI.getArticleTypeList)

export default Mock
