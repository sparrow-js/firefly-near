import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "className", "children", "style", "mode"];
import * as React from 'react';
import classNames from 'classnames';
var BlockCellItem = function BlockCellItem(props, ref) {
  var _classNames;
  var _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? 'pro-layout-' : _props$prefix,
    className = props.className,
    children = props.children,
    style = props.style,
    mode = props.mode,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  var cls = classNames(className, (_classNames = {}, _classNames[prefix + "block-cell-item"] = true, _classNames[prefix + "block-cell-item-" + mode] = mode, _classNames));
  var newStyle = _extends({}, style);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, others, {
    style: newStyle,
    ref: ref
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix + "block-cell-item-body"
  }, children));
};
var RefBlockCellItem = /*#__PURE__*/React.forwardRef(BlockCellItem);
RefBlockCellItem._typeMark = 'block.cell.item';
RefBlockCellItem.defaultProps = {
  prefix: 'pro-layout-'
};
export default RefBlockCellItem;