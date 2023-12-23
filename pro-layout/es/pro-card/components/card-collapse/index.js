import * as React from 'react';
import { useLayoutEffect } from 'react';
export var CardCollapse = function CardCollapse(_ref) {
  var collapsed = _ref.collapsed,
    children = _ref.children;
  var ref = React.useRef();
  var contentRef = React.useRef();
  useLayoutEffect(function () {
    if (!ref.current) {
      return function () {};
    }
    // 折叠
    if (collapsed) {
      // 解决折叠第一次也会进行动画问题
      if (ref.current.style.height === 'auto') {
        ref.current.style.height = contentRef.current.offsetHeight + "px";
      }
      var _index = setTimeout(function () {
        ref.current.style.height = '0px';
      }, 0);
      return function () {
        return clearTimeout(_index);
      };
    }
    // 当前已经展开，不进行动画
    if (ref.current.style.height === 'auto') {
      return function () {};
    }
    // 展开
    ref.current.style.height = contentRef.current.offsetHeight + "px";
    var index = setTimeout(function () {
      ref.current.style.height = 'auto';
    }, 400);
    return function () {
      return clearTimeout(index);
    };
  }, [collapsed]);
  return /*#__PURE__*/React.createElement("div", {
    className: "pro-layout-card-collapse",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    ref: contentRef
  }, children));
};
CardCollapse.displayName = 'CardCollapse';