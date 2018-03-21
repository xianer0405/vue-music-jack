export function addClass(el, className) {
  if (!hasClass(el, className)) {
    let arr = el.className.split(' ')
    arr.push(className)
    el.className = arr.join(' ')
  }
}

export function hasClass(el, className) {
  let classValue = el.getAttribute('class')
  // 字面量正则对象，无法进行与变量拼接形成动态表达式。
  // let regx = '(^|\s+)'+className+'(\s+|$)'
  // 只能使用构造函数进行正则的声明
  // 构造函数的使用，要使用两个转义字符
  let regx = new RegExp('(^|\\s+)' + className + '(\\s+|$)')
  return regx.test(classValue)
}
