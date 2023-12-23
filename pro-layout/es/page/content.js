import _Tab from "@alifd/next/es/tab";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "columns", "nav", "aside", "main", "children", "contentAlignCenter", "gap", "background", "noPadding", "grid", "isTab", "title", "key", "active", "presetNav", "presetAside", "navProps", "asideProps"];
import * as React from 'react';
import classNames from 'classnames';
import PageAside from './aside';
import PageNav from './nav';

// export interface TabItemProps {
//   title?: string;
// }

/**
 * TODO: Page.Header Page.Content Page.Footer
 * Content 的高度默认占据 一个屏幕的剩余空间，即使里面内容不足也应该背景色撑满
 * @param props
 */

var PageContent = function PageContent(props) {
  var _classNames, _classNames2, _classNames3;
  var prefix = props.prefix,
    columns = props.columns,
    nav = props.nav,
    aside = props.aside,
    main = props.main,
    children = props.children,
    contentAlignCenter = props.contentAlignCenter,
    gap = props.gap,
    background = props.background,
    noPadding = props.noPadding,
    grid = props.grid,
    isTab = props.isTab,
    title = props.title,
    key = props.key,
    active = props.active,
    presetNav = props.presetNav,
    presetAside = props.presetAside,
    navProps = props.navProps,
    asideProps = props.asideProps,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  var newPrefix = isTab ? 'pro-layout-' : prefix;
  var mainCls = classNames((_classNames = {}, _classNames[newPrefix + "page-main"] = true, _classNames[newPrefix + "display-grid"] = grid, _classNames));
  var contentCls = classNames((_classNames2 = {}, _classNames2[newPrefix + "page-content"] = true, _classNames2[newPrefix + "page-content-center"] = contentAlignCenter, _classNames2[newPrefix + "page-content-nopadding"] = noPadding, _classNames2));
  var contentHelpCls = classNames((_classNames3 = {}, _classNames3[newPrefix + "page-bg-" + background] = !!background, _classNames3[newPrefix + "page-min-height-helper"] = true, _classNames3));
  var mainStyle = {
    gridTemplateColumns: "repeat(" + columns + ", minmax(0px, 1fr))",
    gridGap: gap
  };
  var content = /*#__PURE__*/React.createElement("div", _extends({
    className: contentHelpCls
  }, others), /*#__PURE__*/React.createElement("section", {
    className: contentCls
  }, presetNav ? /*#__PURE__*/React.createElement(PageNav, navProps, nav) : nav, /*#__PURE__*/React.createElement("section", {
    className: mainCls,
    style: mainStyle
  }, main, children), presetAside ? /*#__PURE__*/React.createElement(PageAside, asideProps, aside) : aside));
  if (isTab) {
    return /*#__PURE__*/React.createElement(_Tab.Item, {
      title: title,
      key: key,
      active: active
    }, content);
  }
  return content;
};
PageContent.defaultProps = {
  prefix: 'pro-layout-',
  isTab: false
};
export default PageContent;