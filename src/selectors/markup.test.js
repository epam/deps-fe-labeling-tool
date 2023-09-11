import { Area } from '@/models/Area'
import { Label, LabelType } from '@/models/Label'
import { Rectangle } from '@/models/Rectangle'
import { Relation } from '@/models/Relation'
import { Table } from '@/models/Table'
import {
  markupSelector,
  pageLabelsSelector,
  pageSelectedLabelsSelector,
  pageRelationsSelector,
  pageTablesSelector,
  pageSelectedTablesSelector,
  pageAreasSelector,
  pageSelectedAreasSelector,
  modifiedObjectsSelector,
  pageMarkupStateSelector,
  pageMarkupSelector,
  pageSelectedMarkupObjectsSelector
} from '@/selectors/markup'

jest.mock('reselect', () => {
  const actual = jest.requireActual('reselect')
  return {
    ...actual,
    createSelectorCreator: jest.fn(() => actual.createSelector)
  }
})

const MOCK_PAGE = 1

const areaA = new Area(1, 1, 1, 1)
const areaB = new Area(2, 2, 2, 2)

const labelA = new Label(1, 1, 1, 1, 'MOCK_CODE_1', 0, LabelType.KEY)
const labelB = new Label(2, 2, 2, 2, 'MOCK_CODE_1', 0, LabelType.VALUE)

const relation = new Relation(labelA, labelB)

const tableA = Table.fromRectangle(
  new Rectangle(10, 10, 100, 100)
)

const tableB = Table.fromRectangle(
  new Rectangle(20, 20, 200, 200)
)

describe('Selectors: markup', () => {
  let defaultState

  beforeEach(() => {
    defaultState = {
      pagination: {
        currentPage: 1
      },
      markup: {
        present: {
          [MOCK_PAGE]: {
            labels: [
              labelA,
              labelB
            ],
            selectedLabelsIds: [
              labelA.uid
            ],
            relations: [
              relation
            ],
            tables: [
              tableA,
              tableB
            ],
            selectedTablesIds: [
              tableA.uid
            ],
            areas: [
              areaA,
              areaB
            ],
            selectedAreasIds: [
              areaA.uid
            ]
          }
        }
      }
    }
  })

  it('should get markup from state when using markupSelector', () => {
    expect(
      markupSelector(defaultState)
    ).toEqual(
      {
        [MOCK_PAGE]: {
          labels: [
            labelA,
            labelB
          ],
          tables: [
            tableA,
            tableB
          ],
          areas: [
            areaA,
            areaB
          ]
        }
      }
    )
  })

  it('should get null in case there are no markup from state when using markupSelector', () => {
    defaultState.markup.present = {}
    expect(markupSelector(defaultState)).toEqual(null)
  })

  it('should get null in case there are no objects in markup from state when using markupSelector', () => {
    defaultState.markup.present = {
      1: {
        labels: []
      }
    }
    expect(markupSelector(defaultState)).toEqual(null)
  })

  it('should get modifiedObjects in case it exist in markup from state when using modifiedObjectsSelector', () => {
    defaultState.markup.present = {
      1: {
        labels: [],
        modifiedObjects: ['1']
      }
    }
    expect(modifiedObjectsSelector(defaultState)).toEqual({ 1: ['1'] })
  })

  it('should get null in case they are not exist in markup from state when using markupSelector', () => {
    defaultState.markup.present = {
      1: {
        labels: [],
        modifiedObjects: []
      }
    }
    expect(modifiedObjectsSelector(defaultState)).toEqual(null)
  })

  it('should get labels from state when using pagelabelsSelector', () => {
    expect(
      pageLabelsSelector(defaultState)
    ).toEqual(
      [labelA, labelB]
    )
  })

  it('should get selected labels from state when using selectedLabelsSelector', () => {
    expect(
      pageSelectedLabelsSelector(defaultState)
    ).toEqual(
      [labelA]
    )
  })

  it('should return empty array for non existing page when using pageLabelsSelector', () => {
    defaultState.pagination.currentPage = 2
    expect(
      pageLabelsSelector(defaultState)
    ).toEqual(
      []
    )
  })

  it('should return empty array for non existing page when using pageSelectedLabelsSelector', () => {
    defaultState.pagination.currentPage = 2
    expect(
      pageSelectedLabelsSelector(defaultState)
    ).toEqual(
      []
    )
  })

  it('should return relations for the current page when calling pageRelationSelector', () => {
    expect(
      pageRelationsSelector(defaultState)
    ).toEqual([
      relation
    ])
  })

  it('should return page tables when calling to pageTablesSelector', () => {
    expect(
      pageTablesSelector(defaultState)
    ).toEqual(
      [tableA, tableB]
    )
  })

  it('should return empty array for non existing page when using pageTablesSelector', () => {
    defaultState.pagination.currentPage = 2
    expect(
      pageTablesSelector(defaultState)
    ).toEqual(
      []
    )
  })

  it('should get selected tables from state when using pageSelectedTablesSelector', () => {
    expect(
      pageSelectedTablesSelector(defaultState)
    ).toEqual(
      [tableA]
    )
  })

  it('should return empty array for non existing page when using pageSelectedTablesSelector', () => {
    defaultState.pagination.currentPage = 2
    expect(
      pageSelectedTablesSelector(defaultState)
    ).toEqual(
      []
    )
  })

  it('should return page tables when calling to pageAreasSelector', () => {
    expect(
      pageAreasSelector(defaultState)
    ).toEqual(
      [areaA, areaB]
    )
  })

  it('should return empty array for non existing page when using pageAreasSelector', () => {
    defaultState.pagination.currentPage = 2
    expect(
      pageAreasSelector(defaultState)
    ).toEqual(
      []
    )
  })

  it('should get selected tables from state when using pageSelectedAreasSelector', () => {
    expect(
      pageSelectedAreasSelector(defaultState)
    ).toEqual(
      [areaA]
    )
  })

  it('should return empty array for non existing page when using pageSelectedAreasSelector', () => {
    defaultState.pagination.currentPage = 2
    expect(
      pageSelectedAreasSelector(defaultState)
    ).toEqual(
      []
    )
  })

  it('should get page markup from state when using pageMarkupStateSelector', () => {
    expect(
      pageMarkupStateSelector(defaultState)
    ).toEqual(defaultState.markup.present[MOCK_PAGE])
  })

  it('should get page markup from general ​markup when using pageMarkupSelector', () => {
    expect(
      pageMarkupSelector(defaultState)
    ).toEqual(
      {
        labels: [
          labelA,
          labelB
        ],
        tables: [
          tableA,
          tableB
        ],
        areas: [
          areaA,
          areaB
        ]
      }
    )
  })

  it('should get empty page markup from empty  general ​markup when using pageMarkupSelector', () => {
    defaultState.markup.present = {}
    expect(
      pageMarkupSelector(defaultState)
    ).toEqual({})
  })

  it('should get selected markup objects from state when using pageSelectedMarkupObjectsSelector', () => {
    expect(
      pageSelectedMarkupObjectsSelector(defaultState)
    ).toEqual([labelA, tableA])
  })
})
