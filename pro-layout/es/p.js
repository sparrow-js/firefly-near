import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _objectDestructuringEmpty from "@babel/runtime/helpers/objectDestructuringEmpty";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "children", "width", "direction", "align", "alignSelf", "verAlign", "className", "type"],
  _excluded2 = ["prefix", "children", "className", "wrap", "type", "textSpacing", "flex"];
import * as React from 'react';
import classNames from 'classnames';
import Text from './text';
import { textTypeMap, verMap, alignMapO2N, verAlignMapO2N } from './util';
/**
 * P 的分组
 * @param props
 */
export var Cell = function Cell(props, ref) {
  var _classNames;
  var _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? 'pro-layout-' : _props$prefix,
    children = props.children,
    width = props.width,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? 'hoz' : _props$direction,
    _props$align = props.align,
    align = _props$align === void 0 ? 'inherit' : _props$align,
    _props$alignSelf = props.alignSelf,
    alignSelf = _props$alignSelf === void 0 ? 'inherit' : _props$alignSelf,
    _props$verAlign = props.verAlign,
    verAlign = _props$verAlign === void 0 ? 'inherit' : _props$verAlign,
    className = props.className,
    _props$type = props.type,
    type = _props$type === void 0 ? 'body2' : _props$type,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  var newType = textTypeMap[type] || type;
  // Cell 自动判断 Text
  var newChildren = React.Children.map(children, function (child) {
    if (typeof child === 'string') {
      if (!child.trim()) return null;
      return /*#__PURE__*/React.createElement(Text, {}, child);
    }
    return child;
  });
  var cls = classNames(className, (_classNames = {}, _classNames[prefix + "p-cell"] = true, _classNames[prefix + "p-cell-" + newType] = newType, _classNames[prefix + "p-cell-" + direction] = direction, _classNames[prefix + "p-cell-align-" + align] = align, _classNames[prefix + "p-cell-veralign-" + verAlign] = verAlign, _classNames[prefix + "p-block"] = newChildren && newChildren.length < 2, _classNames));
  var style = _extends({
    // flexDirection: direction === 'ver' ? 'column' : undefined,
    // alignItems: align === 'start' ? 'flex-start'
    //   : align === 'end' ?  'flex-end'
    //   : align === 'center' ? 'center'
    //   : align,
    width: width,
    alignSelf: verMap(alignSelf),
    justifyContent: 'center'
  }, props.style);
  return /*#__PURE__*/React.createElement("div", _extends({}, others, {
    className: cls,
    style: style,
    ref: ref
  }), newChildren);
};
/**
 * P 掌管一行元素的上下间距
 * 特性:
 * - P + P 相邻会呈现上下间距；上下间距有3个size，如果发生>body-2 就用body-2、< caption 就用cation; P 作为第一个元素会去除 margin-top，P 作为最后一个元素会去除 margin-bottom
 * - P>* 的最后一个子元素去除 margin-right; p>Text 没有上下间距(文字比较特殊)
 * - P 下直接文字会自动用 Text 包裹
 */
