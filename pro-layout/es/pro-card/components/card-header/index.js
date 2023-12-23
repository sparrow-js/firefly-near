import _Button from "@alifd/next/es/button";
import _Tag from "@alifd/next/es/tag";
import _extends from "@babel/runtime/helpers/extends";
import _Balloon from "@alifd/next/es/balloon";
import * as React from 'react';
import { CustomIcon } from '../../../toggle-icon';
import { ButtonGroup } from '../button-group';
import classnames from 'classnames';
var Tooltip = _Balloon;
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
export var CardHeader = function CardHeader(_ref) {
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
    className: classnames('pro-layout-card-header', {
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
  }, /*#__PURE__*/React.createElement(Tooltip, _extends({
    trigger: /*#__PURE__*/React.createElement(CustomIcon, {
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
    return /*#__PURE__*/React.createElement(_Tag, {
      color: color,
      size: "small"
    }, label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__ft"
  }, actionBar && /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__action-bar"
  }, actionBar), /*#__PURE__*/React.createElement(ButtonGroup, {
    dataSource: formatActionButtons(actionButtons),
    text: text,
    visibleButtonCount: visibleButtonCount
  }), hasCollapse && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "vertical-divider"
  }), /*#__PURE__*/React.createElement(_Button, {
    className: classnames('pro-layout-card-header__collapse-btn', {
      'pro-layout-card-header__collapse-btn--collapsed': collapsed
    }),
    text: text,
    onClick: onCollapse,
    type: text ? 'primary' : 'normal'
  }, collapsed ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u5C55\u5F00\xA0"), /*#__PURE__*/React.createElement(CustomIcon, {
    size: "xs",
    type: "triangle-down"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u6536\u8D77\xA0"), /*#__PURE__*/React.createElement(CustomIcon, {
    size: "xs",
    type: "triangle-up"
  })))))), description ? /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-header__desc"
  }, description) : null, hasDivider && !collapsed && /*#__PURE__*/React.createElement("div", {
    className: classnames('pro-layout-card-header__divider')
  }));
};
CardHeader.defaultProps = {
  onCollapse: function onCollapse() {},
  hasDivider: true,
  tagGroup: []
};
CardHeader.displayName = 'CardHeader';