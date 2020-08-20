// import path from 'path'
const path = require("path");
module.exports = {
  // 基础配置
  publicPath: "./",
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置...
    // } else if (process.env.NODE_ENV === 'development') {
    //   // 为开发环境修改配置...
    //   process.env.BASE_URL = 'www.lilei.com';
    // } else if (process.env.NODE_ENV === 'test') {
    //   // 为测试环境修改配置...
    // }
    config.resolve = {
      // 配置解析别名
      extensions: [".js", ".json", ".vue", ".ts", ".tsx"], // 自动添加文件吗后缀
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components")
      }
    };
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css 相关配置
  css: {
    // 是否使用 css 高分插件 ExtractTextplugin
    // extract: true,
    // 开启 CSS  source  maps?
    sourceMap: false,
    // css 预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/assets/css/index.scss";`
      }
    }
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: "8081",
    https: false, //是否使用https协议
    hotOnly: true, //是否开启热更新
    proxy: {
      "/api": {
        target: "https://dev2.hse365.cc", //API服务器的地址
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "^/": ""
        }
      }
    }
  }
};
