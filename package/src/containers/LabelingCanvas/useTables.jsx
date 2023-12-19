import { useCallback } from 'react'
import {
  useSelector,
  useDispatch,
  batch
} from 'react-redux'
import {
  addTables,
  removeTables,
  selectTables,
  updateTables
} from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { SidebarContent } from '@/enums/SidebarContent'
import { Table, TABLE_TYPE_NAME } from '@/models/Table'
import {
  pageSelectedTablesSelector,
  pageTablesSelector
} from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { activeSidebarSelector } from '@/selectors/ui'
import { arraysEqual } from '@/utils/array'

const useTables = () => {
  const dispatch = useDispatch()

  const currentPage = useSelector(currentPageSelector)
  const tables = useSelector(pageTablesSelector)
  const selectedTables = useSelector(pageSelectedTablesSelector)
  const activeSidebar = useSelector(activeSidebarSelector)

  const createTables = useCallback((rect) => {
    const newTable = Table.fromRectangle(rect)
    dispatch(addTables(currentPage, [newTable]))
  }, [dispatch, currentPage])

  const addTablesHandler = useCallback((tables) => {
    tables?.length && dispatch(addTables(currentPage, tables))
  }, [dispatch, currentPage])

  const updateTablesHandler = useCallback((tablesToUpdate) => {
    tablesToUpdate.length && dispatch(updateTables(currentPage, tablesToUpdate))
  }, [currentPage, dispatch])

  const deleteTables = useCallback((tablesToDelete = selectedTables) => {
    tablesToDelete.length && dispatch(removeTables(currentPage, tablesToDelete))
  }, [currentPage, dispatch, selectedTables])

  const selectTablesHandler = useCallback((selectedObjects) => {
    const selected = selectedObjects.filter((object) => object.typeName === TABLE_TYPE_NAME)
    if (arraysEqual(selectedTables, selected, (table1, table2) => table1.uid === table2.uid)) {
      return
    }

    batch(() => {
      dispatch(selectTables(currentPage, selected))

      activeSidebar !== SidebarContent.MARKUP &&
      dispatch(setActiveSidebar(SidebarContent.MARKUP))
    })
  }, [
    activeSidebar,
    currentPage,
    dispatch,
    selectedTables
  ])

  return {
    tables,
    selectedTables,
    createTables,
    addTables: addTablesHandler,
    deleteTables,
    selectTables: selectTablesHandler,
    updateTables: updateTablesHandler
  }
}

export { useTables }
