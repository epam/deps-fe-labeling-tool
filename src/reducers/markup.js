import has from 'lodash/has'
import { handleActions } from 'redux-actions'
import {
  insertCopiedMarkup,
  resetDefault,
  addLabels,
  storeMarkup,
  storeAssignedMarkup,
  storeImportMarkup,
  updateLabels,
  removeLabels,
  selectLabels,
  clearSelection,
  addTables,
  selectTables,
  updateTables,
  removeTables,
  updateAllLabels,
  updateAllTables,
  updateInitialMarkup
} from '@/actions/markup'
import { Label, LabelType } from '@/models/Label'
import { Table } from '@/models/Table'
import { isEqual } from '@/utils/isEqual'

const defaultState = {}

const setModifiedObjectsDuringUpdates = (updatedObjects, initialObjects, modifiedObjects) => {
  let newModifiedObjects = [...modifiedObjects]
  updatedObjects.forEach((object) => {
    const initialObject = initialObjects.find((io) => io.uid === object.uid)
    if (isEqual(object, initialObject)) {
      newModifiedObjects = newModifiedObjects.filter((mo) => mo !== object.uid)
    } else {
      newModifiedObjects = [...new Set([...newModifiedObjects, object.uid])]
    }
  })
  return newModifiedObjects
}

const setModifiedObjectsDuringRemove = (idsToRemove, initialObjects, modifiedObjects) => {
  let newModifiedObjects = [...modifiedObjects]
  idsToRemove.forEach((id) => {
    const initialObject = initialObjects.find((initialObject) => initialObject.uid === id)
    if (initialObject && !newModifiedObjects.includes(initialObject.uid)) {
      newModifiedObjects.push(id)
    } else {
      newModifiedObjects = newModifiedObjects.filter((mo) => mo !== id)
    }
  })
  return newModifiedObjects
}

const addLabelsHandler = (state, action) => {
  const modifiedObjects = [...state.modifiedObjects]

  action.payload.labels.forEach((label) => {
    modifiedObjects.push(label.uid)
  })

  return {
    ...state,
    modifiedObjects,
    labels: [
      ...state.labels,
      ...action.payload.labels
    ]
  }
}

const storeMarkupHandler = (state, action) => {
  const markup = action.payload
  return Object.entries(markup).reduce((newState, [page, pageMarkup]) => ({
    ...newState,
    [page]: {
      ...state[page],
      labels: (pageMarkup && pageMarkup.labels) || [],
      initialLabels: (pageMarkup && pageMarkup.labels) || [],
      tables: (pageMarkup && pageMarkup.tables) || [],
      initialTables: (pageMarkup && pageMarkup.tables) || [],
      modifiedObjects: [],
      selectedLabelsIds: [],
      selectedTablesIds: []
    }
  }), {})
}

const updateMarkupHandler = (state, action) => {
  const getUnassignedMarkup = (markup) => markup.filter((m) => m.fieldCode === '')

  const getUpdatedMarkup = (oldMarkup, newMarkup) => ({
    labels: [
      ...newMarkup.labels || [],
      ...getUnassignedMarkup(oldMarkup.labels)
    ],
    tables: [
      ...newMarkup.tables || [],
      ...getUnassignedMarkup(oldMarkup.tables)
    ]
  })

  return Object.entries(action.payload).reduce((newState, [page, pageMarkup]) => {
    const updatedMarkup = getUpdatedMarkup(state[page], pageMarkup)

    return {
      ...newState,
      [page]: {
        ...state[page],
        labels: updatedMarkup.labels,
        initialLabels: updatedMarkup.labels,
        tables: updatedMarkup.tables,
        initialTables: updatedMarkup.tables,
        modifiedObjects: [],
        selectedLabelsIds: [],
        selectedTablesIds: []
      }
    }
  }, {})
}

