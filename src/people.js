///* For Debug purposes, uncomment this line */ "use strict"

/*
 * For PeopleJS use only.
 * Generally, will be used to store async results
 * # Only push to this array
 */

const ___CACHE = []

const PEOPLEJS_VERSION = "1.0.0"
const _1s = 1000
const _1i = 60  * _1s
const _5i = 5   * _1i
const _1h = 60  * _1i
const _1d = 24  * _1h
const _1w = 7   * _1d
const _1m = 30  * _1w
const _6m = 6   * _1m
const _1y = 365 * _1d

const Randomic = {}

Randomic.int = (min, max) => {
  min = min || 0
  max = max || 10
  return Math.floor(Math.random() * (max - min + 1)) + min
}

Randomic.float = (min, max) => {
  min = min || 0
  max = max || 0
  return Math.random() * (max - min) + min
}

Randomic.range = (start, end, step) => {
  start = start || 0
  end = end || 10

  let randomArr = []

  if (typeof start === 'number') {
    randomArr[0] = start
    step = step || 1
    while (start + step <= end) {
      randomArr[randomArr.length] = start += step
    }
  } else {
    let str = 'abcdefghijklmnopqrstuvwxyz'
    if (start === start.toUpperCase()) {
      end = end.toUpperCase()
      str = str.toUpperCase()
    }

    str = str.substring(str.indexOf(start), str.indexOf(end) + 1)
    randomArr = str.split('')
  }
  return randomArr
}

Randomic.string = len => {
  len = len || 10
  let rdmString = ""
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2))
    return rdmString.substr(0, len)
}

Randomic.arrayInt = (minSize, maxSize, minInt, maxInt) => {
  minSize = minSize || 5
  maxSize = maxSize || 10

  minInt = minInt || 0
  maxInt = maxInt || 100

  const arr = []
  let i
  const randomSize = Randomic.int(minSize, maxSize)

  for (i = 0; i < randomSize; i++) {
    arr.push(Randomic.int(minInt, maxInt))
  }
  return arr
}

Randomic.dice = maxSize => {
    maxSize = maxSize || 6
    return Randomic.int(1, maxSize)
  }
  // End of Randomic Object

String.prototype.replaceAt = function (index, str) {
  return this.substr(0, index) + str + this.substr(index + str.length)
}

String.prototype.insertAt = function (index, value) {
  return (this.slice(0, index) + value + this.slice(index))
}

String.prototype.indexes = function (find) {
  const regexp = new RegExp(find, 'g')
  const str = this.toString()
  let match
  const matches = []

  while ((match = regexp.exec(str)) !== null) {
    matches.push(match.index)
  }

  return matches
}

String.prototype.replaceArray = function (find, replace, regexFlag) {
  let replaceString = this
  let regex
  regexFlag = regexFlag || 'g'

  for (let i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], regexFlag)
    replaceString = replaceString.replace(regex, replace[i])
  }

  return replaceString
}

String.prototype.removeAccents = function () {
  const dirtyStr = ['áàãâäąåăæā', 'éèëêẽęēėęěĕə', 'íìïîĩīïįı', 'óòöôõøœőö', 'úùüûũǘŭųűůū',
    'çḉćĉćč', 'ďđ', 'ģğ', 'ķ', 'ĺļľł', 'ñńǹņņ', 'ṕ', 'ŕř', 'šśŝśş', 'ťțţ', 'ṽ', 'ÿýỳŷỹ', 'žźẑż'
  ]

  const cleanStr = ['a', 'e', 'i', 'o', 'u', 'c', 'd', 'g', 'k', 'l', 'n', 'p', 'r', 's', 't', 'v', 'y', 'z']
  const regexStr = []

  dirtyStr.forEach(item => {
    regexStr.push(`/[${item}]/`)
  })

  return this.replaceArray(regexStr, cleanStr)

  //return this.replace(/[^a-zA-Z0-9]/g, " ")
}

