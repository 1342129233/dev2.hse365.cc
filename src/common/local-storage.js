// 如果不传第二个值相当于只给下标就是删除
// 向 localStorage 里面添加内容,如果没有就新增，如果有就根据下标去增加或者替换, key 是下标 value 是内容
function saveToLocal(key, value) {
  // 看是否有
  let vuecms = window.localStorage.__vuecms__
  if (!vuecms) {
    vuecms = {}
  } else {
    vuecms = JSON.parse(vuecms)
  }
  vuecms[key] = value
  window.localStorage.__vuecms__ = JSON.stringify(vuecms)
}

// 没有给第二个值就是空
// 向 localStorage 里面取值内容,如果没有就返回 def, 如果有就返回值, 值为空就返回 def
function loadFromLocal(key, def) {
  // 看是否有
  let vuecms = window.localStorage.__vuecms__
  if (!vuecms) {
    return def
  }
  vuecms = JSON.parse(vuecms)
  if (!vuecms) {
    return def
  }
  let result = vuecms[key]
  return result || def
}

export { saveToLocal, loadFromLocal }
