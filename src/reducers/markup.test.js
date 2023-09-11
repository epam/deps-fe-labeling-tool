import { mockAction } from '@/mocks/mockAction'
import { mockUuid } from '@/mocks/mockUuid'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import {
  insertCopiedMarkup,
  resetDefault,
  addLabels,
  removeLabels,
  updateLabels,
  selectLabels,
  clearSelection,
  addTables,
  updateTables,
  removeTables,
  selectTables,
  storeMarkup,
  storeAssignedMarkup,
  storeImportMarkup,
  addAreas,
  removeAreas,
  updateAreas,
  selectAreas,
  updateAllLabels,
  updateAllTables,
  updateInitialMarkup
} from '@/actions/markup'
import { FieldType } from '@/enums/FieldType'
import { Area } from '@/models/Area'
import { Field } from '@/models/Field'
import { PairFieldMeta, ListFieldMeta } from '@/models/FieldMeta'
import { Label, LabelType } from '@/models/Label'
import { Markup, PageMarkup } from '@/models/Markup'
import { Rectangle } from '@/models/Rectangle'
import { Relation } from '@/models/Relation'
import { Table, CellValue } from '@/models/Table'
import { markupReducer } from '@/reducers/markup'

jest.mock('uuid', () => mockUuid)

const MOCK_PAGE = 1

const mockFiled1 = new Field(
  'MOCK_FIELD_1',
  'MOCK FIELD 1',
  FieldType.PAIR,
  new PairFieldMeta(FieldType.STRING, FieldType.STRING)
)
const mockFiled2 = new Field(
  'MOCK_FIELD_2',
  'MOCK FIELD 2',
  FieldType.STRING
)
const mockFiled3 = new Field(
  'MOCK_FIELD_3',
  'MOCK FIELD 3',
  FieldType.LIST,
  new ListFieldMeta(
    FieldType.PAIR,
    new PairFieldMeta(FieldType.STRING, FieldType.STRING)
  )
)
const mockFiled4 = new Field(
  'MOCK_FIELD_3',
  'MOCK FIELD 3',
  FieldType.LIST,
  new ListFieldMeta(FieldType.STRING)
)
const mockFiled5 = new Field(
  'MOCK_FIELD_5',
  'MOCK FIELD 5',
  FieldType.CHECKMARK
)

const mockFiledTable = new Field(
  'codeTable',
  'MOCK Table',
  FieldType.TABLE
)

const mockFiledTableList = new Field(
  'codeTableList',
  'MOCK FIELD 1',
  FieldType.LIST,
  new ListFieldMeta(FieldType.TABLE)
)

const areaA = new Area(1, 1, 1, 1)
const areaB = new Area(1, 1, 1, 1)
const areaC = new Area(3, 3, 3, 3)

const labelPairKey = new Label(1, 1, 1, 1, mockFiled1.code, undefined, LabelType.KEY, 'mock content A')
const labelPairValue = new Label(2, 2, 2, 2, mockFiled1.code, undefined, LabelType.VALUE, 'mock content B')
const labelString = new Label(3, 3, 3, 3, mockFiled2.code, undefined, LabelType.VALUE, 'mock content C')
const labelPairKeyList = new Label(4, 4, 4, 4, mockFiled3.code, 0, LabelType.KEY, 'mock content D')
const labelPairValueList = new Label(5, 5, 5, 5, mockFiled3.code, 0, LabelType.VALUE, 'mock content E')
const labelStringList = new Label(6, 6, 6, 6, mockFiled4.code, 0, LabelType.VALUE, 'mock content F')
const labelCheckmark = new Label(7, 7, 7, 7, mockFiled5.code, undefined, LabelType.CHECKMARK, false)

const relationA = new Relation(labelPairKey, labelPairValue)
const relationB = new Relation(labelPairKeyList, labelPairValueList)

const tableA = Table.fromRectangle(
  new Rectangle(10, 10, 100, 100)
)