String.prototype.removeSpecialChars = function () {

  return this
    .replace(/[ª]/gi, "a")
    .replace(/[º]/gi, "o")
    .replace(/[&]/gi, "e")
    .replace(/[@]/gi, "(at)")
    .replace(/[¹]/gi, "1")
    .replace(/[²]/gi, "2")
    .replace(/[³]/gi, "3")
    .replace(/[œ]/g, "oe")
    .replace(/[Œ]/g, "OE")
    .replace(/[ƒ]/gi, "f")
    .replace(/[™]/gi, "TM")
    .replace(/[Æ]/g, "AE")
    .replace(/[¦]/gi, "|")
    .replace(/[©]/gi, "(c)")
    .replace(/[®]/gi, "(R)")
    .replace(/[«]/gi, "<<")
    .replace(/[»]/gi, ">>")
    .replace(/[›]/gi, ">")
    .replace(/[—–¯]/gi, "-")
    .replace(/[±]/gi, "+-")
    .replace(/[˜]/gi, "~")
    .replace(/[“”]/gi, '"')
    .replace(/[µ]/g, 'm')
    .replace(/[½]/g, '1/2')
    .replace(/[¼]/g, '1/4')
    .replace(/[¾]/g, '3/4')
    .replace(/[ð]/g, 'eth')
    .replace(/[÷]/g, '/')
    .replace(/[¡]/g, '!')
    .replace(/[°]/gi, "grade(s)")
}

String.prototype.has = function (str) {
  return this.indexOf(str) !== -1
}

String.prototype.startsWith = function (str) {
  return this.lastIndexOf(str, 0) === 0
}

String.prototype.trunc = function (n) {
  return this.substring(0, n)
}

Array.prototype.first = function () {
  if (this[0]) {
    return this[0]
  }
  return false
}

Array.prototype.last = function () {
  return this.slice(-1).pop()
}

Array.prototype.randomItem = function () {
  return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.shuffle = function () {
  this.sort(() => Math.random() - 0.5)
}

Array.prototype.trunc = function (n = this.length) {
  this.length = n
}

Array.prototype.has = function (item) {
  return this.indexOf(item) !== -1
}

Array.prototype.desc = function () {
  return this.sort((a, b) => b - a)
}

Array.prototype.equals = function (array) {
  if (!array) return false
  if (this.length !== array.length) return false

  for (let i = 0, l = this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false
    } else if (this[i] !== array[i]) {
      return false
    }
  }
  return true
    /*
    var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
        return element === array2[index]
    })
    */
}

Array.prototype.average = function () {
  const len = this.length || 1
  let sum = 0
  this.forEach(item => {
    switch (typeof item) {
    case 'number':
      sum += parseFloat(item)
      break
    case 'string': // eslint-disable-line
      const n = parseFloat(item)
      isNumber(n) ? sum += item : ''
      break
    case 'boolean':
      item === true ? sum += 1 : ''
      break
    case 'object':
      isArray(item) ? sum += item.average() : ''
      break
    }
  })
  return sum / len
}

Array.prototype.sum = function () {
  return this.reduce((x, y) => x + y)
}

Array.prototype.__oddEven = function (type, order) {
  const oddEven = []
  order = order || false
  type = type || 'odd'

  this.forEach(item => {
    let expr
    if (type === 'odd') {
      expr = (Math.abs(item % 2) === 0)
    } else {
      expr = (Math.abs(item % 2) === 1)
    }

    if (isInt(item) && expr) {
      oddEven.push(item)
    }
  })

  switch (order) {
  case 'asc':
    return oddEven.sort()
  case 'desc':
    return oddEven.desc()
  }
  return oddEven
}

Array.prototype.odd = function (order) {
  return this.prototype.__oddEven('odd', order)
}

Array.prototype.even = function (order) {
  return this.prototype.__oddEven('even', order)
}

Array.prototype.remove = function () {
  let toRemove
  const args = arguments
  let argsLen = args.length
  let toRemoveIndex

  while (argsLen && this.length) {
    toRemove = args[--argsLen]
    while ((toRemoveIndex = this.indexOf(toRemove)) !== -1) {
      this.splice(toRemoveIndex, 1)
    }
  }
  return this
}

Array.prototype.indexes = function (item) {
  const indexes = []
  let i = -1
  while ((i = this.indexOf(item, i + 1)) !== -1) {
    indexes.push(i)
  }
  return indexes
}

