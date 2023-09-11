import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { COLORS } from '@/theme/theme.default'

const WarningModalContentSpan = styled.span`
  font-weight: 500;
  font-size: 1.7rem;
  padding-bottom: 1.3rem;
`

const WarningModalContent = styled.div`
  padding: 1rem;
`

const StyledButton = styled(Button)`
  font-size: 1.4rem;
  line-height: 2.2rem;
  padding: 0 1.6rem;
`

const Wrapper = styled.div`
  display: flex;

  & > button:nth-child(2) {
    margin-left: auto !important;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const StyledQuestionCircle = styled(QuestionCircleOutlined)`
  font-size: 2.1rem;
  margin-right: 1.2rem;
  color: ${COLORS.WARNING};
`

const StyledCloseOutlined = styled(CloseOutlined)`
  font-size: 1.4rem;
`

export {
  WarningModalContentSpan,
  WarningModalContent,
  StyledButton as Button,
  StyledQuestionCircle as QuestionCircle,
  StyledCloseOutlined as CloseOutlined,
  Wrapper,
  TitleWrapper
}
