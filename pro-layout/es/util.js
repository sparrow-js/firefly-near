/**
 * 判断是否是生产环境
 * @type {Boolean}
 */
export var isProduction = function isProduction() {
  var PRODUCTION_ENV = 'production';
  var result = false;
  try {
    if (process.env.NODE_ENV === PRODUCTION_ENV) {
      result = true;
    }
  } catch (err) {
    //
  }
  return result;
};

// 兼容老逻辑
export var textTypeMap = {
  'body-1': 'body2',
  'body-2': 'body1',
  'subhead': 'h6',
  'title': 'h5',
  'headline': 'h4',
  'display-1': 'h3',
  'display-2': 'h2',
  'display-3': 'h1'
};
export var verMap = function verMap(v) {
  var map = {
    'top': 'flex-start',
    'bottom': 'flex-end',
    'middle': 'center'
  };
  return map[v] || v;
};
export var alignMapO2N = function alignMapO2N(v) {
  var map = {
    'flex-start': 'left',
    'flex-end': 'right'
  };
  return map[v] || v;
};
export var verAlignMapO2N = function verAlignMapO2N(v) {
  var map = {
    'flex-start': 'top',
    'flex-end': 'bottom',
    'center': 'middle'
  };
  return map[v] || v;
};

/**
 * 将字符串转化为驼峰式写法
 * @param  {String} str 例：-webkit-transition
 * @return {String}     例：WebkitTransition
 */
export function camelcase(str) {
  if (!/-/.test(str)) {
    return str || '';
  }
  return str.toLowerCase().replace(/-([a-z])/g, function ($0, $1) {
    return $1.toUpperCase();
  });
}

/**
 * 获取对象的类型
 * @param  {*} obj
 * @return {String}
 *
 * @example
 * typeOf([]) === 'Array'
 * typeOf() === 'Undefined'
 * typeOf(1) === 'Number'
 */
function typeOf(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|]/g, '');
}

/**
 * 判断是否是数组或类数组对象
 * @param  {*}  obj
 * @return {Boolean}
 *
 * @example
 * isArrayLike([]) === true
 * isArrayLike(arguments) === true
 * isArrayLike(this.props.children) === true
 */
function isArrayLike(obj) {
  var length = !!obj && 'length' in obj && obj.length;
  var type = typeOf(obj);
  return type === 'Array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
}

/**
 * 遍历对象或数组，或者类数组，例如React中的children对象、arguments等
 * @param  {Object|Array}   obj
 * @param  {Function} callback fn(n, i) or fn(val, key)
 * @param  {Number}   [direction = 1] 是否倒序遍历，只对数组有效
 * @return {Object|Array}
 *
 * @example
 * // 遍历数组
 * object.each([100, 200, 300], (n, i) => console.log(n, i));
 * // 遍历json对象
 * object.each({a: 100, b: 200}, (value, key) => console.log(key, value));
 * // 遍历React子节点
 * object.each(this.props.children, (child, index) => console.log(child));
 * // 遍历arguments
 * object.each(arguments, (arg, i) => console.log(arg));
 */
export function each(obj, callback, direction) {
  var reversed = direction === -1;
  var length = obj.length;
  var value;
  var i = reversed ? length - 1 : 0;
  if (isArrayLike(obj)) {
    for (; i < length && i >= 0; reversed ? i-- : i++) {
      value = callback.call(obj[i], obj[i], i);
      if (value === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      /* istanbul ignore else */
      if (obj.hasOwnProperty(i)) {
        value = callback.call(obj[i], obj[i], i);
        if (value === false) {
          break;
        }
      }
    }
  }
  return obj;
}
var floatMap = {
  cssFloat: 1,
  styleFloat: 1,
  "float": 1
};

/**
 * 是否能使用 DOM 方法
 * @type {Boolean}
 */
export var hasDOM = typeof window !== 'undefined' && !!window.document && !!document.createElement;
var PIXEL_PATTERN = /margin|padding|width|height|max|min|offset|size|top/i;
var removePixel = {
  left: 1,
  top: 1,
  right: 1,
  bottom: 1
};

/**
 * 设置元素的样式
 * @param {Element} node  DOM 节点
 * @param {Object|String} name  属性名，或者是一个对象，包含多个属性
 * @param {Number|String} value 属性值
 *
 * @example
 * // 设置单个属性值
 * dom.setStyle(mountNode, 'width', 100);
 * // 设置多条属性值
 * dom.setStyle(mountNode, {
 *     width: 100,
 *     height: 200
 * });
 */
export function setStyle(node, name, value) {
  /* istanbul ignore if */
  if (!hasDOM || !node) {
    return false;
  }

  // 批量设置多个值
  if (typeof name === 'object' && arguments.length === 2) {
    each(name, function (val, key) {
      return setStyle(node, key, val);
    });
  } else {
    name = floatMap[name] ? 'cssFloat' in node.style ? 'cssFloat' : 'styleFloat' : name;
    if (typeof value === 'number' && PIXEL_PATTERN.test(name)) {
      value = value + "px";
    }
    node.style[camelcase(name)] = value; // IE8 support
  }
}

export default {
  isProduction: isProduction,
  textTypeMap: textTypeMap,
  verMap: verMap,
  alignMapO2N: alignMapO2N,
  verAlignMapO2N: verAlignMapO2N,
  setStyle: setStyle
};