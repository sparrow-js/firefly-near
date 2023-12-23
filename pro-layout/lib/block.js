"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _blockCell = _interopRequireWildcard(require("./block-cell"));
var _p = _interopRequireDefault(require("./p"));
var _excluded = ["prefix", "dataSource", "title", "strict", "className", "mode", "background", "noPadding", "noBorder", "children", "style", "rowSpan", "colSpan", "childTotalColumns", "extra", "colGap", "rowGap"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Block = function Block(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    dataSource = props.dataSource,
    title = props.title,
    strict = props.strict,
    className = props.className,
    mode = props.mode,
    background = props.background,
    noPadding = props.noPadding,
    noBorder = props.noBorder,
    children = props.children,
    style = props.style,
    rowSpan = props.rowSpan,
    colSpan = props.colSpan,
    childTotalColumns = props.childTotalColumns,
    extra = props.extra,
    colGap = props.colGap,
    rowGap = props.rowGap,
    others = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  var cls = (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefix + "block"] = true, _classNames[prefix + "block-" + mode] = mode, _classNames[prefix + "block-" + background] = !!background, _classNames[prefix + "block-no-padding"] = noPadding, _classNames[prefix + "block-no-border"] = noBorder, _classNames));
  var newStyle = (0, _extends2["default"])({
    gridRowEnd: "span " + rowSpan,
    gridColumnEnd: "span " + colSpan
  }, style);
  var bodyStyle = {
    gridTemplateColumns: typeof childTotalColumns === 'number' ? "repeat(" + childTotalColumns + ", minmax(0px, " + (100 / childTotalColumns).toFixed(5) + "%)" : childTotalColumns,
    gridColumnGap: typeof colGap === 'number' ? colGap + "px" : colGap,
    gridRowGap: typeof rowGap === 'number' ? rowGap + "px" : rowGap
  };
  var proCodeMode = false;
  React.Children.map(children, function (item) {
    if (!(item && item.type && item.type._typeMark === 'block.cell')) {
      proCodeMode = !!((!dataSource || !dataSource.length) && children);
    }
  });
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    className: cls,
    style: newStyle
  }, others, {
    ref: ref
  }), title ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: prefix + "block-header"
  }, /*#__PURE__*/React.createElement(_p["default"], {
    className: prefix + "block-title",
    type: "h5",
    align: "space-between"
  }, /*#__PURE__*/React.createElement(_p["default"].Cell, null, title), extra && /*#__PURE__*/React.createElement(_p["default"].Cell, {
    type: "body2"
  }, extra))), mode === 'inset' && /*#__PURE__*/React.createElement(_blockCell.Divider, null)) : null, /*#__PURE__*/React.createElement("div", {
    className: prefix + "block-body",
    style: bodyStyle
  }, dataSource && dataSource.map(function (item, index) {
    return /*#__PURE__*/React.createElement(_blockCell["default"], (0, _extends2["default"])({
      key: index
    }, item));
  }), !strict && proCodeMode ? /*#__PURE__*/React.createElement(_blockCell["default"], null, children) : children));
};
var RefBlock = /*#__PURE__*/React.forwardRef(Block);
RefBlock.Cell = _blockCell["default"];
RefBlock.Divider = _blockCell.Divider;
RefBlock._typeMark = 'fusion.block';
RefBlock.defaultProps = {
  prefix: 'pro-layout-',
  childTotalColumns: 1,
  colSpan: 12,
  rowSpan: 1,
  noPadding: false,
  noBorder: false,
  mode: 'inset'
};
var _default = RefBlock;
exports["default"] = _default;