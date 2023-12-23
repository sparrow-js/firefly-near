"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Footer = function Footer(_ref) {
  var _classNames;
  var _ref$prefix = _ref.prefix,
    prefix = _ref$prefix === void 0 ? 'pro-layout-' : _ref$prefix,
    style = _ref.style,
    fixed = _ref.fixed,
    children = _ref.children;
  var footerRef = (0, React.useRef)(null);
  var footerCls = (0, _classnames["default"])((_classNames = {}, _classNames[prefix + "page-footer"] = true, _classNames[prefix + "page-fixed"] = fixed, _classNames));
  return children ? /*#__PURE__*/React.createElement("footer", {
    ref: footerRef,
    className: footerCls,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: prefix + "page-footer-content"
  }, children)) : null;
};
var _default = Footer;
exports["default"] = _default;