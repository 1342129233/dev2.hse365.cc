// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,// 浏览器模式(与node的区别)
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eol-last': 0,
    'space-before-function-paren': 0,
    'keyword-spacing': 0,
  }
}
