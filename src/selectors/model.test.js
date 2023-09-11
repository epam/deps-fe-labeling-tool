import { FieldType } from '@/enums/FieldType'
import { fieldsSelector, listFieldsSelector } from '@/selectors/model'

describe('Selectors: model', () => {
  let defaultState

  beforeEach(() => {
    defaultState = {
      model: {
        fields: [
          { code: 'MockTest', fieldType: FieldType.STRING },
          { code: 'MockTest2', fieldType: FieldType.PAIR },
          { code: 'MockTest3', fieldType: FieldType.LIST }
        ]
      }
    }
  })

  it('should get correct fields value from state when using fieldsSelector', () => {
    expect(fieldsSelector(defaultState)).toEqual(defaultState.model.fields)
  })

  it('should get fields with fieldType "list" using listFieldsSelector', () => {
    expect(listFieldsSelector(defaultState)).toEqual([defaultState.model.fields[2]])
  })
})
