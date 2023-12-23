import _extends from "@babel/runtime/helpers/extends";
import * as React from 'react';
var PageNav = function PageNav(props) {
  var prefix = props.prefix,
    children = props.children,
    width = props.width,
    style = props.style;
  var navCls = prefix + "page-nav";
  var navStyle = _extends({
    width: typeof width === 'number' ? width + "px" : width
  }, style);
  return children ? /*#__PURE__*/React.createElement("aside", {
    className: navCls,
    style: navStyle
  }, children) : null;
};
PageNav.defaultProps = {
  prefix: 'pro-layout-'
};
export default PageNav;