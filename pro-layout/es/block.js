import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "dataSource", "title", "strict", "className", "mode", "background", "noPadding", "noBorder", "children", "style", "rowSpan", "colSpan", "childTotalColumns", "extra", "colGap", "rowGap"];
import * as React from 'react';
import classNames from 'classnames';
import BlockCell, { Divider } from './block-cell';
import P from './p';
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
    others = _objectWithoutPropertiesLoose(props, _excluded);
  var cls = classNames(className, (_classNames = {}, _classNames[prefix + "block"] = true, _classNames[prefix + "block-" + mode] = mode, _classNames[prefix + "block-" + background] = !!background, _classNames[prefix + "block-no-padding"] = noPadding, _classNames[prefix + "block-no-border"] = noBorder, _classNames));
  var newStyle = _extends({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    style: newStyle
  }, others, {
    ref: ref
  }), title ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: prefix + "block-header"
  }, /*#__PURE__*/React.createElement(P, {
    className: prefix + "block-title",
    type: "h5",
    align: "space-between"
  }, /*#__PURE__*/React.createElement(P.Cell, null, title), extra && /*#__PURE__*/React.createElement(P.Cell, {
    type: "body2"
  }, extra))), mode === 'inset' && /*#__PURE__*/React.createElement(Divider, null)) : null, /*#__PURE__*/React.createElement("div", {
    className: prefix + "block-body",
    style: bodyStyle
  }, dataSource && dataSource.map(function (item, index) {
    return /*#__PURE__*/React.createElement(BlockCell, _extends({
      key: index
    }, item));
  }), !strict && proCodeMode ? /*#__PURE__*/React.createElement(BlockCell, null, children) : children));
};
var RefBlock = /*#__PURE__*/React.forwardRef(Block);
RefBlock.Cell = BlockCell;
RefBlock.Divider = Divider;
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
export default RefBlock;