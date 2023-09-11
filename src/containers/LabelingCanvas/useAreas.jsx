import { useCallback } from 'react'
import {
  useSelector,
  useDispatch,
  batch
} from 'react-redux'
import {
  addAreas,
  removeAreas,
  selectAreas,
  updateAreas
} from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { SidebarContent } from '@/enums/SidebarContent'
import { Area, AREA_TYPE_NAME } from '@/models/Area'
import {
  pageSelectedAreasSelector,
  pageAreasSelector
} from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { activeSidebarSelector } from '@/selectors/ui'
import { arraysEqual } from '@/utils/array'

// TODO: #1431
const useAreas = () => {
  const dispatch = useDispatch()

  const currentPage = useSelector(currentPageSelector)
  const areas = useSelector(pageAreasSelector)
  const selectedAreas = useSelector(pageSelectedAreasSelector)
  const activeSidebar = useSelector(activeSidebarSelector)

  const createAreas = useCallback((rect) => {
    const newArea = Area.fromRectangle(rect)
    dispatch(addAreas(currentPage, [newArea]))
  }, [dispatch, currentPage])

  const updateAreasHandler = useCallback((areasToUpdate) => {
    areasToUpdate.length && dispatch(updateAreas(currentPage, areasToUpdate))
  }, [currentPage, dispatch])

  const deleteAreas = useCallback((areasToDelete = selectedAreas) => {
    areasToDelete.length && dispatch(removeAreas(currentPage, areasToDelete))
  }, [currentPage, dispatch, selectedAreas])

  const selectAreasHandler = useCallback((selectedObjects) => {
    const selected = selectedObjects.filter((object) => object.typeName === AREA_TYPE_NAME)
    if (arraysEqual(selectedAreas, selected, (area1, area2) => area1.uid === area2.uid)) {
      return
    }

    batch(() => {
      dispatch(selectAreas(currentPage, selected))

      activeSidebar !== SidebarContent.MARKUP &&
      dispatch(setActiveSidebar(SidebarContent.MARKUP))
    })
  }, [
    activeSidebar,
    currentPage,
    dispatch,
    selectedAreas
  ])

  return {
    areas,
    selectedAreas,
    createAreas,
    deleteAreas,
    selectAreas: selectAreasHandler,
    updateAreas: updateAreasHandler
  }
}

export { useAreas }
