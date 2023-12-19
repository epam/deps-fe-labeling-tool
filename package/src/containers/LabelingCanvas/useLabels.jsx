import { useCallback } from 'react'
import {
  useSelector,
  useDispatch,
  batch
} from 'react-redux'
import {
  addLabels,
  removeLabels,
  selectLabels,
  updateLabels
} from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { SidebarContent } from '@/enums/SidebarContent'
import { Label, LABEL_TYPE_NAME } from '@/models/Label'
import {
  pageSelectedLabelsSelector,
  pageLabelsSelector
} from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { activeSidebarSelector } from '@/selectors/ui'
import { arraysEqual } from '@/utils/array'

// TODO: #1431
const useLabels = () => {
  const dispatch = useDispatch()

  const currentPage = useSelector(currentPageSelector)
  const labels = useSelector(pageLabelsSelector)
  const selectedLabels = useSelector(pageSelectedLabelsSelector)
  const activeSidebar = useSelector(activeSidebarSelector)

  const createLabels = useCallback((rect) => {
    const newLabel = Label.fromRectangle(rect)
    dispatch(addLabels(currentPage, [newLabel]))
  }, [dispatch, currentPage])

  const updateLabelsHandler = useCallback((labelsToUpdate) => {
    labelsToUpdate.length && dispatch(updateLabels(currentPage, labelsToUpdate))
  }, [currentPage, dispatch])

  const deleteLabels = useCallback((labelsToDelete = selectedLabels) => {
    labelsToDelete.length && dispatch(removeLabels(currentPage, labelsToDelete))
  }, [currentPage, dispatch, selectedLabels])

  const selectLabelsHandler = useCallback((selectedObjects) => {
    const selected = selectedObjects.filter((object) => object.typeName === LABEL_TYPE_NAME)
    if (arraysEqual(selectedLabels, selected, (label1, label2) => label1.uid === label2.uid)) {
      return
    }

    batch(() => {
      dispatch(selectLabels(currentPage, selected))

      activeSidebar !== SidebarContent.MARKUP &&
      dispatch(setActiveSidebar(SidebarContent.MARKUP))
    })
  }, [
    activeSidebar,
    currentPage,
    dispatch,
    selectedLabels
  ])

  return {
    labels,
    selectedLabels,
    createLabels,
    deleteLabels,
    selectLabels: selectLabelsHandler,
    updateLabels: updateLabelsHandler
  }
}

export { useLabels }
