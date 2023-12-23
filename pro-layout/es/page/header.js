import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "style", "children", "background", "headerDivider"];
import * as React from 'react';
import classNames from 'classnames';
var Header = function Header(_ref) {
  var _classNames;
  var _ref$prefix = _ref.prefix,
    prefix = _ref$prefix === void 0 ? 'pro-layout-' : _ref$prefix,
    style = _ref.style,
    children = _ref.children,
    background = _ref.background,
    headerDivider = _ref.headerDivider,
    others = _objectWithoutPropertiesLoose(_ref, _excluded);
  var headerCls = classNames((_classNames = {}, _classNames[prefix + "page-pro-header"] = true, _classNames[prefix + "page-pro-header-divider"] = headerDivider, _classNames[prefix + "page-bg-" + background] = !!background, _classNames));
  return children ? /*#__PURE__*/React.createElement("header", _extends({
    className: headerCls,
    style: style
  }, others), /*#__PURE__*/React.createElement("div", {
    className: prefix + "page-pro-header-content"
  }, children)) : null;
};
export default Header;