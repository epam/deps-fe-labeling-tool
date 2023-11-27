import React from 'react'
import { List as AntdList } from 'antd'
import 'antd/lib/list/style/index.less'
import { ListItem as StyledListItem, ListItemMeta as StyledListItemMeta } from './List.styles'

const List = (props) => (
  <AntdList {...props} />
)

const ListItem = (props) => (
  <StyledListItem {...props} />
)

const ListItemMeta = (props) => (
  <StyledListItemMeta {...props} />
)

export {
  List,
  ListItem,
  ListItemMeta
}
