import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  confirmFieldsDeletion,
  enableDeleteFieldsMode,
  cancelDeleteFieldsMode
} from '@/actions/model'
import { CancelIcon } from '@/components/Icons/CancelIcon'
import { FilledTrashIcon } from '@/components/Icons/FilledTrashIcon'
import { SuccessIcon } from '@/components/Icons/SuccessIcon'
import { fieldShape } from '@/models/Field'
import { fieldsToDeleteSelector } from '@/selectors/model'
import {
  DeleteModeWrapper,
  CancelOption,
  SaveOption,
  DeleteButton
} from './FieldsDeleteModeManager.styles'

const RESOURCE_DELETE_MODE = 'Delete mode'
const RESOURCE_CANCEL = 'Cancel'
const RESOURCE_SAVE = 'Save'

const FieldsDeleteModeManager = ({
  fieldsToDelete,
  confirmFieldsDeletion,
  cancelDeleteFieldsMode,
  enableDeleteFieldsMode
}) => {
  if (fieldsToDelete) {
    return (
      <DeleteModeWrapper>
        <CancelOption
          icon={<CancelIcon />}
          onClick={cancelDeleteFieldsMode}
        >
          {RESOURCE_CANCEL}
        </CancelOption>
        <SaveOption
          disabled={!fieldsToDelete.length}
          icon={<SuccessIcon />}
          onClick={confirmFieldsDeletion}
        >{RESOURCE_SAVE}
        </SaveOption>
      </DeleteModeWrapper>
    )
  }

  return (
    <DeleteModeWrapper>
      <DeleteButton
        icon={<FilledTrashIcon />}
        onClick={enableDeleteFieldsMode}
      >
        {RESOURCE_DELETE_MODE}
      </DeleteButton>
    </DeleteModeWrapper>
  )
}

FieldsDeleteModeManager.propTypes = {
  cancelDeleteFieldsMode: PropTypes.func.isRequired,
  confirmFieldsDeletion: PropTypes.func.isRequired,
  enableDeleteFieldsMode: PropTypes.func.isRequired,
  fieldsToDelete: PropTypes.arrayOf(fieldShape)
}

const mapStateToProps = (state) => ({
  fieldsToDelete: fieldsToDeleteSelector(state)
})

const mapDispatchToProps = {
  cancelDeleteFieldsMode,
  confirmFieldsDeletion,
  enableDeleteFieldsMode
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(FieldsDeleteModeManager)

export {
  ConnectedComponent as FieldsDeleteModeManager
}
