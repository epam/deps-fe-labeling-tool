import { mockComponent } from '@/mocks/mockComponent'
import { mockReactDom } from '@/mocks/mockReactDom'
import { mockUuid } from '@/mocks/mockUuid'
import { mockOcrEngine } from '@/mocks/selectors/ocr'
import ReactDOM from 'react-dom'
import { FieldType } from '@/enums/FieldType'
import { KnownLanguage } from '@/enums/KnownLanguage'
import { Mode } from '@/enums/Mode'
import { Config } from '@/models/Config'
import { Document } from '@/models/Document'
import { Field } from '@/models/Field'
import { Label, LabelType } from '@/models/Label'
import { Markup, PageMarkup } from '@/models/Markup'
import { OcrLanguage } from '@/models/OcrLanguage'
import { Settings } from '@/models/Settings'
import { Table, CellValue } from '@/models/Table'

jest.mock('uuid', () => mockUuid)

jest.mock('react-dom', () => mockReactDom)

jest.mock('@/config/document', () => ({
  documentForLabeling: 'MOCK_DOCUMENT'
}))

jest.mock('@/config/model', () => ({
  fields: 'MOCK_FIELDS'
}))

jest.mock('@/application/Root', () => mockComponent('Root'))

const mockOcrLanguage = new OcrLanguage(KnownLanguage.English, 'English')

const MOCK_CONFIG = new Config(
  new Document(['image1', 'image2'], KnownLanguage.ENGLISH, 'Mock Title', 'MockEngine', 'MockExtraName'),
  [
    new Field('MOCK_CODE_A', 'MOCK_NAME_A', FieldType.STRING),
    new Field('MOCK_CODE_B', 'MOCK_NAME_B', FieldType.STRING)
  ],
  {
    engines: [mockOcrEngine],
    languages: [mockOcrLanguage]
  },
  {
    close: jest.fn(),
    save: jest.fn(),
    saveMarkup: jest.fn(),
    ocrTable: jest.fn(),
    ocrText: jest.fn()
  },
  new Markup(
    new Map([
      [
        1,
        new PageMarkup(
          [
            new Label(152.3, 527, 50, 29, 'firstName', undefined, LabelType.VALUE, 'Pam', {}, 0.9)
          ],
          [
            new Table(
              [790, 1190],
              [550, 580],
              [],
              [
                new CellValue(0, 0, 'Test content', 0.7)
              ]
            )
          ]
        )
      ]
    ])
  ),
  new Settings(Mode.DEFAULT),
  {
    onClose: jest.fn()
  }
)

const MOCK_TARGET_ID = 'MOCK_TARGET_ID'

const MOCK_DOM_ELEMENT = 'MOCK_DOM_ELEMENT'

const validateMount = (targetId = MOCK_TARGET_ID, mockElement = MOCK_DOM_ELEMENT) => {
  const [[jsx, element]] = ReactDOM.render.mock.calls
  expect(document.getElementById).toHaveBeenCalledWith(targetId)
  expect(element).toEqual(mockElement)
  expect(jsx).toMatchSnapshot()
}

const validateUnmount = (targetId = MOCK_TARGET_ID) => {
  expect(document.getElementById).toHaveBeenCalledWith(targetId)
  expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalledWith(MOCK_DOM_ELEMENT)
}

describe('Entry Point', () => {
  const getElementById = document.getElementById

  beforeEach(() => {
    jest.resetModules()
    delete window.LABELING_TOOL_SHIM_TARGET_ID
    document.getElementById = jest.fn(() => MOCK_DOM_ELEMENT)
  })

  afterEach(() => {
    document.getElementById = getElementById
  })

  it('should render the application if global LABELING_TOOL_SHIM_TARGET_ID var is set on script load', async () => {
    window.LABELING_TOOL_SHIM_TARGET_ID = MOCK_TARGET_ID

    await import('@/application/entry')

    validateMount(window.LABELING_TOOL_SHIM_TARGET_ID)
  })

  it('should expose a window var with mount & unmount methods if global LABELING_TOOL_SHIM_TARGET_ID var is not set', async () => {
    await import('@/application/entry')
    const { mount, unmount } = window.LabelingTool

    expect(mount).toEqual(expect.any(Function))
    expect(unmount).toEqual(expect.any(Function))

    mount(MOCK_TARGET_ID, MOCK_CONFIG)
    validateMount(MOCK_TARGET_ID)

    unmount(MOCK_TARGET_ID)
    validateUnmount(MOCK_TARGET_ID)
  })
})
