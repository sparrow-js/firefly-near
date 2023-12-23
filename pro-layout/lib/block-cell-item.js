"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["prefix", "className", "children", "style", "mode"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var BlockCellItem = function BlockCellItem(props, ref) {
  var _classNames;
  var _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? 'pro-layout-' : _props$prefix,
    className = props.className,
    children = props.children,
    style = props.style,
    mode = props.mode,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var cls = (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefix + "block-cell-item"] = true, _classNames[prefix + "block-cell-item-" + mode] = mode, _classNames));
  var newStyle = (0, _extends2["default"])({}, style);
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    className: cls
  }, others, {
    style: newStyle,
    ref: ref
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix + "block-cell-item-body"
  }, children));
};
var RefBlockCellItem = /*#__PURE__*/React.forwardRef(BlockCellItem);
RefBlockCellItem._typeMark = 'block.cell.item';
RefBlockCellItem.defaultProps = {
  prefix: 'pro-layout-'
};
var _default = RefBlockCellItem;
exports["default"] = _default;