Array.prototype.replace = function (xItem = {}, value) {
  const arr = this

  switch (typeof xItem) {
  case "object":
    if (isArray(xItem)) {
      return _replaceArray(arr, xItem, value)
    }

    Object.keys(xItem).forEach((item, index) => {
      if (arr.has(item)) {
        arr[index] = xItem[item]
      }
    })
    break

  default:
    _singleReplace(arr, xItem, value)
    break
  }

  function _singleReplace(arr, xItem, value) {
    const indexes = arr.indexes(xItem)
    indexes.forEach(item => {
      arr[item] = value
    })
  }

  function _replaceArray(arr, xItem, value) {
    if (isArray(xItem) && isArray(value) && xItem.length === value.length) {
      xItem.forEach((item, index) => {
        _singleReplace(arr, item, value[index])
      })
    }
    return arr
  }

  return arr
}

Array.prototype.isMulti = function () {
  const len = this.length
  let i
  for (i = 0; i < len; i++) {
    if (isArray(this[i])) {
      return true
    }
  }
  return false
}

Array.prototype.isEmpty = function () {
  return this.length === 0
}

Array.prototype.clear = function () {
  return this.length = 0
}

Number.prototype.trunc = function (digits) {
  let n = this - 10 ** -digits / 2
  n += n / (2 ** 53)
  return n.toFixed(digits)
}

Number.prototype.toRoman = function () {
  return numberToRoman(this)
}

Number.prototype.between = function (x, y) {
  return this > x && this < y
}

Number.prototype.betweenEq = function (x, y) {
  return this >= x && this <= y
}

Number.prototype.rangeTo = function (n) {
  const list = []
  let clone = this.valueOf()

  if (clone === n) {
    return [n]
  }

  while (clone <= n) {
    list.push(clone)
    clone++
  }

  while (clone >= n) {
    list.push(clone)
    clone--
  }

  return list
}

Number.prototype.absTo = function (n) {
  const x = this.valueOf()
  return Math.abs(x - n)
}

const objSize = obj => {
  return Object.keys(obj).length
}

const objEmpty = obj => {
  return objSize(obj) === 0
}

const objFunctions = obj => {
  Object.getOwnPropertyNames(obj).filter(p => typeof obj[p] === 'function')
}

const toggleCheckAl = e => {
  const element = e.target || event.srcElement || e.srcElement
  const check = element.checked
  const arrayElements = document.getElementsByTagName('input')

  for (let i = 0; i < arrayElements.length; i++) {
    if (arrayElements[i].type === 'checkbox') {
      arrayElements[i].checked = check
    }
  }
}

const isValidForm = id => {
  if (typeof id === 'number') {
    return document.forms[id].checkValidity()
  } else {
    return document.getElementById(id).checkValidity()
  }
}

const printContent = elemId => {
  const d = document
  const body = d.body
  const elementsContent = d.getElementById(elemId).innerHTML
  const oldPage = body.innerHTML

  body.innerHTML = `<html><head><meta charset='${d.characterSet}'><title>Print</title></head><body>${elementsContent}</body></html>`

  //Print Page
  window.print()

  //Restore orignal HTML
  document.body.innerHTML = oldPage
}

const goTop = () => {
  window.scrollTo(0, 0)
}

const goBottom = () => {
  window.scrollTo(0, document.body.scrollHeight)
}

const pagePos = (x, y) => {
  window.scrollTo(x, y)
}

const notNativeFunctions = () => {
  const Instance = eval('Function')
  return Object.keys(window).filter(x => window[x] instanceof Instance && !/\[native code\]/.test(window[x].toString()))
}

const urlParams = () => {
  const vars = {}
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value
  })
  return vars
}

const constant = (name, value, evalValue = false) => {
  if (evalValue === true) {
    value = eval(value)
  }
  const local = typeof global === "object" ? global : window

  Object.defineProperty(local, name, {
    value,
    enumerable: true,
    writable: false,
    configurable: false
  })
}

const formSubmit = (id, userEvent = window.event) => { // eslint-disable-line
  if (typeof id === 'number') {
    document.forms[id].submit()
  } else {
    document.getElementById(id).submit()
  }
}

const enterSubmit = (id, userEvent) => {
  if (userEvent.keyCode === 13) {
    formSubmit(id, userEvent)
  }
}

const setFullScreen = () => {
  const doc = document.documentElement

  const rfs = doc.requestFullScreen ||
    doc.webkitRequestFullScreen ||
    doc.mozRequestFullScreen

  rfs.call(doc)
}

const ss = (scriptPath, callback, insertBody = true) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = scriptPath
  if (insertBody) {
    document.body.appendChild(script)
  } else {
    document.head.appendChild(script)
  }

  script.onload = () => {
    callback()
  }
}

