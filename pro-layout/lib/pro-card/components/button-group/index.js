"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ButtonGroup = void 0;
var _box = _interopRequireDefault(require("@alifd/next/lib/box"));
var _menuButton = _interopRequireDefault(require("@alifd/next/lib/menu-button"));
var _menu = _interopRequireDefault(require("@alifd/next/lib/menu"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _button = _interopRequireDefault(require("@alifd/next/lib/button"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var React = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash.omit"));
var _classnames = _interopRequireDefault(require("classnames"));
var _checkComName = _interopRequireDefault(require("../../../utils/checkComName"));
var _excluded = ["children"],
  _excluded2 = ["style", "className", "text", "visibleButtonCount", "dataSource", "moreMenuButtonProps", "i18nBundle"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ButtonGroup = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(ButtonGroup, _React$Component);
  function ButtonGroup() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.getDataSource = function () {
      var _this$props = _this.props,
        dataSource = _this$props.dataSource,
        children = _this$props.children,
        text = _this$props.text;
      var externalProps = {};
      if (text) {
        externalProps = {
          type: 'primary',
          text: true
        };
      }
      var realDataSource = [];
      if (children) {
        React.Children.forEach(children, function (child) {
          if ((0, _checkComName["default"])(child, _button["default"])) {
            realDataSource.push((0, _extends2["default"])({}, externalProps, child.props));
          } else if (
          // 表单操作按钮逻辑兼容
          (0, _checkComName["default"])(child, null, ['SubmitButton', 'ResetButton', 'Submit', 'Reset', 'Form.Submit', 'Form.Reset', 'Config(Button)'])) {
            realDataSource.push(child);
          }
        });
      } else if (Array.isArray(dataSource)) {
        dataSource.forEach(function (dataSourceItem) {
          realDataSource.push((0, _extends2["default"])({}, externalProps, dataSourceItem));
        });
      }
      return realDataSource;
    };
    _this.getVisibleDataSourceAndCollapseDataSource = function (dataSource) {
      var visibleButtonCount = _this.props.visibleButtonCount;
      if (visibleButtonCount === false) {
        return {
          visible: dataSource,
          collapse: []
        };
      }
      var visibleDataSource = [];
      var collapseDataSource = [];
      dataSource.forEach(function (dataSourceItem, idx) {
        if (idx >= visibleButtonCount) {
          collapseDataSource.push(dataSourceItem);
        } else {
          visibleDataSource.push(dataSourceItem);
        }
      });
      return {
        visible: visibleDataSource,
        collapse: collapseDataSource
      };
    };
    return _this;
  }
  var _proto = ButtonGroup.prototype;
  /**
   * 渲染可展示的 dataSource
   */
  _proto.renderVisible = function renderVisible(dataSource, text) {
    var buttonList = [];
    dataSource.forEach(function (dataSourceItem, idx) {
      if ( /*#__PURE__*/React.isValidElement(dataSourceItem)) {
        buttonList.push(dataSourceItem);
      } else {
        buttonList.push( /*#__PURE__*/React.createElement(_button["default"], (0, _extends2["default"])({
          key: idx,
          text: text
        }, dataSourceItem)));
      }
    });
    return buttonList;
  }

  /**
   * 渲染折叠的 dataSource
   */;
  _proto.renderCollapse = function renderCollapse(dataSource) {
    var _this$props2 = this.props,
      moreMenuButtonProps = _this$props2.moreMenuButtonProps,
      text = _this$props2.text;
    var menuDataSource = dataSource.map(function (dataSourceItem) {
      if (typeof dataSourceItem.props === 'object') {
        return (0, _lodash["default"])(dataSourceItem.props, ['type', 'text']);
      }
      return (0, _lodash["default"])(dataSourceItem, ['type', 'text']);
    });
    if (dataSource.length > 0) {
      return /*#__PURE__*/React.createElement(_menuButton["default"], (0, _extends2["default"])({
        popupProps: {
          align: 'tr br'
        },
        label: '',
        text: text,
        type: text ? 'primary' : 'normal'
      }, moreMenuButtonProps), menuDataSource.map(function (_ref) {
        var children = _ref.children,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
        return /*#__PURE__*/React.createElement(_menu["default"].Item, props, children);
      }));
    }
  };
  _proto.render = function render() {
    var _this$props3 = this.props,
      style = _this$props3.style,
      className = _this$props3.className,
      text = _this$props3.text,
      visibleButtonCount = _this$props3.visibleButtonCount,
      dataSource = _this$props3.dataSource,
      moreMenuButtonProps = _this$props3.moreMenuButtonProps,
      i18nBundle = _this$props3.i18nBundle,
      otherProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$props3, _excluded2);
    var classes = (0, _classnames["default"])('pro-layout-button-group', className);
    var realDataSource = this.getDataSource();
    var _this$getVisibleDataS = this.getVisibleDataSourceAndCollapseDataSource(realDataSource),
      visible = _this$getVisibleDataS.visible,
      collapse = _this$getVisibleDataS.collapse;
    return /*#__PURE__*/React.createElement(_box["default"], (0, _extends2["default"])({
      direction: "row",
      spacing: 8,
      className: classes,
      style: style
    }, otherProps), this.renderVisible(visible, text), this.renderCollapse(collapse));
  };
  return ButtonGroup;
}(React.Component);
exports.ButtonGroup = ButtonGroup;
ButtonGroup.defaultProps = {
  visibleButtonCount: 3,
  moreMenuButtonProps: {}
};
ButtonGroup.displayName = 'ButtonGroup';