const storeImportMarkupHandler = (state, action) => {
  const markup = action.payload
  return Object.entries(markup).reduce((newState, [page, pageMarkup]) => ({
    ...newState,
    [page]: (() => {
      let modifiedObjects = []
      if (pageMarkup) {
        modifiedObjects = pageMarkup.labels ? [...modifiedObjects, ...pageMarkup.labels.map((label) => label.uid)] : modifiedObjects
        modifiedObjects = pageMarkup.tables ? [...modifiedObjects, ...pageMarkup.tables.map((table) => table.uid)] : modifiedObjects
      }
      return {
        ...state[page],
        labels: (pageMarkup && pageMarkup.labels) || [],
        initialLabels: [],
        tables: (pageMarkup && pageMarkup.tables) || [],
        initialTables: [],
        modifiedObjects,
        selectedLabelsIds: [],
        selectedTablesIds: []
      }
    })()
  }), {})
}

const getUpdatedStateByCriteria = (markup, criteria, props) => {
  const criteriaEntries = Object.entries(criteria)
  const updatedObjects = {}

  const update = (objects, page, initialKey) => {
    let updatedObject

    return objects.map((o) => {
      if (criteriaEntries.every(([key, value]) => has(o, key) && o[key] === value)) {
        updatedObject = {
          ...o,
          ...props
        }
        let modifiedObjects = [...markup[page].modifiedObjects]
        const initialObject = markup[page][initialKey].find((initial) => initial?.uid === o.uid) ?? {}
        if (isEqual(initialObject, updatedObject) && modifiedObjects.includes(o.uid)) {
          modifiedObjects = modifiedObjects.filter((mo) => mo !== o.uid)
        } else {
          modifiedObjects = [...new Set([...modifiedObjects, o.uid])]
        }
        updatedObjects[page] = modifiedObjects
        return updatedObject
      }
      return o
    })
  }

  const updatedState = Object.entries(markup).reduce((newState, [page, pageMarkup]) => ({
    ...newState,
    [page]: {
      ...markup[page],
      labels: update(pageMarkup.labels, page, 'initialLabels'),
      tables: update(pageMarkup.tables, page, 'initialTables')
    }
  }), {})

  if (!isEqual(updatedObjects, {})) {
    for (const [key, value] of Object.entries(updatedObjects)) {
      updatedState[key].modifiedObjects = value
    }
  }

  return updatedState
}

const updateLabelsHandler = (state, action) => {
  const modifiedObjects = setModifiedObjectsDuringUpdates(
    action.payload.labels,
    state.initialLabels,
    state.modifiedObjects
  )

  const updatedLabels = state.labels.map((currentLabel) => {
    const updatedLabel = action.payload.labels.find((l) => l.uid === currentLabel.uid)
    if (!updatedLabel) {
      return currentLabel
    }

    return {
      ...currentLabel,
      ...updatedLabel
    }
  })

  return ({
    ...state,
    modifiedObjects,
    labels: updatedLabels
  })
}
const removeLabelsHandler = (state, action) => {
  const idsToRemove = action.payload.labels.map((label) => label.uid)
  const modifiedObjects = setModifiedObjectsDuringRemove(
    idsToRemove,
    state.initialLabels,
    state.modifiedObjects
  )

  return {
    ...state,
    modifiedObjects,
    labels: state.labels.filter((label) => (
      !idsToRemove.includes(label.uid)
    )),
    selectedLabelsIds: state.selectedLabelsIds.filter((uid) => (
      !idsToRemove.includes(uid)
    ))
  }
}

const selectLabelsHandler = (state, action) => ({
  ...state,
  selectedLabelsIds: action.payload.labels.map((obj) => obj.uid)
})

const addTablesHandler = (state, action) => {
  const modifiedObjects = [...state.modifiedObjects]

  action.payload.tables.forEach((table) => {
    modifiedObjects.push(table.uid)
  })

  return ({
    ...state,
    modifiedObjects,
    tables: [
      ...state.tables,
      ...action.payload.tables
    ]
  })
}

