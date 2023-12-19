import React from 'react'
import { shallow } from 'enzyme'
import { CompilationFeatureControl } from '@/components/CompilationFeatureControl'

const mockFeatureName = 'featureName'

const FEATURES = []

jest.mock('@/utils/compilation', () => ({
  isCompilationFeatureEnabled: jest.fn((featureName) => FEATURES.includes(featureName))
}))

describe('Component: CompilationFeatureControl', () => {
  let wrapper

  FEATURES.push(mockFeatureName)

  const TestComponent = () => (<div>Test</div>)

  const defaultProps = {
    featureName: mockFeatureName
  }

  it('should return children when found in global FEATURE featureName', () => {
    wrapper = shallow(<CompilationFeatureControl {...defaultProps}><TestComponent /></CompilationFeatureControl>)
    expect(wrapper.contains(<TestComponent />)).toBe(true)
  })

  it('should return null if there is no in global FEATURE featureName', () => {
    defaultProps.featureName = ''
    wrapper = shallow(<CompilationFeatureControl {...defaultProps}><TestComponent /></CompilationFeatureControl>)
    expect(wrapper.contains(<TestComponent />)).toBe(false)
  })
})
