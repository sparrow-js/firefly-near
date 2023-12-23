export const performRowColSideEffects = (engine) => {
  if ((window as any).$$performedRowColSideEffects) return;

  try {
    engine.material.modifyBuiltinComponentAction('remove', (action) => {
      const oldCondition = Object.prototype.hasOwnProperty.call(action, 'condition')
        ? action.condition
        : true;
      action.condition = (node) => {
        if (isSingleChildOfNextBlockCell(node)) {
          return false;
        }

        return typeof oldCondition === 'function' ? oldCondition(node) : oldCondition;
      };
    });
    engine.project.currentDocument.onRemoveNode(casecadeRemove);
    (window as any).$$performedRowColSideEffects = true;
  } catch (error) {
    console.error('performSideEffects error ===>', error);
  }
};

/*
  判断是不是 NextBlockCell 下的小布局容器
*/
function isSingleChildOfNextBlockCell(node) {
  if (node?.componentName === 'NextCol') {
    if (node.parent?.componentName === 'NextRow' && node.parent?.children.length === 1) {
      return isSingleChildOfNextBlockCell(node.parent);
    }
  } else if (node?.componentName === 'NextRow') {
    if (
      node.parent?.componentName === 'NextRowColContainer' &&
      node.parent?.children.length === 1
    ) {
      return isSingleChildOfNextBlockCell(node.parent);
    }
  } else if (node?.componentName === 'NextRowColContainer') {
    if (node.parent?.componentName === 'NextBlockCell' && node.parent?.children.length === 1) {
      return true;
    }
  }

  return false;
}

// 级联删除
function casecadeRemove(node) {
  switch (node?.componentName) {
    case 'NextCol':
      if (node.parent?.componentName === 'NextRow' && node.parent?.isEmpty) {
        node.parent.remove();
        return;
      }
      node.parent.children?.children?.[0]?.select();
      break;

    case 'NextRow':
      if (node.parent?.componentName === 'NextRowColContainer' && node.parent?.isEmpty) {
        node.parent.remove();
        return;
      }
      node.parent.children?.children?.[0]?.select();
      break;

    default:
      break;
  }
}
