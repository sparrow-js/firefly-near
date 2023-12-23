"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CardSection = void 0;
var _loading = _interopRequireDefault(require("@alifd/next/lib/loading"));
var _tag = _interopRequireDefault(require("@alifd/next/lib/tag"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _icon = _interopRequireDefault(require("@alifd/next/lib/icon"));
var _balloon = _interopRequireDefault(require("@alifd/next/lib/balloon"));
var React = _interopRequireWildcard(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Tooltip = _balloon["default"].Tooltip;
/**
 * 子卡片
 */
var CardSection = function CardSection(_ref) {
  var _classnames;
  var children = _ref.children,
    title = _ref.title,
    className = _ref.className,
    loading = _ref.loading,
    segmentLine = _ref.segmentLine,
    actionBar = _ref.actionBar,
    explanation = _ref.explanation,
    explanationTooltipProps = _ref.explanationTooltipProps,
    tagGroup = _ref.tagGroup,
    id = _ref.id,
    headerDivider = _ref.headerDivider,
    footerDivider = _ref.footerDivider,
    hasDividerIndent = _ref.hasDividerIndent,
    noBullet = _ref.noBullet;
  // 获取 loading 状态
  var loadingStatus = loading;
  var content = /*#__PURE__*/React.createElement(React.Fragment, null, (title || actionBar) && /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-header"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-header__hd"
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames2["default"])('pro-layout-card-section-header__title', {
      'pro-layout-card-section-header-noBullet': noBullet
    })
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-header__tooltip"
  }, explanation && /*#__PURE__*/React.createElement(Tooltip, (0, _extends2["default"])({
    trigger: /*#__PURE__*/React.createElement(_icon["default"], {
      type: "ic_error2",
      size: "xs"
    })
  }, explanationTooltipProps), explanation)), tagGroup.map(function (item) {
    var label = item;
    var color = 'blue';
    if (typeof item === 'object') {
      label = item.label;
      if (item.color) {
        color = item.color;
      }
    }
    return /*#__PURE__*/React.createElement(_tag["default"], {
      color: color,
      size: "small"
    }, label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-header__hd"
  }, actionBar && /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-header__action-bar"
  }, actionBar))), headerDivider && /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames2["default"])('pro-layout-card-section-header__divider', {
      'pro-layout-section-divider-indent': hasDividerIndent
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-body"
  }, children), footerDivider && /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames2["default"])('pro-layout-card-section-footer__divider', {
      'pro-layout-section-divider-indent': hasDividerIndent
    })
  }));
  // 一般情况
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: (0, _classnames2["default"])('pro-layout-card-section', (_classnames = {
      'pro-layout-card-section--segment-line': segmentLine
    }, _classnames[className] = className, _classnames))
  }, loadingStatus ? /*#__PURE__*/React.createElement(_loading["default"], {
    inline: false,
    visible: loadingStatus,
    size: "medium"
  }, content) : content);
};
exports.CardSection = CardSection;
CardSection.displayName = 'CardSection';
CardSection.defaultProps = {
  title: null,
  segmentLine: false,
  loading: false,
  tagGroup: [],
  noBullet: false
};