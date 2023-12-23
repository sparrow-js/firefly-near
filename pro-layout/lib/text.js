"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _textTitle = _interopRequireDefault(require("./text-title"));
var _util = require("./util");
var _excluded = ["prefix", "className", "type", "style", "component", "strong", "underline", "delete", "code", "mark", "color"],
  _excluded2 = ["prefix", "className", "component"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * 文字 字体、大小、行高
 * @param props
 */
var Text = function Text(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    className = props.className,
    type = props.type,
    style = props.style,
    _props$component = props.component,
    component = _props$component === void 0 ? 'span' : _props$component,
    strong = props.strong,
    underline = props.underline,
    deleteProp = props["delete"],
    code = props.code,
    mark = props.mark,
    color = props.color,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var children = props.children;
  var newType = _util.textTypeMap[type] || type;
  var cls = (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefix + "text"] = true, _classNames[prefix + "text-" + newType] = newType, _classNames));
  if (typeof children === 'string' && children.indexOf('\n') !== -1) {
    var childrenList = children.split('\n');
    var newChildren = [];
    childrenList.forEach(function (child) {
      newChildren.push(child);
      newChildren.push( /*#__PURE__*/React.createElement("br", null));
    });
    newChildren.pop();
    children = newChildren;
  }
  var Tag = component;
  if (strong) {
    children = /*#__PURE__*/React.createElement("strong", null, children);
  }
  if (underline) {
    children = /*#__PURE__*/React.createElement("u", null, children);
  }
  if (deleteProp) {
    children = /*#__PURE__*/React.createElement("del", null, children);
  }
  if (code) {
    children = /*#__PURE__*/React.createElement("code", null, children);
  }
  if (mark) {
    children = /*#__PURE__*/React.createElement("mark", null, children);
  }
  var newStyle = {};
  if (color) {
    newStyle = (0, _extends2["default"])({
      color: color
    }, style);
  }
  return /*#__PURE__*/React.createElement(Tag, (0, _extends2["default"])({}, others, {
    style: newStyle,
    className: cls,
    ref: ref
  }), children);
};
var RefText = /*#__PURE__*/React.forwardRef(Text);
RefText.defaultProps = {
  prefix: 'pro-layout-'
};
var Paragraph = function Paragraph(props) {
  var prefix = props.prefix,
    className = props.className,
    component = props.component,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded2);
  var cls = (0, _classnames["default"])(prefix + "text-paragraph", className);
  if (!(0, _util.isProduction)()) {
    console.error("Warning: Text.Paragraph is depracted, use P instead");
  }
  return /*#__PURE__*/React.createElement(Text, (0, _extends2["default"])({}, others, {
    className: cls,
    component: component
  }));
};
// 为了保证兼容性，@alifd/next基础组件中 Typography 组件有的所有子组件、功能，Text也有，但是均不建议使用
RefText.H1 = (0, _textTitle["default"])('h1');
RefText.H2 = (0, _textTitle["default"])('h2');
RefText.H3 = (0, _textTitle["default"])('h3');
RefText.H4 = (0, _textTitle["default"])('h4');
RefText.H5 = (0, _textTitle["default"])('h5');
RefText.H6 = (0, _textTitle["default"])('h6');
RefText.Paragraph = Paragraph;
var _default = RefText;
exports["default"] = _default;