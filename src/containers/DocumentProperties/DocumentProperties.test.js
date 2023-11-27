import { mockOcrActions } from '@/mocks/actions/ocr'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockOcrSelectors } from '@/mocks/selectors/ocr'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import React from 'react'
import { shallow } from 'enzyme'
import { Select } from '@/components/Select'
import { DocumentProperties } from '@/containers/DocumentProperties'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/ocr', () => mockOcrActions)
jest.mock('@/selectors/ocr', () => mockOcrSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = DocumentProperties
describe('Container: DocumentProperties', () => {
  const defaultProps = {
    ...mapStateToProps().props,
    ...mapDispatchToProps().props
  }
  const wrapper = shallow(<WrappedComponent {...defaultProps} />)

  it('Should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should call setPrimaryLanguage with correct argument when calling onChange at Language Select', () => {
    const mockPrimaryLanguage = defaultProps.ocrLanguages[0].code
    wrapper.find(Select).at(1).props().onChange(mockPrimaryLanguage)
    expect(defaultProps.setPrimaryLanguage).nthCalledWith(1, mockPrimaryLanguage)
  })
})
