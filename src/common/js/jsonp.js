import originalJSONP from 'jsonp'

export default function (url, data, options) {
  // 运算符优先级问题
  // 没有加括号导致url出问题
  url += (url.indexOf('?') < 0 ? '?' : '&') + toQueryString(data)
  return new Promise((resolve, reject) => {
    originalJSONP(url, options, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/*
1.for in 使用var生命变量，防止有重名属性
2.遍历属性值是否是合法值
3.追加到url上的参数值，需要进行URI编码--》URI编码的原生接口有哪些？
4.如果data是空对象，则url是空,所以对url进行判空
*/
export function toQueryString(data) {
  let ret = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    ret += `&${k}=${encodeURIComponent(value)}`
  }
  return ret ? ret.substring(1) : ''
}
