"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
var _rowColContainer = require("./row-col-container");
var _classnames = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Col = function Col(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    className = props.className,
    children = props.children,
    colSpan = props.colSpan,
    colWidth = props.colWidth,
    minHeight = props.minHeight,
    justifyContent = props.justifyContent;
  var cls = (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefix + "col"] = true, _classNames));
  var _ref = (0, React.useContext)(_rowColContainer.Context) || {},
    colGap = _ref.colGap;
  // 优先colWidth指定宽度
  var style = {
    flex: colWidth ? "0 0 " + colWidth : colSpan + " " + colSpan + " 0",
    minHeight: minHeight,
    justifyContent: justifyContent,
    marginLeft: typeof colGap === 'number' ? colGap + "px" : colGap
  };
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: style,
    ref: ref
  }, children);
};
var RefCol = /*#__PURE__*/React.forwardRef(Col);
RefCol._typeMark = 'autolayout_col';
RefCol.defaultProps = {
  prefix: 'pro-layout-',
  colSpan: 1
};
var _default = RefCol;
exports["default"] = _default;