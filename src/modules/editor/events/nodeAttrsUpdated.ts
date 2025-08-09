export const NODE_ATTRS_UPDATED_EVENT = 'tp:nodeAttrsUpdated' as const

export type NodeAttrsUpdatedDetail = {
  category: 'spacing' | 'style' | 'data' | 'other'
  keys?: readonly string[]
}

export const emitNodeAttrsUpdated = (detail: NodeAttrsUpdatedDetail) => {
  window.dispatchEvent(
    new CustomEvent<NodeAttrsUpdatedDetail>(NODE_ATTRS_UPDATED_EVENT, {
      detail,
    })
  )
}
