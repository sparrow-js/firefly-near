"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CardHeader = void 0;
var _button = _interopRequireDefault(require("@alifd/next/lib/button"));
var _tag = _interopRequireDefault(require("@alifd/next/lib/tag"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _balloon = _interopRequireDefault(require("@alifd/next/lib/balloon"));
var React = _interopRequireWildcard(require("react"));
var _toggleIcon = require("../../../toggle-icon");
var _buttonGroup = require("../button-group");
var _classnames = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Tooltip = _balloon["default"];
function formatActionButtons(actionButtons) {
  if (actionButtons && Array.isArray(actionButtons)) {
    return actionButtons.map(function (item) {
      if (item.label && !item.children) {
        item.children = item.label;
      }
      return item;
    });
  }
  return [];
}
var CardHeader = function CardHeader(_ref) {
  var title = _ref.title,
    description = _ref.description,
    hasCollapse = _ref.hasCollapse,
    actionBar = _ref.actionBar,
    collapsed = _ref.collapsed,
    onCollapse = _ref.onCollapse,
    explanation = _ref.explanation,
    explanationTooltipProps = _ref.explanationTooltipProps,
    hasDivider = _ref.hasDivider,
    tagGroup = _ref.tagGroup,
    actionButtons = _ref.actionButtons,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? true : _ref$text,
    visibleButtonCount = _ref.visibleButtonCount;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames["default"])('pro-layout-card-header', {
      'pro-layout-card-header--collapsed': collapsed,
      'has-description': description
    }),
    onClick: collapsed ? onCollapse : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__hd"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__title"
  }, title), title && explanation && /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__tooltip"
  }, /*#__PURE__*/React.createElement(Tooltip, (0, _extends2["default"])({
    trigger: /*#__PURE__*/React.createElement(_toggleIcon.CustomIcon, {
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
    className: "pro-layout-card-header__ft"
  }, actionBar && /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__action-bar"
  }, actionBar), /*#__PURE__*/React.createElement(_buttonGroup.ButtonGroup, {
    dataSource: formatActionButtons(actionButtons),
    text: text,
    visibleButtonCount: visibleButtonCount
  }), hasCollapse && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "vertical-divider"
  }), /*#__PURE__*/React.createElement(_button["default"], {
    className: (0, _classnames["default"])('pro-layout-card-header__collapse-btn', {
      'pro-layout-card-header__collapse-btn--collapsed': collapsed
    }),
    text: text,
    onClick: onCollapse,
    type: text ? 'primary' : 'normal'
  }, collapsed ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u5C55\u5F00\xA0"), /*#__PURE__*/React.createElement(_toggleIcon.CustomIcon, {
    size: "xs",
    type: "triangle-down"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u6536\u8D77\xA0"), /*#__PURE__*/React.createElement(_toggleIcon.CustomIcon, {
    size: "xs",
    type: "triangle-up"
  })))))), description ? /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__desc"
  }, description) : null, hasDivider && !collapsed && /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames["default"])('pro-layout-card-header__divider')
  }));
};
exports.CardHeader = CardHeader;
CardHeader.defaultProps = {
  onCollapse: function onCollapse() {},
  hasDivider: true,
  tagGroup: []
};
CardHeader.displayName = 'CardHeader';