import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import React from 'react'
import { shallow } from 'enzyme'
import { updateAllLabels } from '@/actions/markup'
import { ExtractArea } from '@/containers/ExtractArea'
import { LabelContent } from '@/containers/LabelContent'
import { Mode } from '@/enums/Mode'
import { Label, LabelType } from '@/models/Label'
import { LabelProperties } from './LabelProperties'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/containers/LabelContent', () =>
  mockComponent('LabelContent')
)
jest.mock('@/containers/ExtractArea', () =>
  mockComponent('ExtractArea')
)
jest.mock('@/containers/ObjectNameAndIndex', () =>
  mockComponent('ObjectNameAndIndex')
)
jest.mock('@/containers/ObjectCoordinates', () =>
  mockComponent('ObjectCoordinates')
)
jest.mock('uuid', () => mockUuid)

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = LabelProperties

describe('Container: LabelProperties', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass updateAllLabels action as prop to WrappedComponent', () => {
      props.updateAllLabels([])
      expect(updateAllLabels).nthCalledWith(1, [])
    })
  })

  describe('component', () => {
    let wrapper, defaultProps
    const testLabel = new Label(1, 2, 3, 4, undefined, 5, LabelType.STRING, 'test', {}, 0.78)

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        label: testLabel
      }
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not render LabelContent and ExtractArea in case setting mode is Markup', () => {
      const props = {
        ...defaultProps,
        settings: {
          ...defaultProps.settings,
          mode: Mode.MARKUP
        }
      }
      wrapper.setProps(props)
      const labelContent = wrapper.find(LabelContent)
      const extractArea = wrapper.find(ExtractArea)
      expect(labelContent.exists()).toBe(false)
      expect(extractArea.exists()).toBe(false)
    })
  })
})
