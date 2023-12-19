
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, batch } from 'react-redux'
import { save, saveMarkup } from '@/actions/api'
import { updateInitialMarkup, storeAssignedMarkup } from '@/actions/markup'
import { updateInitialFields } from '@/actions/model'
import { Button } from '@/components/Button'
import { Dropdown } from '@/components/Dropdown'
import { DropdownIcon } from '@/components/Icons/DropdownIcon'
import { SaveIcon } from '@/components/Icons/SaveIcon'
import { MenuTrigger } from '@/components/Menu'
import { Tooltip } from '@/components/Tooltip'
import { HotKeyEvent } from '@/constants/hotKeys'
import { Placement } from '@/enums/Placement'
import { withHotKeys } from '@/hocs/withHotKeys'
import { fieldShape } from '@/models/Field'
import { ModifiedObjects, modifiedObjectsShape } from '@/models/ModifiedObjects'
import { modifiedObjectsSelector } from '@/selectors/markup'
import {
  fieldsSelector,
  initialFieldsSelector
} from '@/selectors/model'
import { getApi } from '@/services/api'
import { isEqual } from '@/utils/isEqual'
import { Wrapper, Menu } from './SaveDropdown.styles'
import { useAutoSave } from './useAutoSave'

const RESOURCE_TOOLTIP_SAVE = 'Save file'
const RESOURCE_MENU_ITEMS_NAMES = {
  SAVE_WITHOUT_EXTRACTION: 'Save without extraction',
  SAVE_AND_EXTRACT: 'Save & extract',
  SAVE_EXTRACT_AND_CLOSE: 'Save, extract & close'
}

const SaveDropdown = ({
  fields,
  initialFields,
  save,
  saveMarkup,
  updateInitialMarkup,
  updateInitialFields,
  modifiedObjects,
  registerHandlers,
  storeAssignedMarkup
}) => {
  const [isSaving, setIsSaving] = useState(false)
  const sameFields = useMemo(
    () => isEqual(fields, initialFields),
    [fields, initialFields]
  )

  const onSaveMarkup = useCallback(
    async () => {
      try {
        setIsSaving(true)
        await saveMarkup()
        batch(() => {
          updateInitialFields()
          updateInitialMarkup()
        })
      } finally {
        setIsSaving(false)
      }
    }, [saveMarkup, updateInitialFields, updateInitialMarkup]
  )

  const cancelPreviousAutoSave = useAutoSave(onSaveMarkup)

  const onSaveExtractAndClose = useCallback(
    async () => {
      await save()
      getApi().close()
    }, [save]
  )

  const onSaveAndExtract = useCallback(
    async () => {
      const newMarkup = await save()
      storeAssignedMarkup(newMarkup)
    }, [save, storeAssignedMarkup]
  )

  useEffect(
    () => {
      const saveHotKeyHandler = {
        [HotKeyEvent.SAVE_WITHOUT_EXTRACTION]: onSaveMarkup
      }

      registerHandlers(saveHotKeyHandler)
    }, [onSaveMarkup, registerHandlers]
  )

  const saveMethods = useMemo(
    () => ({
      [RESOURCE_MENU_ITEMS_NAMES.SAVE_AND_EXTRACT]: onSaveAndExtract,
      [RESOURCE_MENU_ITEMS_NAMES.SAVE_EXTRACT_AND_CLOSE]: onSaveExtractAndClose,
      [RESOURCE_MENU_ITEMS_NAMES.SAVE_WITHOUT_EXTRACTION]: onSaveMarkup
    }), [onSaveAndExtract, onSaveExtractAndClose, onSaveMarkup]
  )

  const saveMethod = useCallback(
    (item) => {
      cancelPreviousAutoSave()
      saveMethods[item.key]()
    },
    [cancelPreviousAutoSave, saveMethods]
  )

  const isSaveWithExtractionAvailable = () => !!getApi().ocrTable && !!getApi().ocrText

  const renderMenu = useCallback(
    () => {
      const menuItemsNames = isSaveWithExtractionAvailable()
        ? Object.values(RESOURCE_MENU_ITEMS_NAMES)
        : [RESOURCE_MENU_ITEMS_NAMES.SAVE_WITHOUT_EXTRACTION]

      return (
        <Menu
          onClick={saveMethod}
          trigger={MenuTrigger.CLICK}
        >
          {
            menuItemsNames.map((item) => (
              <Menu.Item
                key={item}
              >
                {item}
              </Menu.Item>
            ))
          }
        </Menu>
      )
    }, [saveMethod]
  )

  if (!getApi().save) {
    return (
      <Tooltip title={RESOURCE_TOOLTIP_SAVE}>
        <Button.Icon
          disabled={(!ModifiedObjects.isModified(modifiedObjects) && sameFields) || isSaving}
          icon={<SaveIcon />}
          onClick={onSaveMarkup}
        />
      </Tooltip>
    )
  }

  return (
    <Dropdown
      disabled={!ModifiedObjects.isModified(modifiedObjects)}
      overlay={renderMenu}
      placement={Placement.BOTTOM_LEFT}
      trigger={MenuTrigger.CLICK}
    >
      <Button.Icon
        icon={
          <Wrapper>
            <SaveIcon />
            <DropdownIcon />
          </Wrapper>
        }
      />
    </Dropdown>
  )
}

SaveDropdown.propTypes = {
  fields: PropTypes.arrayOf(fieldShape),
  initialFields: PropTypes.arrayOf(fieldShape),
  modifiedObjects: modifiedObjectsShape,
  save: PropTypes.func.isRequired,
  saveMarkup: PropTypes.func.isRequired,
  updateInitialFields: PropTypes.func.isRequired,
  updateInitialMarkup: PropTypes.func.isRequired,
  registerHandlers: PropTypes.func.isRequired,
  storeAssignedMarkup: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  fields: fieldsSelector(state),
  initialFields: initialFieldsSelector(state),
  modifiedObjects: modifiedObjectsSelector(state)
})

const mapDispatchToProps = {
  save,
  saveMarkup,
  updateInitialFields,
  updateInitialMarkup,
  storeAssignedMarkup
}

const ConnectedComponent = withHotKeys(
  connect(mapStateToProps, mapDispatchToProps)(SaveDropdown)
)

export {
  ConnectedComponent as SaveDropdown
}
