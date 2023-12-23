import * as React from 'react';
var ProLayout = function ProLayout(props) {
  var className = props.className,
    style = props.style;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, "test");
};
ProLayout.displayName = 'ProLayout';
export default ProLayout;