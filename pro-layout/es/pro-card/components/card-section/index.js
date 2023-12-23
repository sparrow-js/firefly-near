import _Loading from "@alifd/next/es/loading";
import _Tag from "@alifd/next/es/tag";
import _extends from "@babel/runtime/helpers/extends";
import _Icon from "@alifd/next/es/icon";
import _Balloon from "@alifd/next/es/balloon";
import * as React from 'react';
import classnames from 'classnames';
var Tooltip = _Balloon.Tooltip;
/**
 * 子卡片
 */
export var CardSection = function CardSection(_ref) {
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
    className: classnames('pro-layout-card-section-header__title', {
      'pro-layout-card-section-header-noBullet': noBullet
    })
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-header__tooltip"
  }, explanation && /*#__PURE__*/React.createElement(Tooltip, _extends({
    trigger: /*#__PURE__*/React.createElement(_Icon, {
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
    className: "pro-layout-card-section-header__hd"
  }, actionBar && /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-header__action-bar"
  }, actionBar))), headerDivider && /*#__PURE__*/React.createElement("div", {
    className: classnames('pro-layout-card-section-header__divider', {
      'pro-layout-section-divider-indent': hasDividerIndent
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-section-body"
  }, children), footerDivider && /*#__PURE__*/React.createElement("div", {
    className: classnames('pro-layout-card-section-footer__divider', {
      'pro-layout-section-divider-indent': hasDividerIndent
    })
  }));
  // 一般情况
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: classnames('pro-layout-card-section', (_classnames = {
      'pro-layout-card-section--segment-line': segmentLine
    }, _classnames[className] = className, _classnames))
  }, loadingStatus ? /*#__PURE__*/React.createElement(_Loading, {
    inline: false,
    visible: loadingStatus,
    size: "medium"
  }, content) : content);
};
CardSection.displayName = 'CardSection';
CardSection.defaultProps = {
  title: null,
  segmentLine: false,
  loading: false,
  tagGroup: [],
  noBullet: false
};