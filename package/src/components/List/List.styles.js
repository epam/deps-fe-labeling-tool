import { List } from 'antd'
import 'antd/lib/list/style/index.less'
import styled from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const ListItem = styled(List.Item)`
  .ant-list-item-action {
    margin-left: 1rem;
  }

  .ant-list-item-action-split {
    background-color: ${COLORS.PRIMARY_5};
  }
`

const ListItemMeta = styled(List.Item.Meta)`
  .ant-list-item-meta-title {
    line-height: 1.6rem;
  }

  .ant-list-item-meta-description {
    line-height: 1.6rem;
  }
`

export {
  ListItem,
  ListItemMeta
}
