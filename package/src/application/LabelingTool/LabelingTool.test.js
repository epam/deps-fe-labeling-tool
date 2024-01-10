import { mockUuid } from '@/mocks/mockUuid'
import { mockOcrEngine } from '@/mocks/selectors/ocr'
import React from 'react'
import { shallow } from 'enzyme'
import { LabelingTool } from '@/application/LabelingTool'
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
jest.mock('@/assets/pdfs/Labeling_Tool_Guide.pdf', () => { })

const mockOcrLanguage = new OcrLanguage(KnownLanguage.ENGLISH, 'English')

describe('Application: LabelingTool', () => {
  describe('component', () => {
    let defaultProps
    let wrapper

    beforeEach(() => {
      defaultProps = {
        config: new Config(
          new Document(
            [
              'MOCK_PAGE_URL'
            ],
            mockOcrLanguage.code,
            'testName',
            'testEngine',
            'extraName'
          ),
          [
            new Field('MOCK_CODE1', 'MOCK_NAME1', FieldType.STRING),
            new Field('MOCK_CODE2', 'MOCK_NAME2', FieldType.STRING)
          ],
          {
            engines: [mockOcrEngine],
            languages: [mockOcrLanguage]
          },
          {
            close: jest.fn(),
            ocrText: jest.fn(),
            ocrTable: jest.fn(),
            save: jest.fn(),
            saveMarkup: jest.fn()
          },
          new Markup(
            new Map([
              [
                1,
                new PageMarkup(
                  [
                    new Label(152.3, 527, 50, 29, 'firstName', undefined, LabelType.VALUE, 'Pam', {}, 0.5)
                  ],
                  [
                    new Table(
                      [790, 1190],
                      [550, 580],
                      [],
                      [
                        new CellValue(0, 0, 'Test content', 0.1)
                      ],
                      { meta: 'some meta' },
                      '',
                      undefined
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
      }

      wrapper = shallow(<LabelingTool {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