const selectTablesHandler = (state, action) => ({
  ...state,
  selectedTablesIds: action.payload.tables.map((table) => table.uid)
})

const updateTablesHandler = (state, action) => {
  const modifiedObjects = setModifiedObjectsDuringUpdates(
    action.payload.tables,
    state.initialTables,
    state.modifiedObjects
  )

  return ({
    ...state,
    modifiedObjects,
    tables: state.tables.map((currentTable) => {
      const updatedTable = action.payload.tables.find((table) => table.uid === currentTable.uid)
      if (!updatedTable) {
        return currentTable
      }
      return {
        ...updatedTable
      }
    })
  })
}

const removeTablesHandler = (state, action) => {
  const idsToRemove = action.payload.tables.map((table) => table.uid)
  const modifiedObjects = setModifiedObjectsDuringRemove(
    idsToRemove,
    state.initialTables,
    state.modifiedObjects
  )

  return {
    ...state,
    modifiedObjects,
    tables: state.tables.filter((table) => (
      !idsToRemove.includes(table.uid)
    )),
    selectedTablesIds: state.selectedTablesIds.filter((uid) => (
      !idsToRemove.includes(uid)
    ))
  }
}

const clearSelectionHandler = (state) => ({
  ...state,
  selectedLabelsIds: [],
  selectedTablesIds: []
})

const resetDefaultHandler = () => (defaultState)

const updateInitialMarkupHandler = (state, action) => {
  return Object.entries(state).reduce((newState, [page, pageMarkup]) => ({
    ...newState,
    [page]: {
      ...state[page],
      initialLabels: (pageMarkup && pageMarkup.labels) || [],
      initialTables: (pageMarkup && pageMarkup.tables) || [],
      modifiedObjects: []
    }
  }
  ), {})
}

const resetObjectAndGetNewState = (object, state) => {
  const criteria = {
    uid: object.uid
  }

  const update = {
    fieldCode: '',
    type: LabelType.UNASSIGNED,
    index: undefined
  }

  return getUpdatedStateByCriteria(state, criteria, update)
}

const updateObjectAndGetNewState = (object, state, fieldCode, index, type, content) => {
  const criteria = {
    uid: object.uid
  }

  const update = {
    fieldCode,
    index
  }

  content !== undefined && (
    update.content = content
  )

  type && (update.type = type)

  return getUpdatedStateByCriteria(state, criteria, update)
}

const wrapInPayload = (payload) => ({ payload })

// TODO: #2700
const updateAllLabelsHandler = (state, action) => {
  const { multiAssign, label } = action.payload
  let newState = state

  if (!multiAssign) {
    const allLabels = Object.entries(newState).reduce(
      (acc, [page, pageMarkup]) => ([...acc, ...pageMarkup.labels]),
      []
    )

    const sameLabel = Label.getSameLabel(label, allLabels)
    newState = sameLabel ? resetObjectAndGetNewState(sameLabel, newState) : newState
  }

  return updateObjectAndGetNewState(
    label,
    newState,
    label.fieldCode,
    label.index,
    label.type,
    label.content
  )
}

// TODO: #2700
const updateAllTablesHandler = (state, action) => {
  const { multiAssign, table } = action.payload
  let newState = state

  if (!multiAssign) {
    const allTables = Object.entries(newState).reduce(
      (acc, [page, pageMarkup]) => ([...acc, ...pageMarkup.tables]),
      []
    )

    const sameTable = Table.getSameTable(table, allTables)
    newState = sameTable ? resetObjectAndGetNewState(sameTable, newState) : newState
  }

  return updateObjectAndGetNewState(
    table,
    newState,
    table.fieldCode,
    table.index
  )
}

