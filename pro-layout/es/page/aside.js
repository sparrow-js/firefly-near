import _extends from "@babel/runtime/helpers/extends";
import * as React from 'react';
var PageAside = function PageAside(props) {
  var prefix = props.prefix,
    width = props.width,
    children = props.children,
    style = props.style;
  var asideCls = prefix + "page-aside";
  var asideStyle = _extends({
    width: typeof width === 'number' ? width + "px" : width
  }, style);
  return children ? /*#__PURE__*/React.createElement("aside", {
    className: asideCls,
    style: asideStyle
  }, children) : null;
};
PageAside.defaultProps = {
  prefix: 'pro-layout-'
};
export default PageAside;