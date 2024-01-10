
import { Label, LabelType } from '@/models/Label'

const MOCK_FIELD_CODE_1 = 'mockFieldCode1'
const MOCK_FIELD_CODE_2 = 'mockFieldCode2'

const MOCK_LABEL_2 = new Label(5, 6, 7, 8, MOCK_FIELD_CODE_2, undefined, LabelType.VALUE, 'mock content 2')
const MOCK_LABEL_3 = new Label(9, 10, 11, 12, MOCK_FIELD_CODE_1, 0, LabelType.VALUE, 'mock content 3')

describe('Model: Label', () => {
  describe('Label.getName', () => {
    it('should return correct name in case no index is provided', () => {
      expect(Label.getName(MOCK_LABEL_2)).toEqual(`${MOCK_LABEL_2.fieldCode}.${MOCK_LABEL_2.type}`)
    })

    it('should return correct name in case index is provided', () => {
      expect(Label.getName(MOCK_LABEL_3)).toEqual(`${MOCK_LABEL_3.fieldCode}.${MOCK_LABEL_3.index}.${MOCK_LABEL_3.type}`)
    })
  })
})
