import { cloneVNode } from 'vue'

import throwError from '@package/utils/error'
import { getFirstValidNode } from '@package/utils/vnode'

export default function renderTrigger(trigger, extraProps) {
  const firstElement = getFirstValidNode(trigger, 1)
  if (!firstElement) throwError('renderTrigger', 'trigger expects single rooted node')
  return cloneVNode(firstElement, extraProps)
}
