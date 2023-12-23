"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _tab = _interopRequireDefault(require("@alifd/next/lib/tab"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _aside = _interopRequireDefault(require("./aside"));
var _nav = _interopRequireDefault(require("./nav"));
var _excluded = ["prefix", "columns", "nav", "aside", "main", "children", "contentAlignCenter", "gap", "background", "noPadding", "grid", "isTab", "title", "key", "active", "presetNav", "presetAside", "navProps", "asideProps"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * TODO: Page.Header Page.Content Page.Footer
 * Content 的高度默认占据 一个屏幕的剩余空间，即使里面内容不足也应该背景色撑满
 * @param props
 */

var PageContent = function PageContent(props) {
  var _classNames, _classNames2, _classNames3;
  var prefix = props.prefix,
    columns = props.columns,
    nav = props.nav,
    aside = props.aside,
    main = props.main,
    children = props.children,
    contentAlignCenter = props.contentAlignCenter,
    gap = props.gap,
    background = props.background,
    noPadding = props.noPadding,
    grid = props.grid,
    isTab = props.isTab,
    title = props.title,
    key = props.key,
    active = props.active,
    presetNav = props.presetNav,
    presetAside = props.presetAside,
    navProps = props.navProps,
    asideProps = props.asideProps,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var newPrefix = isTab ? 'pro-layout-' : prefix;
  var mainCls = (0, _classnames["default"])((_classNames = {}, _classNames[newPrefix + "page-main"] = true, _classNames[newPrefix + "display-grid"] = grid, _classNames));
  var contentCls = (0, _classnames["default"])((_classNames2 = {}, _classNames2[newPrefix + "page-content"] = true, _classNames2[newPrefix + "page-content-center"] = contentAlignCenter, _classNames2[newPrefix + "page-content-nopadding"] = noPadding, _classNames2));
  var contentHelpCls = (0, _classnames["default"])((_classNames3 = {}, _classNames3[newPrefix + "page-bg-" + background] = !!background, _classNames3[newPrefix + "page-min-height-helper"] = true, _classNames3));
  var mainStyle = {
    gridTemplateColumns: "repeat(" + columns + ", minmax(0px, 1fr))",
    gridGap: gap
  };
  var content = /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    className: contentHelpCls
  }, others), /*#__PURE__*/React.createElement("section", {
    className: contentCls
  }, presetNav ? /*#__PURE__*/React.createElement(_nav["default"], navProps, nav) : nav, /*#__PURE__*/React.createElement("section", {
    className: mainCls,
    style: mainStyle
  }, main, children), presetAside ? /*#__PURE__*/React.createElement(_aside["default"], asideProps, aside) : aside));
  if (isTab) {
    return /*#__PURE__*/React.createElement(_tab["default"].Item, {
      title: title,
      key: key,
      active: active
    }, content);
  }
  return content;
};
PageContent.defaultProps = {
  prefix: 'pro-layout-',
  isTab: false
};
var _default = PageContent;
exports["default"] = _default;