var Paragraph = function Paragraph(props, ref) {
  var _classNames2;
  var _props$prefix2 = props.prefix,
    prefix = _props$prefix2 === void 0 ? 'pro-layout-' : _props$prefix2,
    children = props.children,
    className = props.className,
    wrap = props.wrap,
    _props$type2 = props.type,
    type = _props$type2 === void 0 ? 'body2' : _props$type2,
    textSpacing = props.textSpacing,
    flex = props.flex,
    rest = _objectWithoutPropertiesLoose(props, _excluded2);
  var newType = textTypeMap[type] || type;
  var _rest$verAlign = rest.verAlign,
    verAlign = _rest$verAlign === void 0 ? 'baseline' : _rest$verAlign,
    align = rest.align,
    full = rest.full;
  var others = _extends({}, (_objectDestructuringEmpty(rest), rest));
  var childrenHasCell = false;

  // 兼容老逻辑
  if (align === 'full') {
    full = true;
  }
  align = alignMapO2N(align);
  verAlign = verAlignMapO2N(verAlign);

  // // Cell 自动加 type
  // const newChildren = React.Children.map(children, (child: React.ReactElement) => {
  //   if (child && child.type && child.type === Cell) {
  //     return React.cloneElement(child, { type: child.props.type || type });
  //   }
  //   // 要保留child是否为string的判断，否则用起来会不好用，可以看下 text.md 这个demo，P里面有大量的文字，不想每次都要包裹Text
  //   // 解决<P>{a}{b}{c}</P> 模式下，文字有右间距的问题
  //   // - 考虑过用纯css，给.next-text 默认设置 左右margin 为0，会影响 【文字 + Button】的组合
  //   // - 还是从js角度解决，如果当前元素跟上一个元素都是string，那么拼接到一起，公用一个Text包裹起来
  //   else if (typeof child === 'string') {
  //     return React.createElement(Text, {}, child);
  //   }

  //   return child;
  // });

  var newChildren = [];
  var lastStringIndex = -1;
  var lastString = '';
  var childrenLen = React.Children.count(children) | 0;
  var setAndClear = function setAndClear(string) {
    lastString && newChildren.push( /*#__PURE__*/React.createElement(Text, {}, string));
    lastStringIndex = -1;
    lastString = '';
  };
  React.Children.map(children, function (child, index) {
    if (typeof child === 'string') {
      if (lastStringIndex + 1 === index) {
        lastStringIndex += 1;
        lastString += child;
      } else {
        lastStringIndex = index;
        lastString = child;
      }

      // 如果是最后一个
      if (index === childrenLen - 1) {
        setAndClear(lastString);
      }
    } else {
      // 处理之前
      setAndClear(lastString);

      // 处理当前
      if (child && child.type && child.type._typeMark === 'p_cell') {
        childrenHasCell = true;
        newChildren.push( /*#__PURE__*/React.cloneElement(child, {
          type: child.props.type || type
        }));
      } else {
        newChildren.push(child);
      }
    }
  });

  // const newVerAlign = verAlign === 'flex-start' ? 'top': verAlign === 'flex-end' ? 'bottom' : verAlign;

  var cls = classNames(className, (_classNames2 = {}, _classNames2[prefix + "p"] = true, _classNames2[prefix + "p-" + newType] = newType, _classNames2[prefix + "p-align-" + align] = align, _classNames2[prefix + "p-veralign-" + verAlign] = verAlign, _classNames2[prefix + "p-no-text-space "] = !textSpacing, _classNames2[prefix + "p-flex"] = childrenHasCell || flex, _classNames2[prefix + "p-align-full"] = full, _classNames2[prefix + "p-block"] = newChildren && newChildren.length < 2, _classNames2));
  var style = _extends({
    // ...fullStyle,
    flexWrap: wrap ? 'wrap' : undefined
  }, props.style);
  return /*#__PURE__*/React.createElement("div", _extends({}, others, {
    className: cls,
    style: style,
    ref: ref
  }), newChildren);
};
var RefParagraph;
if (React.forwardRef) {
  RefParagraph = /*#__PURE__*/React.forwardRef(Paragraph);
  RefParagraph.displayName = 'Paragraph';
} else {
  var ParagraphWrapper = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(ParagraphWrapper, _React$Component);
    function ParagraphWrapper() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.state = {};
      return _this;
    }
    var _proto = ParagraphWrapper.prototype;
    _proto.render = function render() {
      return /*#__PURE__*/React.createElement(Paragraph, this.props);
    };
    return ParagraphWrapper;
  }(React.Component);
  RefParagraph = ParagraphWrapper;
}
RefParagraph.Cell = /*#__PURE__*/React.forwardRef(Cell);
RefParagraph.Cell._typeMark = 'p_cell';
// es default export should use const instead of let
var ExportParagraph = RefParagraph;
export default ExportParagraph;