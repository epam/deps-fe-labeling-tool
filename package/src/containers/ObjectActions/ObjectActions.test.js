import React from 'react'
import { shallow } from 'enzyme'
import { isObjectActionsEmpty, ObjectActions } from '@/containers/ObjectActions/ObjectActions'

jest.mock('@/components/CompilationFeatureControl', () => ({
  ...jest.requireActual('@/components/CompilationFeatureControl'),
  isFeatureEnabled: jest.fn((feature) => feature === 'SHOW_NOT_IMPLEMENTED')
}))

describe('Container: ObjectActions', () => {
  const wrapper = shallow(<ObjectActions />)

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('Util: isObjectActionsEmpty', () => {
    it('should return false in case that feature is found', () => {
      const result = isObjectActionsEmpty()
      expect(result).toBe(false)
    })
  })
})
