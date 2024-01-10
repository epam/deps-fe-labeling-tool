import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import React from 'react'
import { shallow } from 'enzyme'
import { FeatureUserNotifier } from '@/application/FeatureUserNotifier'
import { Feature } from '@/enums/Feature'
import { DEFAULT_AUTO_SAVE_INTERVAL_MS } from '@/models/Settings'
import { settingsSelector } from '@/selectors/settings'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f())
}))
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

const mockNotifySuccess = jest.fn()

jest.mock('@/services/api', () => ({
  getApi: jest.fn(() => ({
    notify: {
      success: mockNotifySuccess
    }
  }))
}))

describe('Application: FeatureUserNotifier', () => {
  const mockChildrenComponent = 'Test children'
  const getMessage = (minutes) => `Please be aware, autosaving occurs every ${minutes} minutes`

  it('should return correct snapshot', () => {
    const wrapper = shallow(<FeatureUserNotifier>{mockChildrenComponent}</FeatureUserNotifier>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should not call notify success if autoSaveFeature is not enabled', () => {
    settingsSelector.mockReturnValueOnce({
      features: []
    })
    shallow(<FeatureUserNotifier>{mockChildrenComponent}</FeatureUserNotifier>)
    expect(mockNotifySuccess).not.toBeCalled()
  })

  const testCases = [
    {
      name:
        'should call notify success first time with the appropriate message and default interval if autoSaveFeature is enabled',
      features: [
        {
          code: Feature.AUTO_SAVE
        }
      ],
      result: getMessage(DEFAULT_AUTO_SAVE_INTERVAL_MS / 1000 / 60)
    },
    {
      name:
        'should call notify success first time with the appropriate message and provided interval if autoSaveFeature is enabled',
      features: [
        {
          code: Feature.AUTO_SAVE,
          data: {
            interval: 60000
          }
        }
      ],
      result: getMessage(1)
    }
  ]

  it.each(testCases)('$name', ({ features, result }) => {
    settingsSelector.mockReturnValueOnce({
      features
    })
    shallow(<FeatureUserNotifier>{mockChildrenComponent}</FeatureUserNotifier>)
    expect(mockNotifySuccess).nthCalledWith(1, result)
  })
})
