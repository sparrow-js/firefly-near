"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ToggleIconGroup = exports.ToggleIcon = exports.CustomIcon = void 0;
var _balloon = _interopRequireDefault(require("@alifd/next/lib/balloon"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _icon = _interopRequireDefault(require("@alifd/next/lib/icon"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["type"],
  _excluded2 = ["className"],
  _excluded3 = ["title", "active", "type", "size", "className"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var RemoteIcon = _icon["default"].createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2535522_4oyyibdwj5v.js'
});
var CustomIcon = function CustomIcon(props) {
  var type = props.type,
    otherProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  return /*#__PURE__*/React.createElement(RemoteIcon, (0, _extends2["default"])({
    type: "icon" + type
  }, otherProps));
};
exports.CustomIcon = CustomIcon;
var Tooltip = _balloon["default"].Tooltip;
/**
 * icon组
 */
var ToggleIconGroup = function ToggleIconGroup(_ref) {
  var className = _ref.className,
    props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded2);
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    className: (0, _classnames["default"])('pro-layout-toggle-icon-group', className)
  }, props));
};
exports.ToggleIconGroup = ToggleIconGroup;
var ToggleIcon = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
  var title = _ref2.title,
    active = _ref2.active,
    type = _ref2.type,
    size = _ref2.size,
    className = _ref2.className,
    props = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, _excluded3);
  var trigger = /*#__PURE__*/React.createElement("span", (0, _extends2["default"])({
    ref: ref
  }, props, {
    className: (0, _classnames["default"])('pro-layout-toggle-icon', {
      'pro-layout-toggle-icon--active': active
    }, className)
  }), /*#__PURE__*/React.createElement(CustomIcon, {
    type: type,
    size: size
  }));
  if (!title) return trigger;
  return /*#__PURE__*/React.createElement(Tooltip, {
    trigger: trigger
  }, title);
});
exports.ToggleIcon = ToggleIcon;
ToggleIcon.defaultProps = {
  size: 'small'
};