import React from 'react'
import { Button } from '@/components/Button'
import { CommentIcon } from '@/components/Icons/CommentIcon'
import { Tooltip } from '@/components/Tooltip'

const RESOURCE_TOOLTIP_COMMENTS = 'Comments'

const CommentsButton = () => (
  <Tooltip title={RESOURCE_TOOLTIP_COMMENTS}>
    <Button.Icon icon={<CommentIcon />} />
  </Tooltip>
)

export {
  CommentsButton
}
