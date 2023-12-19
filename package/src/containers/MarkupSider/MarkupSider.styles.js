import styled from 'styled-components'
import { Sider } from '@/components/Sider'
import { COLORS } from '@/theme/theme.default'

const MarkupSidebarSider = styled(Sider)`
  border-left: 1px solid ${COLORS.SECONDARY};
  z-index: 1;
`
export { MarkupSidebarSider }
