import _Menu from "@alifd/next/es/menu";
import _Button from "@alifd/next/es/button";
import _extends from "@babel/runtime/helpers/extends";
import _Icon from "@alifd/next/es/icon";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _Overlay from "@alifd/next/es/overlay";
var _excluded = ["prefix", "style", "className", "label", "popupTriggerType", "popupContainer", "popupStyle", "popupClassName", "popupProps", "followTrigger", "selectMode", "menuProps", "dataSource", "children", "onSelect", "defaultSelectedKeys", "onVisibleChange", "autoWidth", "onItemClick"];
import React from 'react';
import classnames from 'classnames';
var Popup = _Overlay.Popup;
var noop = function noop() {};
/**
 * MenuButton
 */
export var MenuButton = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(MenuButton, _React$Component);
  MenuButton.getDerivedStateFromProps = function getDerivedStateFromProps(props) {
    var st = {};
    if ('visible' in props) {
      st.visible = props.visible;
    }
    if ('selectedKeys' in props) {
      st.selectedKeys = props.selectedKeys;
    }
    return st;
  };
  function MenuButton(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.clickMenuItem = function (key) {
      var _this$props;
      var selectMode = _this.props.selectMode;
      for (var _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        others[_key - 1] = arguments[_key];
      }
      (_this$props = _this.props).onItemClick.apply(_this$props, [key].concat(others));
      if (selectMode === 'multiple') {
        return;
      }
      _this.onPopupVisibleChange(false, 'menuSelect');
    };
    _this.selectMenu = function (keys) {
      var _this$props2;
      if (!('selectedKeys' in _this.props)) {
        _this.setState({
          selectedKeys: keys
        });
      }
      for (var _len2 = arguments.length, others = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        others[_key2 - 1] = arguments[_key2];
      }
      (_this$props2 = _this.props).onSelect.apply(_this$props2, [keys].concat(others));
    };
    _this.onPopupOpen = function () {
      var button = _this.node;
      if (_this.props.autoWidth && button && _this.menu && _this.menu.style) {
        _this.menu.style.width = button.offsetWidth + "px";
      }
    };
    _this.onPopupVisibleChange = function (visible, type) {
      if (!('visible' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }
      _this.props.onVisibleChange(visible, type);
    };
    _this._menuRefHandler = function (ref) {
      _this.menu = ref;
      var refFn = _this.props.menuProps.ref;
      if (typeof refFn === 'function') {
        refFn(ref);
      }
    };
    _this.state = {
      selectedKeys: props.defaultSelectedKeys,
      visible: props.defaultVisible
    };
    return _this;
  }
  var _proto = MenuButton.prototype;
  _proto.render = function render() {
    var _classnames,
      _classnames2,
      _this2 = this;
    var _this$props3 = this.props,
      prefix = _this$props3.prefix,
      style = _this$props3.style,
      className = _this$props3.className,
      label = _this$props3.label,
      popupTriggerType = _this$props3.popupTriggerType,
      popupContainer = _this$props3.popupContainer,
      popupStyle = _this$props3.popupStyle,
      popupClassName = _this$props3.popupClassName,
      popupProps = _this$props3.popupProps,
      followTrigger = _this$props3.followTrigger,
      selectMode = _this$props3.selectMode,
      menuProps = _this$props3.menuProps,
      dataSource = _this$props3.dataSource,
      children = _this$props3.children,
      onSelect = _this$props3.onSelect,
      defaultSelectedKeys = _this$props3.defaultSelectedKeys,
      onVisibleChange = _this$props3.onVisibleChange,
      autoWidth = _this$props3.autoWidth,
      onItemClick = _this$props3.onItemClick,
      others = _objectWithoutPropertiesLoose(_this$props3, _excluded);
    var _this$state = this.state,
      visible = _this$state.visible,
      selectedKeys = _this$state.selectedKeys;
    var classNames = classnames((_classnames = {}, _classnames[prefix + "menu-btn"] = true, _classnames[prefix + "expand"] = visible, _classnames.opened = visible, _classnames), className);
    var popupClassNames = classnames((_classnames2 = {}, _classnames2[popupClassName] = !!popupClassName, _classnames2[prefix + "menu-btn-popup"] = true, _classnames2));
    var trigger = /*#__PURE__*/React.createElement(_Button, _extends({
      style: style,
      className: classNames
    }, others), label, " ", /*#__PURE__*/React.createElement(_Icon, {
      type: "arrow-down",
      className: prefix + "menu-btn-arrow"
    }));
    return /*#__PURE__*/React.createElement(Popup, _extends({
      followTrigger: followTrigger,
      visible: visible,
      onVisibleChange: this.onPopupVisibleChange,
      trigger: trigger,
      triggerType: popupTriggerType,
      container: popupContainer,
      onOpen: this.onPopupOpen,
      ref: function ref(node) {
        _this2.node = node;
      },
      style: popupStyle,
      className: popupClassNames
    }, popupProps), /*#__PURE__*/React.createElement("div", {
      className: prefix + "menu-btn-spacing-tb"
    }, /*#__PURE__*/React.createElement(_Menu, _extends({}, menuProps, {
      ref: this._menuRefHandler,
      selectedKeys: selectedKeys,
      selectMode: selectMode,
      onSelect: this.selectMenu,
      onItemClick: this.clickMenuItem,
      dataSource: dataSource
    }))));
  };
  return MenuButton;
}(React.Component);
MenuButton.displayName = 'MenuButton';
MenuButton.defaultProps = {
  prefix: 'pro-layout-',
  autoWidth: true,
  popupTriggerType: 'click',
  onVisibleChange: noop,
  onItemClick: noop,
  onSelect: noop,
  defaultSelectedKeys: [],
  menuProps: {},
  dataSource: []
};