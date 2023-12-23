"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _box = _interopRequireDefault(require("@alifd/next/lib/box"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["prefix", "className", "children", "rowSpan", "style", "colSpan", "childMinWidth"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var BlockCellGroup = function BlockCellGroup(props, ref) {
  var _classNames;
  var _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? 'pro-layout-' : _props$prefix,
    className = props.className,
    children = props.children,
    rowSpan = props.rowSpan,
    style = props.style,
    colSpan = props.colSpan,
    childMinWidth = props.childMinWidth,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var cls = (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefix + "block-cell-group"] = true, _classNames));
  var newStyle = (0, _extends2["default"])({
    gridRowEnd: "span " + rowSpan,
    gridColumnEnd: "span " + colSpan
  }, style);
  var newChildren = React.Children.map(children, function (child) {
    return /*#__PURE__*/React.cloneElement(child, {
      style: {
        // ...(child && child.props && child.props.style),
        minWidth: childMinWidth,
        flexGrow: 1
      }
    });
  });
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    className: cls
  }, others, {
    style: newStyle,
    ref: ref
  }), /*#__PURE__*/React.createElement(_box["default"], {
    wrap: true,
    direction: "row",
    spacing: [20]
  }, newChildren));
};
var RefBlockCellGroup = /*#__PURE__*/React.forwardRef(BlockCellGroup);
RefBlockCellGroup._typeMark = 'block.cell.group';
RefBlockCellGroup.defaultProps = {
  prefix: 'pro-layout-',
  colSpan: 1,
  rowSpan: 1
};
var _default = RefBlockCellGroup;
exports["default"] = _default;