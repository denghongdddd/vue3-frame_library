import { openBlock, createBlock, Comment } from 'vue'
import { PatchFlags } from '@package/utils/vnode'

export default function renderArrow(showArrow) {
  return showArrow
    ? (openBlock(),
    createBlock(
      'div',
      {
        ref: 'arrowRef',
        class: 'el-popper__arrow',
        'data-popper-arrow': '',
      },
      null,
      PatchFlags.NEED_PATCH,
    ))
    : (openBlock(), createBlock(Comment, null, ''))
}
