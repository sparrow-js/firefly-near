import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "direction"],
  _excluded2 = ["prefix", "className", "children", "content", "rowSpan", "style", "colSpan", "title", "extra", "mode", "childMode", "childWidth", "childTotalColumns"];
import * as React from 'react';
import classNames from 'classnames';
import ProCard from './pro-card';
import P from './p';
var Divider = function Divider(props, ref) {
  var _classNames;
  var _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? 'pro-layout-' : _props$prefix,
    direction = props.direction,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  var cls = classNames((_classNames = {}, _classNames[prefix + "block-divider"] = true, _classNames[prefix + "block-divider-ver"] = direction === 'ver', _classNames));
  return /*#__PURE__*/React.createElement("div", _extends({}, others, {
    className: cls,
    ref: ref
  }));
};
var RefDivider = /*#__PURE__*/React.forwardRef(Divider);
export { RefDivider as Divider };
var BlockCell = function BlockCell(props, ref) {
  var _classNames2, _classNames3;
  var _props$prefix2 = props.prefix,
    prefix = _props$prefix2 === void 0 ? 'pro-layout-' : _props$prefix2,
    className = props.className,
    children = props.children,
    content = props.content,
    rowSpan = props.rowSpan,
    style = props.style,
    colSpan = props.colSpan,
    title = props.title,
    extra = props.extra,
    mode = props.mode,
    childMode = props.childMode,
    childWidth = props.childWidth,
    childTotalColumns = props.childTotalColumns,
    others = _objectWithoutPropertiesLoose(props, _excluded2);
  var cls = classNames(className, (_classNames2 = {}, _classNames2[prefix + "block-cell"] = true, _classNames2[prefix + "block-cell-" + mode] = mode, _classNames2));
  var bodyCls = classNames((_classNames3 = {}, _classNames3[prefix + "block-cell-body"] = true, _classNames3[prefix + "block-cell-" + childMode] = childMode, _classNames3));
  var newStyle = _extends({
    gridRowEnd: "span " + rowSpan,
    gridColumnEnd: "span " + colSpan
  }, style);
  var width = typeof childWidth === 'string' ? childWidth : childWidth + "px";
  var gridTemplateColumns = childTotalColumns;
  if (childMode === 'flow') {
    gridTemplateColumns = "repeat(auto-fit, minmax(" + width + ", 1fr))";
  } else if (typeof childTotalColumns === 'number') {
    gridTemplateColumns = "repeat(" + childTotalColumns + ", minmax(0px, " + (100 / childTotalColumns).toFixed(5) + "%)";
  }
  var bodyStyle = {
    gridTemplateColumns: gridTemplateColumns
  };
  var proCardContent = /*#__PURE__*/React.createElement(ProCard, _extends({
    actionBar: extra
  }, props), content || children);
  if (mode === 'procard') {
    return /*#__PURE__*/React.createElement("div", _extends({
      className: cls
    }, others, {
      style: newStyle,
      ref: ref
    }), proCardContent);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, others, {
    style: newStyle,
    ref: ref
  }), title ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(P, {
    className: prefix + "block-title",
    type: "h6",
    align: "space-between"
  }, /*#__PURE__*/React.createElement(P.Cell, null, title), extra && /*#__PURE__*/React.createElement(P.Cell, {
    type: "body2"
  }, extra))) : null, /*#__PURE__*/React.createElement("div", {
    className: bodyCls,
    style: bodyStyle
  }, content || children));
};
var RefBlockCell = /*#__PURE__*/React.forwardRef(BlockCell);
RefBlockCell._typeMark = 'block.cell';
RefBlockCell.defaultProps = {
  prefix: 'pro-layout-',
  colSpan: 1,
  rowSpan: 1
};
export default RefBlockCell;