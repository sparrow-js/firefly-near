import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { splitNodeByDimension } from './auto-row-col';
import { keybindingService } from '../keybindingService';

export interface IDividerProps {
  split: (dimension: 'v' | 'h', node: any) => void;
}

interface Pos {
  dimension: 'v' | 'h';
  left: number;
  top: number;
  node: any;
}

const FUSION_UI_VIEW_PREFIX = 'pro-layout-view';

export const initSingletonDivider = (id?: string) => {
  const dividerId = id || 'default-layout-divider';
  const pageC = getPageRootDOMNode();
  if (!pageC) return;

  const $el = pageC.ownerDocument.getElementById(dividerId);
  if (!$el) {
    const dividerWrapper = createDividerWrapperNode(dividerId);
    pageC && pageC.appendChild(dividerWrapper);
    ReactDOM.render(<Divider split={splitNodeByDimension} />, dividerWrapper);

    // 初始化切割快捷键
    // addDividerKeybindings();
  }
};
export const Divider = (props: IDividerProps) => {
  // const engine = useRef((window.parent as any).AliLowCodeEngine);
  const engine = (window.parent as any).AliLowCodeEngine;
  const [cuts, setCuts] = useState<Pos[]>([]);
  const [disabled, setDisabled] = useState(false);
  const computCuts = useCallback((selectedNode) => {
    const dimension = getSplitDimension(selectedNode);
    const rect = selectedNode.getRect();
    const newCuts: Pos[] = [];

    const pageC = getPageRootDOMNode();
    const pageCRect = pageC ? pageC.getBoundingClientRect() : { left: 0, top: 0 };

    if (!rect || !pageCRect) {
      return;
    }

    if (dimension.h) {
      newCuts.push({
        dimension: 'h',
        left: rect.left - pageCRect.left,
        top: rect.top + rect.height / 2 - pageCRect.top,
        node: selectedNode,
      });
    }

    if (dimension.v && rect && pageCRect) {
      newCuts.push({
        dimension: 'v',
        left: rect.left + rect.width / 2 - pageCRect.left,
        top: rect.top - pageCRect.top,
        node: selectedNode,
      });
    }

    setCuts(newCuts);
  }, []);

  const onSelectionChange = useCallback((timer = 100) => {
    setDisabled(false);

    const selectedNode = getSelectedNode(engine);
    if (!selectedNode) {
      setCuts([]);
      return;
    }

    // TODO
    // 目前 selectionChang 时 dom 结构可能还在变化
    // 会偶尔导致 computCuts 计算尺寸出现问题，需要优化
    if (timer) {
      setTimeout(() => {
        computCuts(selectedNode);
      }, timer);
    } else {
      computCuts(selectedNode);
    }
  }, []);

  useEffect(() => {
    const { currentDocument } = engine.project;

    currentDocument.onChangeSelection(onSelectionChange);
  }, []);

  /*
  // 目前在 resize 开始/结束时会重新计算
  // 所以暂时不需要去监听了
  const resizeObserver = useRef(
    new ResizeObserver(() => {
      onSelectionChange();
    }),
  );
  useEffect(() => {
    engine.current.selection.onSelectionChange(() => {
      const selectedNode = getSelectedNode(engine.current);
      try {
        setTimeout(() => {
          resizeObserver.current.disconnect();
          selectedNode &&
            selectedNode.getDOMNode() &&
            resizeObserver.current.observe(selectedNode.getDOMNode());
        }, 50);
      } catch (error) {
        console.err(error);
      }
    });
  }, []);
  */

  const onDisabled = useCallback(() => {
    setDisabled(true);
  }, []);
  const onEnabled = useCallback(() => {
    setDisabled(false);
    onSelectionChange(0);
  }, [onSelectionChange]);

  useEffect(() => {
    const contentWindow = (engine as any).project?.simulator?.contentWindow;
    if (contentWindow) {
      contentWindow.addEventListener('dividerDisable', onDisabled);
      contentWindow.addEventListener('dividerEnable', onEnabled);

      return () => {
        contentWindow.removeEventListener('dividerDisable', onDisabled);
        contentWindow.removeEventListener('dividerEnable', onEnabled);
      };
    }
  }, [onDisabled, onEnabled]);

  if (disabled) return null;
  return (
    <>
      {/* vertical */}
      <Cut pos={cuts.find((p) => p.dimension === 'v')} split={props.split} />

      {/* horizontal */}
      <Cut pos={cuts.find((p) => p.dimension === 'h')} split={props.split} />
    </>
  );
};