const romanToNumber = (str) => {
  let result = 0
  const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

  for (let i = 0; i <= decimal.length; i++) {
    while (str.indexOf(roman[i]) === 0) {
      result += decimal[i]
      str = str.replace(roman[i], '')
    }
  }

  return result
}

const numberToRoman = (num) => {
  let result = ''
  const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

  for (let i = 0; i <= decimal.length; i++) {
    while (num % decimal[i] < num) {
      result += roman[i]
      num -= decimal[i]
    }
  }

  return result
}

const setCookie = (cname, cvalue, time) => {
  const d = new Date()
  d.setTime(d.getTime() + (time))
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cname}=${cvalue}${expires}path=/`
}

const getCookie = (cname) => {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split('')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]

    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }

  return false
}

const deleteCookie = (cname) => {

  if (getCookie(cname)) {
    document.cookie = `${cname}= expires=Thu, 01 Jan 1970 00:00:00 UTC path=/`
    return true
  }

  return false
}

const listCookies = () => {

  const cookies = {}

  if (document.cookie !== '') {
    const split = document.cookie.split('')
    for (let i = 0; i < split.length; i++) {
      const name_value = split[i].split("=")
      name_value[0] = name_value[0].replace(/^ /, '')
      cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1])
    }
  }

  return cookies
}

const clearCookies = () => { // in local path
  const cookies = document.cookie.split("")

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf("=")
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = `${name}=expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }
}

const windowSize = () => {
  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const x = w.innerWidth || e.clientWidth || g.clientWidth
  const y = w.innerHeight || e.clientHeight || g.clientHeight
  return {
    "width": x,
    "height": y
  }
}

const isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const isInt = n => {
  return Number(n) === n && n % 1 === 0
}

const isNatural = n => {
  if (isInt(n)) {
    return n >= 0
  }
  return false
}

const isFloat = n => {
  return Number(n) === n && n % 1 !== 0
}

