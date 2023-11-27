import { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reset, undo, redo, copyMarkup, pasteMarkup } from '@/actions/markup'
import { HotKeyEvent } from '@/constants/hotKeys'
import { withHotKeys } from '@/hocs/withHotKeys'

const DefaultCanvasHotKeys = ({
  registerHandlers,
  undo,
  redo,
  reset,
  copyMarkup,
  pasteMarkup
}) => {
  const hotKeyHandlers = useMemo(() => ({
    [HotKeyEvent.UNDO]: () => undo(),
    [HotKeyEvent.REDO]: () => redo(),
    [HotKeyEvent.RESET]: () => reset(),
    [HotKeyEvent.COPY]: copyMarkup,
    [HotKeyEvent.PASTE]: pasteMarkup
  }), [undo, redo, reset, copyMarkup, pasteMarkup])

  useEffect(() => {
    registerHandlers(hotKeyHandlers)
  }, [registerHandlers, hotKeyHandlers])

  return null
}

const mapDispatchToProps = {
  undo,
  redo,
  reset,
  copyMarkup,
  pasteMarkup
}

const ConnectedComponent = withHotKeys(
  connect(null, mapDispatchToProps)(DefaultCanvasHotKeys)
)

DefaultCanvasHotKeys.propTypes = {
  registerHandlers: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  copyMarkup: PropTypes.func.isRequired,
  pasteMarkup: PropTypes.func.isRequired
}

export {
  ConnectedComponent as DefaultCanvasHotKeys
}