const tableB = Table.fromRectangle(
  new Rectangle(20, 20, 200, 200)
)

const tableNotAssigned = Table.fromRectangle(
  new Rectangle(50, 50, 500, 500)
)

const tableAssigned = new Table(
  [0.790, 0.89],
  [0.550, 0.770],
  [],
  [
    new CellValue(0, 0, 'Test content')
  ],
  { meta: 'some meta' },
  mockFiledTable.code,
  undefined
)

const tableAssignedToList = new Table(
  [0.790, 0.888],
  [0.550, 0.777],
  [],
  [
    new CellValue(0, 0, 'Test content')
  ],
  { meta: 'some meta' },
  mockFiledTableList.code,
  0
)

let lastMockUid = tableNotAssigned.uid

const defaultPageState = {
  areas: [],
  labels: [],
  tables: [],
  initialAreas: [],
  initialLabels: [],
  initialTables: [],
  selectedAreasIds: [],
  selectedLabelsIds: [],
  selectedTablesIds: [],
  modifiedObjects: []
}

const getStateForPage = (mockPage, updates) => ({
  [mockPage]: {
    ...defaultPageState,
    ...updates
  }
})

const unknownAction = {
  type: 'unknown'
}

describe('Reducer: markup', () => {
  let defaultState

  beforeEach(() => {
    defaultState = markupReducer(undefined, mockAction)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual({})
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(markupReducer({}, action)).toEqual(defaultState)
  })

  it('should ignore unknown action', () => {
    expect(markupReducer(defaultState, unknownAction)).toEqual({})
  })

  it('should ignore invalid page action', () => {
    expect(markupReducer(defaultState, clearSelection([1]))).toEqual({})
  })

  it('should handle addLabels action correctly', () => {
    const addedLabels = [labelPairKey, labelPairValue]
    const action = addLabels(MOCK_PAGE, addedLabels)
    const expectedState = getStateForPage(
      MOCK_PAGE,
      {
        labels: addedLabels,
        modifiedObjects: [labelPairKey.uid, labelPairValue.uid]
      }
    )

    expect(markupReducer(defaultState, action)).toEqual(expectedState)
  })

  it('should handle updateInitialMarkup action correctly', () => {
    const pageOneState = getStateForPage(1, {
      labels: [labelPairKey],
      tables: [tableA],
      areas: [areaA]
    })

    const pageTwoState = getStateForPage(2, {
      labels: [labelPairKey],
      tables: [tableA],
      areas: [areaA]
    })

    const stateBefore = {
      ...pageOneState,
      ...pageTwoState
    }

    const afterPageOne = getStateForPage(1, {
      labels: [labelPairKey],
      tables: [tableA],
      areas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      initialAreas: [areaA]
    })

    const afterPageTwo = getStateForPage(2, {
      labels: [labelPairKey],
      tables: [tableA],
      areas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      initialAreas: [areaA]
    })

    const afterState = {
      ...afterPageOne,
      ...afterPageTwo
    }
    const action = updateInitialMarkup()

    expect(markupReducer(stateBefore, action)).toEqual(afterState)
  })

  it('should handle updateInitialMarkup action correctly when objects empty', () => {
    const pageOneState = getStateForPage(1, {
      labels: null,
      tables: null,
      areas: null
    })

    const pageTwoState = getStateForPage(2, {
      labels: [labelPairKey],
      tables: [tableA],
      areas: [areaA]
    })

    const stateBefore = {
      ...pageOneState,
      ...pageTwoState
    }

    const afterPageOne = getStateForPage(1, {
      labels: null,
      tables: null,
      areas: null,
      initialLabels: [],
      initialTables: [],
      initialAreas: []
    })

    const afterPageTwo = getStateForPage(2, {
      labels: [labelPairKey],
      tables: [tableA],
      areas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      initialAreas: [areaA]
    })

    const afterState = {
      ...afterPageOne,
      ...afterPageTwo
    }
    const action = updateInitialMarkup()

    expect(markupReducer(stateBefore, action)).toEqual(afterState)
  })

  it('should handle storeMarkup action correctly', () => {
    const pageOneState = getStateForPage(1, {
      areas: [areaA],
      labels: [labelPairKey],
      tables: [tableA],
      initialAreas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelPairKey.uid],
      selectedTablesIds: [tableA.uid],
      modifiedObjects: []
    })

    const pageTwoState = getStateForPage(2, {
      areas: [areaA],
      labels: [labelPairKey],
      tables: [tableA],
      initialAreas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelPairKey.uid],
      selectedTablesIds: [tableA.uid],
      modifiedObjects: []
    })

    const stateBefore = {
      ...pageOneState,
      ...pageTwoState
    }

    const action = storeMarkup(
      new Markup(
        new Map([
          [
            1,
            new PageMarkup([labelPairKey, labelPairValue])
          ],
          [
            2,
            new PageMarkup(null, [tableA, tableB])
          ]
        ])
      )
    )

    const afterPageOne = getStateForPage(1, {
      areas: [],
      labels: [labelPairKey, labelPairValue],
      tables: [],
      initialAreas: [],
      initialLabels: [labelPairKey, labelPairValue],
      initialTables: [],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: [],
      modifiedObjects: []
    })

    const afterPageTwo = getStateForPage(2, {
      areas: [],
      labels: [],
      tables: [tableA, tableB],
      initialAreas: [],
      initialLabels: [],
      initialTables: [tableA, tableB],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: [],
      modifiedObjects: []
    })

    const afterState = {
      ...afterPageOne,
      ...afterPageTwo
    }

    expect(markupReducer(stateBefore, action)).toEqual(afterState)
  })

  it('should handle storeAssignedMarkup action correctly with labels', () => {
    const newMarkup = new Markup(
      new Map([
        [
          1,
          new PageMarkup([labelPairKey, labelPairValue])
        ]
      ])
    )

    const action = storeAssignedMarkup(newMarkup)

    const afterState = getStateForPage(1, {
      areas: [],
      labels: [labelPairKey, labelPairValue],
      tables: [],
      initialAreas: [],
      initialLabels: [labelPairKey, labelPairValue],
      initialTables: [],
      modifiedObjects: [],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: []
    })

    expect(markupReducer(mockMarkupSelectors.markupSelector(), action)).toEqual(afterState)
  })

  it('should handle storeAssignedMarkup action correctly with tables', () => {
    const newMarkup = new Markup(
      new Map([
        [
          1,
          new PageMarkup(null, [tableA, tableB])
        ]
      ])
    )

    const action = storeAssignedMarkup(newMarkup)

    const afterState = getStateForPage(1, {
      areas: [],
      labels: [],
      tables: [tableA, tableB],
      initialAreas: [],
      initialLabels: [],
      initialTables: [tableA, tableB],
      modifiedObjects: [],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: []
    })

    expect(markupReducer(mockMarkupSelectors.markupSelector(), action)).toEqual(afterState)
  })

  it('should handle storeImportMarkup action correctly', () => {
    const pageOneState = getStateForPage(1, {
      areas: [areaA],
      labels: [labelPairKey],
      tables: [tableA],
      initialAreas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelPairKey.uid],
      selectedTablesIds: [tableA.uid],
      modifiedObjects: []
    })

    const pageTwoState = getStateForPage(2, {
      areas: [areaA],
      labels: [labelPairKey],
      tables: [tableA],
      initialAreas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelPairKey.uid],
      selectedTablesIds: [tableA.uid],
      modifiedObjects: []
    })

    const stateBefore = {
      ...pageOneState,
      ...pageTwoState
    }

    const action = storeImportMarkup(
      new Markup(
        new Map([
          [
            1,
            new PageMarkup(
              [labelPairKey, labelPairValue],
              null,
              null
            )
          ],
          [
            2,
            new PageMarkup(
              null,
              [tableA, tableB],
              [areaC]
            )
          ]
        ])
      )
    )

    const afterPageOne = getStateForPage(1, {
      areas: [],
      labels: [labelPairKey, labelPairValue],
      tables: [],
      initialAreas: [],
      initialLabels: [],
      initialTables: [],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: [],
      modifiedObjects: [labelPairKey.uid, labelPairValue.uid]
    })

    const afterPageTwo = getStateForPage(2, {
      areas: [areaC],
      labels: [],
      tables: [tableA, tableB],
      initialAreas: [],
      initialLabels: [],
      initialTables: [],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: [],
      modifiedObjects: [areaC.uid, tableA.uid, tableB.uid]
    })

    const afterState = {
      ...afterPageOne,
      ...afterPageTwo
    }

    expect(markupReducer(stateBefore, action)).toEqual(afterState)
  })

  it('should handle storeImportMarkup action correctly when set empty markup', () => {
    const pageOneState = getStateForPage(1, {
      areas: [areaA],
      labels: [labelPairKey],
      tables: [tableA],
      initialAreas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelPairKey.uid],
      selectedTablesIds: [tableA.uid],
      modifiedObjects: []
    })

    const pageTwoState = getStateForPage(2, {
      areas: [areaA],
      labels: [labelPairKey],
      tables: [tableA],
      initialAreas: [areaA],
      initialLabels: [labelPairKey],
      initialTables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelPairKey.uid],
      selectedTablesIds: [tableA.uid],
      modifiedObjects: []
    })

    const stateBefore = {
      ...pageOneState,
      ...pageTwoState
    }

    const action = storeImportMarkup(
      new Markup(
        new Map([
          [
            1,
            new PageMarkup(
              null,
              null,
              null
            )
          ],
          [
            2,
            new PageMarkup(
              null,
              null,
              null
            )
          ],
          [
            3,
            null
          ]
        ])
      )
    )

    const afterPageOne = getStateForPage(1, {
      areas: [],
      labels: [],
      tables: [],
      initialAreas: [],
      initialLabels: [],
      initialTables: [],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: [],
      modifiedObjects: []
    })

    const afterPageTwo = getStateForPage(2, {
      areas: [],
      labels: [],
      tables: [],
      initialAreas: [],
      initialLabels: [],
      initialTables: [],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: [],
      modifiedObjects: []
    })

    const afterPageThree = getStateForPage(3, {
      areas: [],
      labels: [],
      tables: [],
      initialAreas: [],
      initialLabels: [],
      initialTables: [],
      selectedAreasIds: [],
      selectedLabelsIds: [],
      selectedTablesIds: [],
      modifiedObjects: []
    })

    const afterState = {
      ...afterPageOne,
      ...afterPageTwo,
      ...afterPageThree
    }

    expect(markupReducer(stateBefore, action)).toEqual(afterState)
  })

  it('should handle removeLabels action correctly', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKey, labelPairValue, labelString],
      initialLabels: [labelPairKey, labelPairValue],
      modifiedObjects: [labelString.uid],
      selectedLabelsIds: [labelPairKey.uid, labelPairValue.uid]
    })

    const action = removeLabels(MOCK_PAGE, [labelPairKey, labelString])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [labelPairValue],
      initialLabels: [labelPairKey, labelPairValue],
      modifiedObjects: [labelPairKey.uid],
      selectedLabelsIds: [labelPairValue.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should update label in the state when dispatching updateLabels action', () => {
    const updatedC = {
      ...labelString,
      x: labelString.x - 42
    }

    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKey, labelPairValue, updatedC],
      initialLabels: [labelPairKey, labelPairValue, labelString],
      modifiedObjects: [labelString.uid]
    })

    const updatedA = {
      ...labelPairKey,
      x: labelPairKey.x - 42
    }

    const action = updateLabels(MOCK_PAGE, [updatedA, labelString])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        updatedA,
        labelPairValue,
        labelString
      ],
      initialLabels: [
        labelPairKey,
        labelPairValue,
        labelString
      ],
      modifiedObjects: [updatedA.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should update selected relations if updateLabels breaks the relation', () => {
    const labelC = new Label(
      3,
      3,
      3,
      3,
      relationB.to.fieldCode,
      relationB.to.index + 1,
      relationB.to.type
    )

    lastMockUid = labelC.uid

    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [relationB.from, relationB.to, labelC],
      initialLabels: [relationB.from, relationB.to, labelC]
    })

    const updatedFrom = {
      ...relationB.from,
      index: relationB.from.index + 1
    }

    const action = updateLabels(MOCK_PAGE, [updatedFrom])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [updatedFrom, relationB.to, labelC],
      initialLabels: [relationB.from, relationB.to, labelC],
      modifiedObjects: [updatedFrom.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should not update selected relations if updateLabels doesn\'t break the relation', () => {
    const labelC = new Label(
      3,
      3,
      3,
      3,
      'MOCK_FIELD_2'
    )

    lastMockUid = labelC.uid

    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [relationA.from, relationA.to, labelC]
    })

    const updatedC = {
      ...labelC,
      index: labelC.index + 1
    }

    const action = updateLabels(MOCK_PAGE, [updatedC])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        relationA.from,
        relationA.to,
        updatedC
      ],
      modifiedObjects: [updatedC.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle selectLabels action correctly', () => {
    const action = selectLabels(MOCK_PAGE, [labelPairKey])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      selectedLabelsIds: [labelPairKey.uid]
    })

    expect(markupReducer(defaultState, action)).toEqual(stateAfter)
  })

  it('should handle clearSelection action correctly', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      selectedLabelsIds: [labelPairKey.uid, labelPairValue.uid]
    })

    const action = clearSelection(MOCK_PAGE)

    const stateAfter = getStateForPage(MOCK_PAGE, {
      selectedLabelsIds: []
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should save new tables under state.tables with handling addTables', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      tables: []
    })

    const action = addTables(MOCK_PAGE, [tableA, tableB])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      tables: [tableA, tableB],
      modifiedObjects: [tableA.uid, tableB.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should update tables in state when handling updateTables', () => {
    const updatedTableC = {
      ...tableNotAssigned,
      w: tableNotAssigned.h + 100
    }

    const stateBefore = getStateForPage(MOCK_PAGE, {
      tables: [tableA, tableB, updatedTableC],
      initialTables: [tableA, tableB, tableNotAssigned],
      modifiedObjects: [tableNotAssigned.uid]
    })

    const updatedTableA = {
      ...tableA,
      w: tableB.h + 100
    }

    const action = updateTables(MOCK_PAGE, [updatedTableA, tableNotAssigned])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      tables: [
        updatedTableA,
        tableB,
        tableNotAssigned
      ],
      initialTables: [
        tableA,
        tableB,
        tableNotAssigned
      ],
      modifiedObjects: [updatedTableA.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should remove tables from state when handling removeTables', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      tables: [tableA, tableB, tableNotAssigned],
      initialTables: [tableA, tableB],
      modifiedObjects: [tableNotAssigned.uid],
      selectedTablesIds: [tableA.uid, tableB.uid]
    })

    const action = removeTables(MOCK_PAGE, [tableA, tableNotAssigned])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      tables: [tableB],
      initialTables: [tableA, tableB],
      selectedTablesIds: [tableB.uid],
      modifiedObjects: [tableA.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should save uid inside selectedTablesIds when handling selectTables', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      tables: [tableA],
      selectedTablesIds: []
    })

    const action = selectTables(MOCK_PAGE, [tableA])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      tables: [tableA],
      selectedTablesIds: [tableA.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should save new areas under state.areas with handling addAreas', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      areas: []
    })

    const action = addAreas(MOCK_PAGE, [areaA, areaB])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      areas: [areaA, areaB],
      modifiedObjects: [areaA.uid, areaB.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should update areas in state when handling updateAreas', () => {
    const updatedAreaC = {
      ...areaC,
      w: areaC.w + 100
    }

    const stateBefore = getStateForPage(MOCK_PAGE, {
      areas: [areaA, areaB, updatedAreaC],
      initialAreas: [areaA, areaB, areaC],
      modifiedObjects: [areaC.uid]
    })

    const updatedAreaA = {
      ...areaA,
      w: areaA.w + 100
    }

    const action = updateAreas(MOCK_PAGE, [updatedAreaA, areaC])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      areas: [
        updatedAreaA,
        areaB,
        areaC
      ],
      initialAreas: [
        areaA,
        areaB,
        areaC
      ],
      modifiedObjects: [updatedAreaA.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should remove areas from state when handling removeAreas', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      areas: [areaA, areaB, areaC],
      initialAreas: [areaA, areaB],
      modifiedObjects: [areaC.uid],
      selectedAreasIds: [areaA.uid, areaB.uid]
    })

    const action = removeAreas(MOCK_PAGE, [areaA, areaC])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      areas: [areaB],
      initialAreas: [areaA, areaB],
      selectedAreasIds: [areaB.uid],
      modifiedObjects: [areaA.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should save uid inside selectedAreasIds when handling selectAreas', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      areas: [areaA],
      selectedAreasIds: []
    })

    const action = selectAreas(MOCK_PAGE, [areaA])

    const stateAfter = getStateForPage(MOCK_PAGE, {
      areas: [areaA],
      selectedAreasIds: [areaA.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should reset fieldCode and set correct type and code for label single value field when handling updateAllLabels', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKey, labelPairValue, labelString]
    })

    const newLabel = {
      ...labelString,
      fieldCode: labelPairKey.fieldCode,
      type: LabelType.KEY
    }

    const action = updateAllLabels({
      label: newLabel,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        {
          ...labelPairKey,
          fieldCode: '',
          type: LabelType.UNASSIGNED,
          index: undefined
        },
        labelPairValue,
        newLabel
      ],
      modifiedObjects: [labelPairKey.uid, labelString.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should set correct index and type for label not single value field when handling updateAllLabels', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelString, labelStringList]
    })

    const newLabel = {
      ...labelString,
      fieldCode: labelStringList.fieldCode,
      index: 1
    }

    const action = updateAllLabels({
      label: newLabel,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        {
          ...newLabel,
          index: 1
        },
        labelStringList
      ],
      modifiedObjects: [newLabel.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should set correct type for label single value field and reset the same label when handling updateAllLabels', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKey, labelPairValue, labelString]
    })

    const newLabel = {
      ...labelString,
      fieldCode: labelPairValue.fieldCode,
      type: LabelType.VALUE
    }

    const action = updateAllLabels({
      label: newLabel,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        labelPairKey,
        {
          ...labelPairValue,
          fieldCode: '',
          type: LabelType.UNASSIGNED
        },
        newLabel
      ],
      modifiedObjects: [labelPairValue.uid, labelString.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should set correct index and type for label not single value field when it was modified before when handling updateAllLabels', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKeyList, labelPairValueList, labelString],
      initialLabels: [labelPairKeyList, labelPairValueList, labelString],
      modifiedObjects: [labelPairValueList.uid]
    })

    const newLabel = {
      ...labelString,
      fieldCode: labelPairValueList.fieldCode,
      type: LabelType.VALUE,
      index: 1
    }

    const action = updateAllLabels({
      label: newLabel,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        labelPairKeyList,
        labelPairValueList,
        {
          ...newLabel,
          index: 1
        }
      ],
      modifiedObjects: [labelPairValueList.uid, labelString.uid],
      initialLabels: [labelPairKeyList, labelPairValueList, labelString]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should reset fieldCode and filter modified objects when handling updateAllLabels', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKey, labelPairValue],
      initialLabels: [{
        ...labelPairKey,
        fieldCode: '',
        type: LabelType.UNASSIGNED
      }],
      modifiedObjects: [labelPairKey.uid]
    })

    const newLabel = {
      ...labelPairValue,
      type: LabelType.KEY
    }

    const action = updateAllLabels({
      label: newLabel,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        { ...labelPairKey, fieldCode: '', type: LabelType.UNASSIGNED },
        newLabel
      ],
      initialLabels: [{
        ...labelPairKey,
        fieldCode: '',
        type: LabelType.UNASSIGNED
      }],
      modifiedObjects: [newLabel.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should set correct type and value for label checkmark value field and reset the same label when handling updateAllLabels', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelCheckmark, labelString]
    })

    const newLabel = {
      ...labelString,
      fieldCode: labelCheckmark.fieldCode,
      type: LabelType.CHECKMARK,
      content: false
    }

    const action = updateAllLabels({
      label: newLabel,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        {
          ...labelCheckmark,
          fieldCode: '',
          type: LabelType.UNASSIGNED
        },
        newLabel
      ],
      modifiedObjects: [labelCheckmark.uid, labelString.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should set the same type and fieldCode for label when handling updateAllLabels with multiAssign', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKey, labelPairValue, labelString]
    })

    const newLabel = {
      ...labelString,
      fieldCode: labelPairValue.fieldCode,
      type: LabelType.VALUE
    }

    const action = updateAllLabels({
      label: newLabel,
      multiAssign: true
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        labelPairKey,
        labelPairValue,
        newLabel
      ],
      modifiedObjects: [labelString.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should reset fieldCode of the same table, set correct modifiedObjects and set new table when handling updateAllTables', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      tables: [tableAssignedToList, tableAssigned]
    })

    const newTable = {
      ...tableAssignedToList,
      fieldCode: tableAssigned.fieldCode,
      index: undefined
    }

    const action = updateAllTables({
      table: newTable,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      tables: [
        newTable,
        {
          ...tableAssigned,
          fieldCode: '',
          type: LabelType.UNASSIGNED,
          index: undefined
        }
      ],
      modifiedObjects: [tableAssigned.uid, tableAssignedToList.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should set correct modifiedObjects, set new table with available index when handling updateAllTables', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      tables: [tableAssignedToList, tableAssigned]
    })

    const newTable = {
      ...tableAssigned,
      fieldCode: tableAssignedToList.fieldCode,
      index: 1
    }

    const action = updateAllTables({
      table: newTable,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      tables: [
        tableAssignedToList,
        {
          ...newTable,
          index: 1
        }
      ],
      modifiedObjects: [tableAssigned.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should set correct modifiedObjects and set new table when handling updateAllTables', () => {
    const initialTable = {
      ...tableAssigned,
      fieldCode: tableAssignedToList.fieldCode,
      index: 1
    }

    const stateBefore = getStateForPage(MOCK_PAGE, {
      tables: [tableAssignedToList, tableAssigned],
      initialTables: [tableAssignedToList, initialTable],
      modifiedObjects: [tableAssigned.uid]
    })

    const newTable = {
      ...tableAssigned,
      fieldCode: tableAssignedToList.fieldCode,
      index: 1
    }

    const action = updateAllTables({
      table: newTable,
      multiAssign: false
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      tables: [
        tableAssignedToList,
        newTable
      ],
      initialTables: [tableAssignedToList, initialTable],
      modifiedObjects: []
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should set the same fieldCode and index to the table when handling updateAllTables with multiAssign', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      tables: [tableAssignedToList, tableAssigned]
    })

    const newTable = {
      ...tableAssigned,
      fieldCode: tableAssignedToList.fieldCode,
      index: 1
    }

    const action = updateAllTables({
      table: newTable,
      multiAssign: true
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      tables: [
        tableAssignedToList,
        newTable
      ],
      modifiedObjects: [tableAssigned.uid]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should add correct markup correct when handling insertCopiedMarkup', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKey, labelPairKeyList],
      areas: [areaA],
      tables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelPairKey.uid, labelPairKeyList.uid],
      selectedTablesIds: [tableA.uid]
    })

    const copiedMarkup = new PageMarkup(
      stateBefore[MOCK_PAGE].labels,
      stateBefore[MOCK_PAGE].tables,
      stateBefore[MOCK_PAGE].areas
    )

    const action = insertCopiedMarkup(MOCK_PAGE, copiedMarkup)

    const copiedLabelA = Label.shift({
      ...labelPairKey,
      uid: `${++lastMockUid}`,
      index: undefined,
      type: LabelType.UNASSIGNED,
      fieldCode: ''
    })

    const copiedLabelD = Label.shift({
      ...labelPairKeyList,
      uid: `${++lastMockUid}`,
      index: undefined,
      type: LabelType.UNASSIGNED,
      fieldCode: ''
    })

    const copiedAreaA = Area.shift({
      ...areaA,
      uid: `${++lastMockUid}`
    })

    const copiedTableA = Table.shift({
      ...tableA,
      uid: `${++lastMockUid}`
    })

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        labelPairKey,
        labelPairKeyList,
        copiedLabelA,
        copiedLabelD
      ],
      areas: [
        areaA,
        copiedAreaA
      ],
      tables: [
        tableA,
        copiedTableA
      ],
      selectedAreasIds: [copiedAreaA.uid],
      selectedLabelsIds: [copiedLabelA.uid, copiedLabelD.uid],
      selectedTablesIds: [copiedTableA.uid],
      modifiedObjects: [
        copiedLabelA.uid,
        copiedLabelD.uid,
        copiedAreaA.uid,
        copiedTableA.uid
      ]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should add correct markup correct when handling insertCopiedMarkup in case empty payload for tables and areas', () => {
    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelPairKey],
      areas: [areaA],
      tables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelPairKey.uid, labelPairKeyList.uid],
      selectedTablesIds: [tableA.uid]
    })
    const copiedMarkup = new PageMarkup(
      stateBefore[MOCK_PAGE].labels
    )

    const copiedLabelA = Label.shift({
      ...labelPairKey,
      uid: `${++lastMockUid}`,
      index: undefined,
      type: LabelType.UNASSIGNED,
      fieldCode: ''
    })

    const action = insertCopiedMarkup(MOCK_PAGE, copiedMarkup)

    const stateAfter = getStateForPage(MOCK_PAGE, {
      labels: [
        labelPairKey,
        copiedLabelA
      ],
      areas: [
        areaA
      ],
      tables: [
        tableA
      ],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [copiedLabelA.uid],
      selectedTablesIds: [tableA.uid],
      modifiedObjects: [
        copiedLabelA.uid
      ]
    })

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should add markup correct when handling insertCopiedMarkup in case empty page markup', () => {
    const anotherPage = MOCK_PAGE + 10

    const stateBefore = getStateForPage(MOCK_PAGE, {
      labels: [labelString],
      areas: [areaA],
      tables: [tableA],
      selectedAreasIds: [areaA.uid],
      selectedLabelsIds: [labelString.uid],
      selectedTablesIds: [tableA.uid]
    })

    const copiedMarkup = new PageMarkup(
      stateBefore[MOCK_PAGE].labels
    )

    const copiedLabel = Label.shift({
      ...labelString,
      index: undefined,
      type: LabelType.UNASSIGNED,
      fieldCode: '',
      uid: `${++lastMockUid}`
    })

    const action = insertCopiedMarkup(anotherPage, copiedMarkup)

    const anotherPageState = getStateForPage(anotherPage, {
      labels: [copiedLabel],
      areas: [],
      tables: [],
      selectedAreasIds: [],
      selectedLabelsIds: [copiedLabel.uid],
      selectedTablesIds: [],
      modifiedObjects: [copiedLabel.uid]
    })

    const stateAfter = {
      ...stateBefore,
      ...anotherPageState
    }

    expect(markupReducer(stateBefore, action)).toEqual(stateAfter)
  })
})
