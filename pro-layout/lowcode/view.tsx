import React, { useEffect } from 'react';
import * as ProLayout from '../src/index';
import { Balloon } from '@alifd/next';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { getDefaultBlockCellSchema, getDefaultBlockSchema } from './common/const';
import { performRowColSideEffects } from './common/auto-row-col-side-effects';
import { initSingletonDivider } from './common/divider';
import './index.scss';

const { Tooltip } = Balloon;
const {
  Page,
  Block,
  BlockCell,
  BlockCellItem,
  P,
  Text,
  PageHeader,
  PageFooter,
  PageContent,
  PageNav,
  PageAside,
  Row,
  Col,
  RowColContainer,
  ProCard,
} = ProLayout;
const FUSION_UI_VIEW_PREFIX = 'pro-layout-view';

const AddSection = ({ onClick }) => {
  return (
    <div className={`${FUSION_UI_VIEW_PREFIX}-section-add`}>
      <div className={`${FUSION_UI_VIEW_PREFIX}-section-add-wrapper`}>
        <div className={`${FUSION_UI_VIEW_PREFIX}-section-add-icon`}>
          <div onClick={onClick}>添加内容区域</div>
        </div>
      </div>
    </div>
  );
};

const PageView = (props) => {
  const { children, _leaf, ...others } = props;

  const isTab = _leaf.getProps().getPropValue('isTab');
  const addNewSection = () => {
    _leaf.insertAfter(getDefaultBlockSchema());
  };

  return (
    <Page {...others}>
      {children}
      {!isTab && <AddSection onClick={addNewSection} />}
    </Page>
  );
};

const BlockView = (props) => {
  const { children, _leaf, ...others } = props;

  const addNewBlockCell = () => {
    const blockCellSchema = getDefaultBlockCellSchema();
    if (_leaf.parent.componentName === 'Slot') {
      blockCellSchema.props.colSpan = 1;
    }
    const newNode = _leaf.document.createNode(blockCellSchema);
    _leaf.insertAfter(newNode);
    newNode.select();
  };

  useEffect(() => {
    initSingletonDivider();
  }, []);

  return (
    <>
      <Block {...others}>{children}</Block>
      <div className={`${FUSION_UI_VIEW_PREFIX}-blockcell-add`}>
        <Tooltip
          align="t"
          trigger={
            <div onClick={addNewBlockCell} className={`${FUSION_UI_VIEW_PREFIX}-icon-add`}>
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2398"
                width="24"
                height="24"
                style={{ transform: 'scale(0.5)' }}
              >
                <path
                  d="M524.8 64c4.693333 0 8.533333 3.84 8.533333 8.533333V490.666667h418.133334c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334H533.333333v418.133333a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533334-8.533333V554.666667H51.2a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333H469.333333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333h46.933333z"
                  fill="#FFF"
                  p-id="2399"
                />
              </svg>
            </div>
          }
        >
          添加区块
        </Tooltip>
      </div>
    </>
  );
};

const BlockCellView = (props) => {
  const { children, _leaf, ...others } = props;

  let divider = null;
  // 在没有 children 并且宽度符合要求的情况下
  const originColSpan = _leaf.schema.props.colSpan;
  // if (!_leaf.exportSchema().children && originColSpan > 2) {
  if (originColSpan > 2) {
    divider = (
      <div className={`${FUSION_UI_VIEW_PREFIX}-blockcell-divider`}>
        <div className={`${FUSION_UI_VIEW_PREFIX}-cut`} />
      </div>
    );
  }

  return (
    <BlockCell
      className={`${FUSION_UI_VIEW_PREFIX}-block-cell ${divider && 'has-divider'}`}
      {...others}
    >
      {children}
      {/* {divider} */}
    </BlockCell>
  );
};

const BlockCellItemView = (props) => {
  return <BlockCellItem {...props} />;
};

const TextView = (props) => {
  return <Text {...props} />;
};

const PView = (props) => {
  return <P {...props} />;
};

const PageHeaderView = (props) => {
  return <PageHeader {...props} />;
};

const PageFooterView = (props) => {
  return <PageFooter {...props} />;
};

const PageContentView = (props) => {
  const { children, _leaf, ...others } = props;

  const addNewSection = () => {
    _leaf.insertAfter(getDefaultBlockSchema());
  };

  return (
    <PageContent {...others}>
      {children}
      <AddSection onClick={addNewSection} />
    </PageContent>
  );
};

const PageNavView = (props) => {
  return <PageNav {...props} />;
};

const PageAsideView = (props) => {
  return <PageAside {...props} />;
};

const RowView = (props) => {
  const { children, ...rest } = props;
  return (
    <>
      <Row {...rest}>{children}</Row>
    </>
  );
};

const ColView = (props) => {
  const { _leaf, children, ...rest } = props;
  return (
    <>
      <Col {...rest}>{children}</Col>
    </>
  );
};

const RowColContainerView = (props) => {
  const { _leaf, children, ...rest } = props;

  useEffect(() => {
    initSingletonDivider();
    performRowColSideEffects((window.parent as any).AliLowCodeEngine);
  }, []);

  return (
    <>
      <RowColContainer {...rest}>{children}</RowColContainer>
    </>
  );
};

hoistNonReactStatic(PageView, Page);
hoistNonReactStatic(BlockView, Block);
hoistNonReactStatic(BlockCellView, BlockCell);
hoistNonReactStatic(BlockCellItemView, BlockCellItem);
hoistNonReactStatic(TextView, Text);
hoistNonReactStatic(PView, P);
hoistNonReactStatic(RowView, Row);
hoistNonReactStatic(ColView, Col);
hoistNonReactStatic(RowColContainerView, RowColContainer);
hoistNonReactStatic(PageHeaderView, PageHeader);
hoistNonReactStatic(PageFooterView, PageFooter);
hoistNonReactStatic(PageContentView, PageContent);
hoistNonReactStatic(PageAsideView, PageAside);
hoistNonReactStatic(PageNavView, PageNav);

export {
  PageView as Page,
  BlockView as Block,
  BlockCellView as BlockCell,
  BlockCellItemView as BlockCellItem,
  TextView as Text,
  PView as P,
  RowView as Row,
  ColView as Col,
  RowColContainerView as RowColContainer,
  PageHeaderView as PageHeader,
  PageFooterView as PageFooter,
  PageContentView as PageContent,
  PageAsideView as PageAside,
  PageNavView as PageNav,
  ProCard,
};
