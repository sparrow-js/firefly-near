import _Box from "@alifd/next/es/box";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "className", "children", "rowSpan", "style", "colSpan", "childMinWidth"];
import * as React from 'react';
import classNames from 'classnames';
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
    others = _objectWithoutPropertiesLoose(props, _excluded);
  var cls = classNames(className, (_classNames = {}, _classNames[prefix + "block-cell-group"] = true, _classNames));
  var newStyle = _extends({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, others, {
    style: newStyle,
    ref: ref
  }), /*#__PURE__*/React.createElement(_Box, {
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
export default RefBlockCellGroup;