const insertCopiedMarkupHandler = (state, action) => {
  const { page, pageMarkup } = action.payload

  let newState = state

  if (!newState[page]) {
    newState = {
      ...newState,
      [page]: defaultPageState
    }
  }

  if (pageMarkup.labels?.length) {
    const labelsToInsert = pageMarkup.labels.map((label) => {
      const duplicatedLabel = Label.duplicate(label)
      return Label.shift(duplicatedLabel)
    })

    newState = {
      ...newState,
      [page]: addLabelsHandler(
        newState[page],
        wrapInPayload({ labels: labelsToInsert })
      )
    }
    newState = {
      ...newState,
      [page]: selectLabelsHandler(
        newState[page],
        wrapInPayload({ labels: labelsToInsert })
      )
    }
  }

  if (pageMarkup.tables?.length) {
    const tablesToInsert = pageMarkup.tables.map((table) => {
      const duplicatedTable = Table.duplicate(table)
      const siftedTable = Table.shift(duplicatedTable)
      return siftedTable
    })

    newState = {
      ...newState,
      [page]: addTablesHandler(
        newState[page],
        wrapInPayload({ tables: tablesToInsert })
      )
    }
    newState = {
      ...newState,
      [page]: selectTablesHandler(
        newState[page],
        wrapInPayload({ tables: tablesToInsert })
      )
    }
  }
  return newState
}

// TODO: #1431
const pageMarkupReducerMap = new Map([
  [
    addLabels,
    addLabelsHandler
  ],
  [
    insertCopiedMarkup,
    insertCopiedMarkupHandler
  ],
  [
    resetDefault,
    resetDefaultHandler
  ],
  [
    storeMarkup,
    storeMarkupHandler
  ],
  [
    storeImportMarkup,
    storeImportMarkupHandler
  ],
  [
    updateLabels,
    updateLabelsHandler
  ],
  [
    removeLabels,
    removeLabelsHandler
  ],
  [
    selectLabels,
    selectLabelsHandler
  ],
  [
    clearSelection,
    clearSelectionHandler
  ],
  [
    addTables,
    addTablesHandler
  ],
  [
    selectTables,
    selectTablesHandler
  ],
  [
    removeTables,
    removeTablesHandler
  ],
  [
    updateTables,
    updateTablesHandler
  ],
  [
    updateInitialMarkup,
    updateInitialMarkupHandler
  ],
  [
    updateAllTables,
    updateAllTablesHandler
  ],
  [
    updateAllLabels,
    updateAllLabelsHandler
  ],
  [
    storeAssignedMarkup,
    updateMarkupHandler
  ]
])

const defaultPageState = {
  labels: [],
  tables: [],
  initialLabels: [],
  initialTables: [],
  selectedLabelsIds: [],
  selectedTablesIds: [],
  modifiedObjects: []
}

const pageMarkupReducer = handleActions(
  pageMarkupReducerMap,
  defaultPageState
)

const storeMarkupReducer = handleActions(
  pageMarkupReducerMap,
  defaultState
)

const markupReducer = (state, action) => {
  if (!state) {
    return defaultState
  }

  const knownActions = Array.from(pageMarkupReducerMap.keys(), (k) => k.toString())
  if (!knownActions.includes(action && action.type)) {
    return state
  }

  if (
    action.type === insertCopiedMarkup.toString() ||
    action.type === storeMarkup.toString() ||
    action.type === storeAssignedMarkup.toString() ||
    action.type === storeImportMarkup.toString() ||
    action.type === resetDefault.toString() ||
    action.type === updateAllLabels.toString() ||
    action.type === updateAllTables.toString() ||
    action.type === updateInitialMarkup.toString()
  ) {
    return storeMarkupReducer(state, action)
  }

  const page = (action.payload && action.payload.page) || action.payload
  if (!Number.isInteger(page)) {
    return state
  }

  return {
    ...state,
    [page]: pageMarkupReducer(state[page] || defaultPageState, action)
  }
}

export {
  markupReducer
}
