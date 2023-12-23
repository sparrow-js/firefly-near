"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = exports.Divider = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _proCard = _interopRequireDefault(require("./pro-card"));
var _p = _interopRequireDefault(require("./p"));
var _excluded = ["prefix", "direction"],
  _excluded2 = ["prefix", "className", "children", "content", "rowSpan", "style", "colSpan", "title", "extra", "mode", "childMode", "childWidth", "childTotalColumns"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Divider = function Divider(props, ref) {
  var _classNames;
  var _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? 'pro-layout-' : _props$prefix,
    direction = props.direction,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var cls = (0, _classnames["default"])((_classNames = {}, _classNames[prefix + "block-divider"] = true, _classNames[prefix + "block-divider-ver"] = direction === 'ver', _classNames));
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, others, {
    className: cls,
    ref: ref
  }));
};
var RefDivider = /*#__PURE__*/React.forwardRef(Divider);
exports.Divider = RefDivider;
var BlockCell = function BlockCell(props, ref) {
  var _classNames2, _classNames3;
  var _props$prefix2 = props.prefix,
    prefix = _props$prefix2 === void 0 ? 'pro-layout-' : _props$prefix2,
    className = props.className,
    children = props.children,
    content = props.content,
    rowSpan = props.rowSpan,
    style = props.style,
    colSpan = props.colSpan,
    title = props.title,
    extra = props.extra,
    mode = props.mode,
    childMode = props.childMode,
    childWidth = props.childWidth,
    childTotalColumns = props.childTotalColumns,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded2);
  var cls = (0, _classnames["default"])(className, (_classNames2 = {}, _classNames2[prefix + "block-cell"] = true, _classNames2[prefix + "block-cell-" + mode] = mode, _classNames2));
  var bodyCls = (0, _classnames["default"])((_classNames3 = {}, _classNames3[prefix + "block-cell-body"] = true, _classNames3[prefix + "block-cell-" + childMode] = childMode, _classNames3));
  var newStyle = (0, _extends2["default"])({
    gridRowEnd: "span " + rowSpan,
    gridColumnEnd: "span " + colSpan
  }, style);
  var width = typeof childWidth === 'string' ? childWidth : childWidth + "px";
  var gridTemplateColumns = childTotalColumns;
  if (childMode === 'flow') {
    gridTemplateColumns = "repeat(auto-fit, minmax(" + width + ", 1fr))";
  } else if (typeof childTotalColumns === 'number') {
    gridTemplateColumns = "repeat(" + childTotalColumns + ", minmax(0px, " + (100 / childTotalColumns).toFixed(5) + "%)";
  }
  var bodyStyle = {
    gridTemplateColumns: gridTemplateColumns
  };
  var proCardContent = /*#__PURE__*/React.createElement(_proCard["default"], (0, _extends2["default"])({
    actionBar: extra
  }, props), content || children);
  if (mode === 'procard') {
    return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
      className: cls
    }, others, {
      style: newStyle,
      ref: ref
    }), proCardContent);
  }
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    className: cls
  }, others, {
    style: newStyle,
    ref: ref
  }), title ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_p["default"], {
    className: prefix + "block-title",
    type: "h6",
    align: "space-between"
  }, /*#__PURE__*/React.createElement(_p["default"].Cell, null, title), extra && /*#__PURE__*/React.createElement(_p["default"].Cell, {
    type: "body2"
  }, extra))) : null, /*#__PURE__*/React.createElement("div", {
    className: bodyCls,
    style: bodyStyle
  }, content || children));
};
var RefBlockCell = /*#__PURE__*/React.forwardRef(BlockCell);
RefBlockCell._typeMark = 'block.cell';
RefBlockCell.defaultProps = {
  prefix: 'pro-layout-',
  colSpan: 1,
  rowSpan: 1
};
var _default = RefBlockCell;
exports["default"] = _default;