const isArray = obj => {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

const isHex = str => {
  return /^#[0-9A-F]{6}$/i.test(str)
}

const isHexColor = strNum => {
  return (typeof strNum === "string") && strNum.length === 6 &&
    !isNaN(parseInt(strNum, 16))
}

const isEmail = email => {
  const re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const isURL = url => {
  const pattern = new RegExp('^(https?:\\)?' + // protocol
      '((([a-zd]([a-zd-]*[a-zd])*).)+[a-z]{2,}|' + // domain name
      '((d{1,3}.){3}d{1,3}))' + // OR ip (v4) address
      '(:d+)?(/[-a-zd%_.~+]*)*' + // port and path
      '(?[&a-zd%_.~+=-]*)?' + // query string
      '(#[-a-zd_]*)?$', 'i') // fragment locater
  if (!pattern.test(url)) {
    return false
  } else {
    return true
  }
}

const microtime = () => {
  let s
  const now = (Date.now ? Date.now() : new Date().getTime()) / 1000
  s = now | 0
  return `${Math.round((now - s) * 1000) / 1000} ${s}`
}

const isMobile = () => {
  function ua(ag) {
    return navigator.userAgent.match(ag)
  }

  if (ua(/Android/i) ||
    ua(/webOS/i) ||
    ua(/iPhone/i) ||
    ua(/iPad/i) ||
    ua(/iPod/i) ||
    ua(/BlackBerry/i) ||
    ua(/Windows Phone/i)
  ) {
    return true
  } else {
    return false
  }
}

const objToParams = obj => {
    return `?${Object
      .keys(obj)
      .map(key => `${key}=${obj[key]}`)
      .join("&")}`
}

const blockSelection = () => {
    //document.selection.empty()
    window.getSelection().removeAllRanges()
    document.body.innerHTML += '\
        <style>*{\n\
            -webkit-touch-callout: none\n\
            -webkit-user-select: none-khtml-user-select:none\n\
            -moz-user-select: none\n\
            -ms-user-select: none\n\
            user-select: none}\n\
        </style>'
}

const goUrl = url => {
    window.location.href = url
}

const blockRightClick = () => {
    document.addEventListener('contextmenu', e => {
        e.preventDefault()
        return false
    },false)
}

const toMoney = (num, mil = '.', dec = ',', front = '', back = '') => {
    num = (typeof num === 'string') ? parseFloat(num) : num

    return front.toString() + num.toFixed(2).replace('.', dec).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${mil}`) + back.toString()
}

const moneyToFloat = (str, toFixed) => {
    let lastCharPos = false
    let floatNumber = 0

    const searchDot   = str.lastIndexOf('.')
    const searchComma = str.lastIndexOf(',')

    if (searchDot > searchComma) {
      lastCharPos = searchDot
    } else if (searchDot < searchComma) {
      lastCharPos = searchComma
    }

    str = str.replaceAt(lastCharPos, 'F')
    str = str.replace(/[\W]/g, '')
    lastCharPos = str.indexOf('F')
    str = str.replaceAt(lastCharPos, '.')
    str = str.replace(/[a-zA-Z]/g, '')
    floatNumber = parseFloat(str)
    toFixed = toFixed || floatNumber.toString().length
    return parseFloat(floatNumber.toFixed(toFixed))
}

const serializeForm = form => {
    /* needs more refactoring */
    if (!form || form.nodeName !== "FORM") {
      return false
    }

    let i = form.elements.length - 1
    let j = 0
    const q = []

    while (i >= 0) {
        const element = form.elements[i]
        const elementName = element.name
        const elementType = element.type
        const elementValue = element.value

        if (elementName === "") {
            i = i - 1
            continue
        }

        switch (element.nodeName) {
            case "INPUT":
                switch (elementType) {
                    case "checkbox":
                    case "radio":
                        if (element.checked) {
                            q.push(`${elementName}=${encodeURIComponent(elementValue)}`)
                        }
                        break
                    default:
                        q.push(`${elementName}=${encodeURIComponent(elementValue)}`)
                        break
                }
                break

            case "TEXTAREA":
                q.push(`${elementName}=${encodeURIComponent(elementValue)}`)
                break

            case "SELECT":
                switch (elementType) {
                  case "select-one":
                    q.push(`${elementName}=${encodeURIComponent(elementValue)}`)
                    break
                  case "select-multiple":
                    j = element.options.length - 1
                    while (j >= 0) {
                      if (element.options[j].selected) {
                        q.push(`${elementName}=${encodeURIComponent(element.options[j].value)}`)
                      }
                      j = j - 1
                    }
                }
                break

            case "BUTTON":
                q.push(`${elementName}=${encodeURIComponent(elementValue)}`)
                break
        }

        i = i - 1
    }
    return q.join("&")
}

const serializeJson = json => {
    return objToParams(json)
}

const isValid = x => {
    return (x === 0 ? true : !!x)
}

class ajax {
    constructor(params = {}, callback) { // eslint-disable-line
        const ajaxParams = {
            method      : params.method       || 'get',
            url         : params.url          || location.href,
            async       : params.async        || true,
            user        : params.user         || undefined,
            pass        : params.pass         || undefined,
            headers     : params.header       || {},
            data        : params.data         || false,
            dataType    : params.dataType     || 'text',
            as          : params.as           || 'text'
        }

        const ajax = new XMLHttpRequest()
        callback = callback || (data => data)

        const method = ajaxParams.method.toLowerCase()

        if (method === 'get' && ajaxParams.data) {
            if (typeof ajaxParams.data === 'object') {
                ajaxParams.data = this.serializeJSON(ajaxParams.data)
                ajaxParams.url = ajaxParams.url+ajaxParams.data
            }
        }

        ajax.open(ajaxParams.method, ajaxParams.url, ajaxParams.async)

        if (method === 'post') {
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        }

        if ( ! objEmpty(ajaxParams.headers)) {
            const headers = ajaxParams.headers
            let header
            for (header in headers) {
                ajax.setRequestHeader(header, headers[header])
            }
        }

        ajax.send(ajaxParams.data)
    }

    static onreadystatechange() {
        if (this.readyState === 4 && this.status === 200) {
            if (typeof callback === 'function') {
                this.callback(this.responseText)
            } else {
                ___CACHE.push(this.responseText)
            }
            return true
        }
    }
}

const bookmarkPage = () => {

    if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(document.title, window.location.href, '')
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
        window.external.AddFavorite(location.href, document.title)
    } else if (window.opera && window.print) { // Opera Hotlist
        this.title = document.title
        return true
    } else { // webkit - safari/chrome
        alert(`Press ${navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL'} + D to bookmark this page.`)
    }
}

const getBrowser = () => {
    const ua = navigator.userAgent
    let tem
    let browser = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []

    if(/trident/i.test(browser[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(ua) || []
        return `IE ${tem[1] || ''}`
    }

    if(browser[1] === 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/)
        if(tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
    }

    browser = browser[2] ? [browser[1], browser[2]]: [navigator.appName, navigator.appVersion, '-?']
    if((tem = ua.match(/version\/(\d+)/i))!== null) browser.splice(1, 1, tem[1])

    return browser.join(' ')
}

const browserPlugins = () => {
    const plugins = []
    for (const i in navigator.plugins) {
        if (typeof (navigator.plugins[i]) === 'object') {
            plugins.push(navigator.plugins[i].name)
        }
    }
    return plugins
}

const getIp = (selector = false) => {
    ajax({
        url: "http://api.ipify.org/"
    }, data => {
        if (selector) {
            qsa(selector).forEach(item => {
                item.innerHTML += data
            })
        } else {
            ___CACHE.push(data)
        }
    })
}

const getCurrency = (selector = false, symbol = false, base = "USD") => {
    ajax({
        url: `http://api.fixer.io/latest?base=${base}`
    }, data => {
        data = JSON.parse(data)

        if (symbol){
            data = data.rates[symbol]
        }

        if (selector) {
            qsa(selector).forEach(item => {
                item.innerHTML += data
            })
        } else {
            ___CACHE.push(data)
        }
    })
}

const blink = (selector = 'blink', speed = 500) => {
    const elements = qsa(selector)

    elements.forEach(item => {
        const el = item
        setInterval(() => {
            if (el.style.opacity === '' || el.style.opacity === '1') {
                el.style.opacity = '0.0'
            } else {
                el.style.opacity = '1.0'
            }
        }, speed)
    })
}

const isNumericDigit = evt => {
    return (evt.keyCode >= 48 && evt.keyCode <= 57)
        || (evt.keyCode >= 96 && evt.keyCode <= 105)
}

const dateDiffInDays = (firstDateObj, lastDateObj) => {
  const msPerDay = eval("_1d")
  const firstUtcDate = Date.UTC(firstDateObj.getFullYear(), firstDateObj.getMonth(), firstDateObj.getDate())
  const lastUtcDate  = Date.UTC(lastDateObj.getFullYear(),  lastDateObj.getMonth(),   lastDateObj.getDate())

  return Math.floor((lastUtcDate - firstUtcDate) / msPerDay)
}

const isNode = obj => {
    return (
        typeof Node === "object" ? obj instanceof Node :
        obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string"
    )
}

const isElement = obj => {
    return (
        typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
        obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
    )
}

const isHidden = el => {
    const style = window.getComputedStyle(el)
    return (el.offsetParent === null || style.display === 'none')
}

const isObj = obj => {
    return typeof obj === 'object'
}

const isBool = item => {
    return typeof item === 'boolean'
}

const isStr = item => {
    return typeof item === 'string'
}

const escapeHtml = string => {
    const entityMap = {
      '&': '&amp',
      '<': '&lt',
      '>': '&gt',
      '"': '&quot',
      "'": '&#39',
      '/': '&#x2F',
      '`': '&#x60',
      '=': '&#x3D'
    }

    return String(string).replace(/[&<>"'`=/]/g, str => entityMap[str])
}

const isIpv4 = ip => {
    const str = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ip)
  //var str = /^(?:(?:25[0-5]2[0-4][0-9][01]?[0-9][0-9]?)\.){3}(?:25[0-5]2[0-4][0-9][01]?[0-9][0-9]?)$/.test(ip)
    return str
}

const isIpv6 = ip => {
    const str = /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/.test(ip)
    return str
}

Math.log10 = val => Math.log(val) / Math.LN10

Math.fact = x => {
    if (!x) return 1
    return x * this.fact(x-1)
}

Math.isPrime = num => {
    for ( let i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false
        }
    }
    return true
}

Math.genPrimes = n => {
    const primes = [2]
    for (let i = 3; i < n; i+=2 ) {
        if (Math.isPrime(i)) {
            primes.push(i)
        }
    }
    return primes
}

const cursor = (mode = 'default') => {
    document.body.style.cursor = mode
}

const strToBin = (str, sep) => {
    let output = ''
    sep = sep || ''

    for (let i = 0; i < str.length ;i++) {
        output += str[i].charCodeAt(0).toString(2) + sep
    }
    return output
}

const strToHex = (str, sep) => {
    let output = ''
    sep = sep || ''

    for (let i = 0; i < str.length ;i++) {
        output += str[i].charCodeAt(0).toString(16) + sep
    }
    return output
}

const strToOct = (str, sep) => {
    let output = ''
    sep = sep || ''

    for (let i = 0; i < str.length ; i++) {
        output += str[i].charCodeAt(0).toString(8) + sep
    }
    return output
}

const hexToStr = str => {
    let j
    const hexes = str.match(/.{1,4}/g) || []
    let back = ''
    for(j = 0 ;j<hexes.length ;j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16))
    }

    return back
}

const binToStr = str => {
    const arr = str.split(" ")
    let finalStr

    for (let i=0; i<arr.length; i++) {
        finalStr += String.fromCharCode((parseInt(arr[i], 2)))
    }

    return finalStr
}

const reverse = item => {
    function r(x){return x.split('').reverse().join('')}

    if (isArray(item)) {
        return item.reverse()
    } else if (isStr(item)) {
        return r(item)
    } else if (isBool(item)) {
        return !item
    } else if (isNumber(item)) {
        item = item.toString()
        return parseFloat(r(item))
    }
    return false
}

function qsa(item) {
    return document.querySelectorAll(item)
}

const isInput = selector => {
    const query = qsa(selector)
        if (!this.isEmpty(query) ) {
            const elem = query[0].nodeName
            const result = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].indexOf(elem)
            return result !== -1
        }
        return false
}

class FormFiller { // eslint-disable-line
    constructor(formId) {
        this.form = qsa(`#${formId}`)[0]
        this.formId = formId
        this.inputs = qsa(`#${formId} input, #${formId} select, #${formId} textarea`)

        return this
    }

    getForm() {
        return this.form
    }

    inputs() {
    return this.inputs
    }

    validate() {
      this.form.reportValidity()
      return this
    }
}

const copyTextToClipboard = selector => {
    const d = document
    const aux = d.createElement("input")
    aux.setAttribute("value", qsa(selector)[0].innerHTML)
    d.body.appendChild(aux)
    aux.select()
    d.execCommand("copy")
    d.body.removeChild(aux)
}

const copyHtmlToClipboard = selector => {
    const d = document
    const aux = d.createElement("div")
    aux.setAttribute("contentEditable", true)
    aux.innerHTML = qsa(selector)[0].innerHTML
    aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)")
    d.body.appendChild(aux)
    aux.focus()
    d.execCommand("copy")
    d.body.removeChild(aux)
}

