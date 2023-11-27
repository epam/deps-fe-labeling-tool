import React, { useCallback, useEffect, useMemo, useState } from 'react'
import 'antd/lib/modal/style/index.less'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { save, saveMarkup } from '@/actions/api'
import { ButtonType } from '@/components/Button'
import { CloseIcon } from '@/components/Icons/CloseIcon'
import { LoadingIcon } from '@/components/Icons/LoadingIcon'
import { CustomModal } from '@/components/Modal'
import { Tooltip } from '@/components/Tooltip'
import { fieldShape } from '@/models/Field'
import { ModifiedObjects, modifiedObjectsShape } from '@/models/ModifiedObjects'
import { modifiedObjectsSelector } from '@/selectors/markup'
import {
  fieldsSelector,
  initialFieldsSelector
} from '@/selectors/model'
import { getApi } from '@/services/api'
import { getEvents } from '@/services/events'
import { isEqual } from '@/utils/isEqual'
import {
  Wrapper,
  Button,
  QuestionCircle,
  TitleWrapper,
  CloseOutlined
} from './CloseButton.styles'

const RESOURCE_MODAL_WIDTH = 450
const RESOURCE_TOOLTIP_CLOSE = 'Close'
const RESOURCE_CONFIRM_LEAVE_TITLE = 'Do you want to extract document?'
const RESOURCE_CONFIRM_LEAVE_CONTENT = 'You have unsaved changes. Do you wish to keep them?'
const RESOURCE_WRAPPER_KEY = 'wrapper'
const CANCEL_BUTTON_ID = 'ignore'

const RESOURCE_MODAL_BUTTON_NAME = {
  IGNORE: 'Ignore',
  SAVE: 'Save',
  SAVE_AND_EXTRACT: 'Save & extract'
}

const CloseButton = ({
  fields,
  initialFields,
  modifiedObjects,
  save,
  saveMarkup
}) => {
  const [visible, setVisible] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const sameFields = useMemo(
    () => isEqual(fields, initialFields),
    [fields, initialFields]
  )

  const onIgnore = useCallback(
    () => {
      getApi().close()
      setVisible(false)
    }, [])

  const onSaveAndExtract = useCallback(
    async () => {
      try {
        setIsSaving(true)
        await save()
        onIgnore()
      } finally {
        setIsSaving(false)
      }
    }, [onIgnore, save]
  )

  const onSaveMarkup = useCallback(
    async () => {
      try {
        setIsSaving(true)
        await saveMarkup()
        onIgnore()
      } finally {
        setIsSaving(false)
      }
    }, [onIgnore, saveMarkup]
  )

  const onParentCloseEvent = useCallback(() => {
    if (!ModifiedObjects.isModified(modifiedObjects) && sameFields) {
      return false
    }

    setVisible(true)

    return true
  }, [modifiedObjects, sameFields])

  const onClick = useCallback(async () => {
    if (!ModifiedObjects.isModified(modifiedObjects) && sameFields) {
      return getApi().close()
    }

    setVisible(true)
  }, [modifiedObjects, sameFields])

  useEffect(() => {
    const unsubscribe = getEvents().onClose(onParentCloseEvent)

    return () => {
      unsubscribe()
    }
  }, [onParentCloseEvent])

  const isSaveWithExtractionAvailable = () => !!getApi().ocrTable && !!getApi().ocrText

  const renderFooterSaveButtons = useMemo(
    () => {
      if (getApi().save) {
        return (
          <>
            <Button
              type={ButtonType.DEFAULT}
              onClick={onSaveMarkup}
              disabled={isSaving}
            >
              {RESOURCE_MODAL_BUTTON_NAME.SAVE}
            </Button>
            {
              isSaveWithExtractionAvailable() && (
                <Button
                  type={ButtonType.PRIMARY}
                  onClick={onSaveAndExtract}
                  disabled={isSaving}
                >
                  {isSaving && <LoadingIcon />}
                  {RESOURCE_MODAL_BUTTON_NAME.SAVE_AND_EXTRACT}
                </Button>
              )
            }
          </>
        )
      }

      return (
        <Button
          type={ButtonType.PRIMARY}
          onClick={onSaveMarkup}
          disabled={isSaving}
        >
          {isSaving && <LoadingIcon />}
          {RESOURCE_MODAL_BUTTON_NAME.SAVE}
        </Button>
      )
    }, [onSaveMarkup, onSaveAndExtract, isSaving]
  )

  const renderFooter = useMemo(
    () => ([
      <Wrapper key={RESOURCE_WRAPPER_KEY}>
        <Button
          type={ButtonType.LINK}
          onClick={onIgnore}
          disabled={isSaving}
        >
          {RESOURCE_MODAL_BUTTON_NAME.IGNORE}
        </Button>
        {renderFooterSaveButtons}
      </Wrapper>
    ]), [onIgnore, renderFooterSaveButtons, isSaving]
  )

  return (
    <React.Fragment>
      <Tooltip title={RESOURCE_TOOLTIP_CLOSE}>
        <Button.Icon
          icon={<CloseIcon />}
          onClick={onClick}
        />
      </Tooltip>
      <CustomModal
        visible={visible}
        onCancel={() => setVisible(false)}
        cancelButtonProps={{ id: CANCEL_BUTTON_ID }}
        closeIcon={<CloseOutlined />}
        title={
          getApi().saveMarkup && (
            <TitleWrapper>
              <QuestionCircle />
              {RESOURCE_CONFIRM_LEAVE_TITLE}
            </TitleWrapper>
          )
        }
        width={RESOURCE_MODAL_WIDTH}
        closable={true}
        footer={renderFooter}
      >
        {RESOURCE_CONFIRM_LEAVE_CONTENT}
      </CustomModal>
    </React.Fragment>
  )
}

CloseButton.propTypes = {
  fields: PropTypes.arrayOf(fieldShape).isRequired,
  initialFields: PropTypes.arrayOf(fieldShape),
  modifiedObjects: modifiedObjectsShape,
  save: PropTypes.func.isRequired,
  saveMarkup: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  fields: fieldsSelector(state),
  initialFields: initialFieldsSelector(state),
  modifiedObjects: modifiedObjectsSelector(state)
})

const mapDispatchToProps = {
  save,
  saveMarkup
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(React.memo(CloseButton))

export {
  ConnectedComponent as CloseButton
}
