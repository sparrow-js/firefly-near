"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _tab = _interopRequireDefault(require("@alifd/next/lib/tab"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));
var _footer = _interopRequireDefault(require("./footer"));
exports.Footer = _footer["default"];
var _header = _interopRequireDefault(require("./header"));
exports.Header = _header["default"];
var _aside = _interopRequireDefault(require("./aside"));
exports.PageAside = _aside["default"];
var _nav = _interopRequireDefault(require("./nav"));
exports.PageNav = _nav["default"];
var _content = _interopRequireDefault(require("./content"));
exports.PageContent = _content["default"];
var _util = require("../util");
var _excluded = ["prefix", "className", "contentProps", "gap", "style", "main", "children", "contentAlignCenter", "minHeight", "background", "columns", "grid", "noContentPadding", "isTab", "tabProps", "header", "footer", "nav", "aside", "presetNav", "presetAside", "presetHeader", "presetFooter", "navProps", "headerProps", "footerProps", "asideProps"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * TODO: Page.Header Page.Content Page.Footer
 * Content 的高度默认占据 一个屏幕的剩余空间，即使里面内容不足也应该背景色撑满
 * @param props
 */

var Page = function Page(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    className = props.className,
    _props$contentProps = props.contentProps,
    contentProps = _props$contentProps === void 0 ? {} : _props$contentProps,
    gap = props.gap,
    style = props.style,
    main = props.main,
    children = props.children,
    contentAlignCenter = props.contentAlignCenter,
    minHeight = props.minHeight,
    background = props.background,
    _props$columns = props.columns,
    columns = _props$columns === void 0 ? 1 : _props$columns,
    grid = props.grid,
    noContentPadding = props.noContentPadding,
    isTab = props.isTab,
    tabProps = props.tabProps,
    header = props.header,
    footer = props.footer,
    nav = props.nav,
    aside = props.aside,
    presetNav = props.presetNav,
    presetAside = props.presetAside,
    presetHeader = props.presetHeader,
    presetFooter = props.presetFooter,
    _props$navProps = props.navProps,
    navProps = _props$navProps === void 0 ? {} : _props$navProps,
    _props$headerProps = props.headerProps,
    headerProps = _props$headerProps === void 0 ? {} : _props$headerProps,
    _props$footerProps = props.footerProps,
    footerProps = _props$footerProps === void 0 ? {} : _props$footerProps,
    _props$asideProps = props.asideProps,
    asideProps = _props$asideProps === void 0 ? {} : _props$asideProps,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var _footerProps$fixed = footerProps.fixed,
    footerFixed = _footerProps$fixed === void 0 ? false : _footerProps$fixed;
  var pageCls = (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefix + "page"] = true, _classNames[prefix + "page-centermode"] = contentAlignCenter, _classNames[prefix + "page-bg-" + background] = !!background, _classNames[prefix + "page-content-tab"] = !!isTab, _classNames));
  var pageStyle = (0, _extends2["default"])({}, style, {
    minHeight: minHeight
  });
  var useCombinedRefs = function useCombinedRefs() {
    for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
      refs[_key] = arguments[_key];
    }
    var targetRef = React.useRef();
    React.useEffect(function () {
      refs.forEach(function (r) {
        if (!r) return;
        if (typeof r === 'function') {
          r(targetRef.current);
        } else {
          r.current = targetRef.current;
        }
      });
    }, [refs]);
    return targetRef;
  };
  var footerRef = (0, React.useRef)(null);
  var pageRef = (0, React.useRef)(null);
  var combinedRef = useCombinedRefs(ref, pageRef);
  React.useLayoutEffect(function () {
    var rect = combinedRef.current.getBoundingClientRect();
    console.log('Input dimensions:', rect.width, rect.height);
  }, [ref]);
  var newFooter = presetFooter ? /*#__PURE__*/React.createElement(_footer["default"], footerProps, footer) : footer;
  var pageSizeObsr = new _resizeObserverPolyfill["default"](function () {
    if (!newFooter) {
      return;
    }
    var pageDom = pageRef.current;
    var footerDom = footerRef.current;
    var width = pageDom && pageDom.getBoundingClientRect().width || 0;
    var footerHeight = footerDom && footerDom.getBoundingClientRect().height || 0;
    (0, _util.setStyle)(footerDom, 'width', width);
    if (footerFixed) {
      (0, _util.setStyle)(pageDom, 'paddingBottom', footerHeight);
    } else {
      (0, _util.setStyle)(pageDom, 'paddingBottom', 0);
    }
  });
  (0, React.useEffect)(function () {
    pageSizeObsr.observe(pageRef.current);
    return function () {
      pageSizeObsr.unobserve(pageRef.current);
    };
  }, [footerFixed, newFooter]);
  var panelDefault = /*#__PURE__*/React.createElement(_content["default"], (0, _extends2["default"])({
    nav: nav,
    aside: aside,
    columns: columns,
    gap: gap,
    grid: grid,
    presetNav: presetNav,
    presetAside: presetAside,
    navProps: navProps,
    asideProps: asideProps,
    isTab: false,
    noPadding: noContentPadding,
    contentAlignCenter: contentAlignCenter
  }, contentProps), children);
  var content = isTab ? /*#__PURE__*/React.createElement(_tab["default"], (0, _extends2["default"])({}, tabProps, {
    navClassName: "pro-layout-page-tab"
  }), children) : panelDefault;
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    ref: combinedRef,
    className: pageCls,
    style: pageStyle
  }, others), presetHeader ? /*#__PURE__*/React.createElement(_header["default"], headerProps, header) : header, content, newFooter);
};
var RefPage;
if (React.forwardRef) {
  RefPage = /*#__PURE__*/React.forwardRef(Page);
  RefPage.displayName = 'Page';
} else {
  var PageWrapper = /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(PageWrapper, _React$Component);
    function PageWrapper() {
      var _this;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.state = {};
      return _this;
    }
    var _proto = PageWrapper.prototype;
    _proto.render = function render() {
      return /*#__PURE__*/React.createElement(Page, this.props);
    };
    return PageWrapper;
  }(React.Component);
  RefPage = PageWrapper;
}

// es default export should use const instead of let
var ExportPage = RefPage;
ExportPage.defaultProps = {
  prefix: 'pro-layout-',
  presetHeader: false,
  presetFooter: false,
  grid: false
};
var _default = ExportPage;
exports["default"] = _default;