// const baseConverter = (strTxt, from, to, separator) => {
// }

// String.prototype.changeToBase = (strTxt, from, to, separator) => baseConverter(strTxt, from, to, separator)
// TO-DO : FormFiller.zeroFill

Object.defineProperty(Array.prototype, "equals", {enumerable: false})

export default {
    objSize,
    objEmpty,
    objFunctions,
    toggleCheckAl,
    isValidForm,
    printContent,
    goTop,
    goBottom,
    pagePos,
    notNativeFunctions,
    urlParams,
    constant,
    formSubmit,
    enterSubmit,
    setFullScreen,
    ss,
    romanToNumber,
    numberToRoman,
    setCookie,
    getCookie,
    deleteCookie,
    listCookies,
    clearCookies,
    windowSize,
    isNumber,
    isInt,
    isNatural,
    isFloat,
    isArray,
    isHex,
    isHexColor,
    isEmail,
    isURL,
    microtime,
    isMobile,
    objToParams,
    blockSelection,
    goUrl,
    blockRightClick,
    toMoney,
    moneyToFloat,
    serializeForm,
    serializeJson,
    isValid,
    bookmarkPage,
    getBrowser,
    browserPlugins,
    getIp,
    getCurrency,
    blink,
    isNumericDigit,
    dateDiffInDays,
    isNode,
    isElement,
    isHidden,
    isObj,
    isBool,
    isStr,
    escapeHtml,
    isIpv4,
    isIpv6,
    cursor,
    strToBin,
    strToHex,
    strToOct,
    hexToStr,
    binToStr,
    reverse,
    isInput,
    copyTextToClipboard,
    copyHtmlToClipboard,
    PEOPLEJS_VERSION,
    _1s,
    _1i,
    _5i,
    _1h,
    _1d,
    _1w,
    _1m,
    _6m,
    _1y
  }
