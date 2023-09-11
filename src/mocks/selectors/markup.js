import { mockUuid } from '@/mocks/mockUuid'
import { Area } from '@/models/Area'
import { Label, LabelType } from '@/models/Label'
import { Relation } from '@/models/Relation'
import { Table, CellValue } from '@/models/Table'

jest.mock('uuid', () => mockUuid)

const mockLabels = [
  new Label(0.1, 0.2, 0.3, 0.4, 'MOCK_FIELD_1', 0, LabelType.KEY, 'MOCK FIELD KEY 1', {}, 0.8),
  new Label(0.5, 0.6, 0.7, 0.8, 'MOCK_FIELD_1', 0, LabelType.VALUE, 'MOCK FIELD VALUE 1', {}, 0.4),
  new Label(0.09, 0.10, 0.11, 0.12, 'MOCK_FIELD_2', 1, LabelType.KEY, 'MOCK FIELD KEY 2', {}, 0.77),
  new Label(0.13, 0.14, 0.15, 0.16, 'MOCK_FIELD_2', 1, LabelType.VALUE, 'MOCK FIELD VALUE 2', {}, 0.66)
]

const mockAreas = [
  new Area(0.1, 0.2, 0.3, 0.4),
  new Area(0.5, 0.6, 0.7, 0.8),
  new Area(0.09, 0.10, 0.11, 0.12),
  new Area(0.13, 0.14, 0.15, 0.16)
]

const mockTables = [
  new Table(
    [0.5, 0.6, 0.8],
    [0.303, 0.32, 0.336],
    [],
    [new CellValue(0, 0, 'value', 0.8)],
    {},
    'MOCK_FIELD_4'
  )
]

const mockRelations = [
  new Relation(mockLabels[0], mockLabels[1]),
  new Relation(mockLabels[2], mockLabels[3])
]
const mockPage = 1
const mockMarkupState = {
  [mockPage]: {
    labels: mockLabels,
    selectedLabelsIds: [
      mockLabels[0].uid
    ],
    initialLabels: mockLabels,
    areas: mockAreas,
    selectedAreasIds: [],
    initialAreas: mockAreas,
    tables: mockTables,
    selectedTablesIds: [],
    initialTables: mockTables,
    modifiedObjects: []
  }
}

const markupSelector = jest.fn(() => mockMarkupState)

const modifiedObjectsSelector = jest.fn(() => [])

const pageLabelsSelector = jest.fn(() => mockLabels)

const pageTablesSelector = jest.fn(() => mockTables)

const pageSelectedLabelsSelector = jest.fn(() => [mockLabels[0]])

const pageRelationsSelector = jest.fn(() => mockRelations)

const pageAreasSelector = jest.fn(() => mockAreas)

const pageSelectedAreasSelector = jest.fn(() => [mockAreas[0]])

const pageSelectedTablesSelector = jest.fn(() => [])

const pageMarkupSelector = jest.fn(() => ({
  labels: mockLabels,
  areas: mockAreas,
  tables: mockTables
}))

const pageMarkupStateSelector = jest.fn(() => mockMarkupState[mockPage])

const pageSelectedMarkupObjectsSelector = jest.fn(() => [mockLabels[0]])

const mockMarkupSelectors = {
  markupSelector,
  modifiedObjectsSelector,
  pageLabelsSelector,
  pageAreasSelector,
  pageTablesSelector,
  pageSelectedAreasSelector,
  pageSelectedLabelsSelector,
  pageSelectedTablesSelector,
  pageRelationsSelector,
  pageMarkupStateSelector,
  pageMarkupSelector,
  pageSelectedMarkupObjectsSelector
}

export {
  mockMarkupSelectors,
  mockTables
}
