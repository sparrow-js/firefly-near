"use strict";

exports.__esModule = true;
exports.CardCollapse = void 0;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CardCollapse = function CardCollapse(_ref) {
  var collapsed = _ref.collapsed,
    children = _ref.children;
  var ref = React.useRef();
  var contentRef = React.useRef();
  (0, React.useLayoutEffect)(function () {
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
exports.CardCollapse = CardCollapse;
CardCollapse.displayName = 'CardCollapse';