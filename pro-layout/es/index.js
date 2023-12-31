// import ProLayout from './base';
import Block from './block';
import Page, { Header as PageHeader, Footer as PageFooter, PageContent, PageAside, PageNav } from './page/index';
import P from './p';
import Text from './text';
import BlockCell from './block-cell';
import BlockCellItem from './block-cell-item';
import RowColContainer from './row-col-container';
import ProCard from './pro-card';
import Row from './row';
import Col from './col';
Block.Cell = BlockCell;
export { PageHeader, PageFooter, PageContent, PageAside, PageNav, Page, Block, BlockCell, BlockCellItem, Text, P, RowColContainer, Row, Col, ProCard };