import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
var Footer = function Footer(_ref) {
  var _classNames;
  var _ref$prefix = _ref.prefix,
    prefix = _ref$prefix === void 0 ? 'pro-layout-' : _ref$prefix,
    style = _ref.style,
    fixed = _ref.fixed,
    children = _ref.children;
  var footerRef = useRef(null);
  var footerCls = classNames((_classNames = {}, _classNames[prefix + "page-footer"] = true, _classNames[prefix + "page-fixed"] = fixed, _classNames));
  return children ? /*#__PURE__*/React.createElement("footer", {
    ref: footerRef,
    className: footerCls,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: prefix + "page-footer-content"
  }, children)) : null;
};
export default Footer;