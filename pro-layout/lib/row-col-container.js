"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = exports.Context = void 0;
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Context = /*#__PURE__*/React.createContext(null);
exports.Context = Context;
var RowColContainer = function RowColContainer(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    className = props.className,
    children = props.children,
    rowGap = props.rowGap,
    colGap = props.colGap;
  var cls = (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefix + "row-col-container"] = true, _classNames));
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    ref: ref
  }, /*#__PURE__*/React.createElement(Context.Provider, {
    value: {
      rowGap: rowGap,
      colGap: colGap
    }
  }, children));
};
var RefRowColContainer = /*#__PURE__*/React.forwardRef(RowColContainer);
RefRowColContainer._typeMark = 'autolayout_rowcolcontainer';
RefRowColContainer.defaultProps = {
  prefix: 'pro-layout-',
  rowGap: 0,
  colGap: 0
};
var _default = RefRowColContainer;
exports["default"] = _default;