import _Box from "@alifd/next/es/box";
import _MenuButton from "@alifd/next/es/menu-button";
import _Menu from "@alifd/next/es/menu";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/extends";
import _Button from "@alifd/next/es/button";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _excluded = ["children"],
  _excluded2 = ["style", "className", "text", "visibleButtonCount", "dataSource", "moreMenuButtonProps", "i18nBundle"];
import * as React from 'react';
import omit from 'lodash.omit';
import cx from 'classnames';
import checkComName from '../../../utils/checkComName';
export var ButtonGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ButtonGroup, _React$Component);
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
          if (checkComName(child, _Button)) {
            realDataSource.push(_extends({}, externalProps, child.props));
          } else if (
          // 表单操作按钮逻辑兼容
          checkComName(child, null, ['SubmitButton', 'ResetButton', 'Submit', 'Reset', 'Form.Submit', 'Form.Reset', 'Config(Button)'])) {
            realDataSource.push(child);
          }
        });
      } else if (Array.isArray(dataSource)) {
        dataSource.forEach(function (dataSourceItem) {
          realDataSource.push(_extends({}, externalProps, dataSourceItem));
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
        buttonList.push( /*#__PURE__*/React.createElement(_Button, _extends({
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
        return omit(dataSourceItem.props, ['type', 'text']);
      }
      return omit(dataSourceItem, ['type', 'text']);
    });
    if (dataSource.length > 0) {
      return /*#__PURE__*/React.createElement(_MenuButton, _extends({
        popupProps: {
          align: 'tr br'
        },
        label: '',
        text: text,
        type: text ? 'primary' : 'normal'
      }, moreMenuButtonProps), menuDataSource.map(function (_ref) {
        var children = _ref.children,
          props = _objectWithoutPropertiesLoose(_ref, _excluded);
        return /*#__PURE__*/React.createElement(_Menu.Item, props, children);
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
      otherProps = _objectWithoutPropertiesLoose(_this$props3, _excluded2);
    var classes = cx('pro-layout-button-group', className);
    var realDataSource = this.getDataSource();
    var _this$getVisibleDataS = this.getVisibleDataSourceAndCollapseDataSource(realDataSource),
      visible = _this$getVisibleDataS.visible,
      collapse = _this$getVisibleDataS.collapse;
    return /*#__PURE__*/React.createElement(_Box, _extends({
      direction: "row",
      spacing: 8,
      className: classes,
      style: style
    }, otherProps), this.renderVisible(visible, text), this.renderCollapse(collapse));
  };
  return ButtonGroup;
}(React.Component);
ButtonGroup.defaultProps = {
  visibleButtonCount: 3,
  moreMenuButtonProps: {}
};
ButtonGroup.displayName = 'ButtonGroup';