interface ICutProps {
  split: (dimension: 'v' | 'h', node: any) => void;
  pos: Pos;
}

const Cut = (props: ICutProps) => {
  const [showLine, setLineVisibility] = useState(false);
  const { pos, split } = props;
  if (!pos || !pos.node) return null;

  const objectRect = pos.node.getRect() || {};
  const computeLineStyle = () => {
    return pos?.dimension === 'v'
      ? {
          width: 1,
          height: objectRect.height,
          transform: 'translate(-50%, 0)',
          ...pos,
        }
      : {
          width: objectRect.width,
          height: 1,
          ...pos,
        };
  };

  const computeDividerStyle = () => {
    const isNanoSized = objectRect.width <= 60;
    const getTransform = () => {
      const gap = isNanoSized ? 0 : '8px';
      const scale = isNanoSized ? 'scale(.6)' : '';
      return pos?.dimension === 'v'
        ? `translate(-50%, ${gap}) ${scale}`
        : `translate(${gap}, -50%) rotate(270deg) ${scale}`;
    };

    return {
      ...pos,
      transform: getTransform(),
    };
  };

  return (
    <>
      <div
        className={`${FUSION_UI_VIEW_PREFIX}-divider`}
        style={computeDividerStyle()}
        onMouseEnter={() => setLineVisibility(true)}
        onMouseLeave={() => setLineVisibility(false)}
        onClick={() => {
          split(pos.dimension, pos.node);
          setTimeout(() => setLineVisibility(false), 20);
        }}
      >
        <div className={`${FUSION_UI_VIEW_PREFIX}-dividerImg`} />
      </div>
      {showLine ? (
        <div className={`${FUSION_UI_VIEW_PREFIX}-dividerLine`} style={computeLineStyle()} />
      ) : null}
    </>
  );
};

// utils
const getSplitDimension = (node) => {
  const { componentName } = node;
  const dimension = {
    v: false,
    h: false,
  };

  switch (componentName) {
    case 'NextRowColContainer':
    case 'NextRow':
      dimension.h = true;
      break;
    case 'NextCol':
      dimension.v = true;
      dimension.h = true;
      break;
    case 'NextBlockCell':
      // nav aside 里不出现小剪刀
      if (node?.parent?.parent.componentName !== 'Slot') {
        dimension.v = true;
      }
      break;

    default:
      break;
  }

  return dimension;
};

const getSelectedNode = ({ project }) => {
  const selectedId = project.currentDocument.selection.selected[0];
  return selectedId ? project.currentDocument.getNodeById(selectedId) : null;
};

const getPageRootDOMNode = () => {
  return (window.parent as any).AliLowCodeEngine.project.currentDocument.root.getDOMNode();
};

const createDividerWrapperNode = (dividerId: string) => {
  const node = document.createElement('div');
  node.id = dividerId;
  node.style.position = 'absolute';
  node.style.top = '0';
  node.style.left = '0';
  node.style.zIndex = '10001';
  return node;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addDividerKeybindings = () => {
  keybindingService.bind({
    command: 'horizontalDividerCommands',
    keybinding: 's',
    components: ['NextRowColContainer', 'NextRow', 'NextCol', 'NextBlockCell'],
    cb: (node) => {
      splitNodeByDimension('v', node);
    },
    desc: '纵向分割快捷键',
  });
};
