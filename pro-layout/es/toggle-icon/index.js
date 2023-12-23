import _Balloon from "@alifd/next/es/balloon";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _Icon from "@alifd/next/es/icon";
var _excluded = ["type"],
  _excluded2 = ["className"],
  _excluded3 = ["title", "active", "type", "size", "className"];
import * as React from 'react';
import cns from 'classnames';
var RemoteIcon = _Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2535522_4oyyibdwj5v.js'
});
export var CustomIcon = function CustomIcon(props) {
  var type = props.type,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/React.createElement(RemoteIcon, _extends({
    type: "icon" + type
  }, otherProps));
};
var Tooltip = _Balloon.Tooltip;
/**
 * icon组
 */
export var ToggleIconGroup = function ToggleIconGroup(_ref) {
  var className = _ref.className,
    props = _objectWithoutPropertiesLoose(_ref, _excluded2);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cns('pro-layout-toggle-icon-group', className)
  }, props));
};
export var ToggleIcon = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
  var title = _ref2.title,
    active = _ref2.active,
    type = _ref2.type,
    size = _ref2.size,
    className = _ref2.className,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded3);
  var trigger = /*#__PURE__*/React.createElement("span", _extends({
    ref: ref
  }, props, {
    className: cns('pro-layout-toggle-icon', {
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
ToggleIcon.defaultProps = {
  size: 'small'
};