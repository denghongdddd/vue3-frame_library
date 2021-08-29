import { getCurrentInstance } from 'vue'

import {
  isObject,
  isArray,
  isString,
  capitalize,
  hyphenate,
  looseEqual,
  extend,
  camelize,
  hasOwn,
  toRawType,
} from '@vue/shared'

import isServer from './isServer'

export function toObject(arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export const getValueByPath = (obj, paths = '') => {
  let ret = obj
  paths.split('.').map(path => {
    ret = ret?.[path]
  })
  return ret
}

export function getPropByPath(obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0
  for (i; i < keyArr.length - 1; i++) {
    if (!tempObj && !strict) break
    const key = keyArr[i]

    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj?.[keyArr[i]],
  }
}

/**
 * Generate random number in range [0, 1000]
 * Maybe replace with [uuid](https://www.npmjs.com/package/uuid)
 */
export const generateId = () => Math.floor(Math.random() * 10000)

// use isEqual instead
// export const valueEquals

export const escapeRegexpString = (value = '') =>
  String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

// Use native Array.find, Array.findIndex instead

// coerce truthy value to array
export const coerceTruthyValueToArray = arr => {
  if (!arr && arr !== 0) { return [] }
  return Array.isArray(arr) ? arr : [arr]
}

export const isIE = function() {
  return !isServer && !isNaN(Number(document.DOCUMENT_NODE))
}

export const isEdge = function() {
  return !isServer && navigator.userAgent.indexOf('Edge') > -1
}

export const isFirefox = function() {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i)
}

export const autoprefixer = function( style ) {
  const rules = ['transform', 'transition', 'animation']
  const prefixes = ['ms-', 'webkit-']
  rules.forEach(rule => {
    const value = style[rule]
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value
      })
    }
  })
  return style
}

export const kebabCase = hyphenate

// reexport from lodash & vue shared
export {
  hasOwn,
  // isEmpty,
  // isEqual,
  isObject,
  isArray,
  isString,
  capitalize,
  camelize,
  looseEqual,
  extend,
}

export const isBool = (val) => typeof val === 'boolean'
export const isNumber = (val) => typeof val === 'number'
export const isHTMLElement = (val) => toRawType(val).startsWith('HTML')

export function rafThrottle(fn) {
  let locked = false
  return function(...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      locked = false
    })
  }
}

export const clearTimer = (timer) => {
  clearTimeout(timer.value)
  timer.value = null
}

/**
 * Generating a random int in range (0, max - 1)
 * @param max {number}
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function entries(obj) {
  return Object
    .keys(obj)
    .map((key) => ([key, obj[key]]))
}

export function isUndefined(val) {
  return val === void 0
}

export { isVNode } from 'vue'

export function useGlobalConfig() {
  const vm = getCurrentInstance()
  if ('$ELEMENT' in vm.proxy) {
    return vm.proxy.$ELEMENT
  }
  return {}
}
export const arrayFindIndex = function ( arr, pred ) {
  return arr.findIndex(pred)
}

export const arrayFind = function ( arr, pred ) {
  return arr.find(pred)
}

export function isEmpty(val) {
  if (
    !val && val !== 0 ||
    isArray(val) && !val.length ||
    isObject(val) && !Object.keys(val).length
  ) return true

  return false
}

export function arrayFlat(arr) {
  return arr.reduce((acm, item) => {
    const val = Array.isArray(item) ? arrayFlat(item) : item
    return acm.concat(val)
  }, [])
}

export function deduplicate(arr) {
  return Array.from(new Set(arr))
}

/**
 * Unwraps refed value
 * @param ref Refed value
 */
export function $(ref)  {
  return ref.value
}
