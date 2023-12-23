"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["prefix", "style", "children", "background", "headerDivider"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Header = function Header(_ref) {
  var _classNames;
  var _ref$prefix = _ref.prefix,
    prefix = _ref$prefix === void 0 ? 'pro-layout-' : _ref$prefix,
    style = _ref.style,
    children = _ref.children,
    background = _ref.background,
    headerDivider = _ref.headerDivider,
    others = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
  var headerCls = (0, _classnames["default"])((_classNames = {}, _classNames[prefix + "page-pro-header"] = true, _classNames[prefix + "page-pro-header-divider"] = headerDivider, _classNames[prefix + "page-bg-" + background] = !!background, _classNames));
  return children ? /*#__PURE__*/React.createElement("header", (0, _extends2["default"])({
    className: headerCls,
    style: style
  }, others), /*#__PURE__*/React.createElement("div", {
    className: prefix + "page-pro-header-content"
  }, children)) : null;
};
var _default = Header;
exports["default"] = _default;