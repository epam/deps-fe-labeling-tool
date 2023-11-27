import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { GlobalHotKeys, configure } from 'react-hotkeys'
import { connect } from 'react-redux'
import { registerHotKeyEvents } from '@/actions/hotkeys'
import { HotKeyEvent, customKeyCodes } from '@/constants/hotKeys'
import { hotKeysSelector } from '@/selectors/hotkeys'

configure({
  customKeyCodes
})

const generateKeyMap = (handlers) => {
  if (!handlers) {
    return
  }

  return Object.keys(handlers).reduce((acc, eventName) => {
    if (!eventName || !HotKeyEvent[eventName]) {
      return acc
    }

    return {
      ...acc,
      [eventName]: HotKeyEvent[eventName].shortcut
    }
  }, {})
}

const withHotKeys = (ConnectedComponent) => {
  const HotKeys = ({ registredHotKeyEvents, registerHotKeyEvents, ...props }) => {
    const [handlers, setHandlers] = useState()
    const [keyMap, setKeyMap] = useState()

    const registerHandlers = useCallback((handlers) => {
      const newEvents = Object.keys(handlers)
      if (newEvents.some((e) => !registredHotKeyEvents.includes(e))) {
        registerHotKeyEvents(newEvents)
      }

      const keyMap = generateKeyMap(handlers)
      setKeyMap(keyMap)
      setHandlers(handlers)
    }, [
      registredHotKeyEvents,
      registerHotKeyEvents
    ])

    const registerModifiers = useCallback((modifiers) => {
      registerHotKeyEvents(modifiers)
    }, [registerHotKeyEvents])

    return (
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={handlers}
        allowChanges
      >
        <ConnectedComponent
          {...props}
          registerHandlers={registerHandlers}
          registerModifiers={registerModifiers}
        />
      </GlobalHotKeys>
    )
  }

  HotKeys.propTypes = {
    registerHotKeyEvents: PropTypes.func.isRequired,
    registredHotKeyEvents: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  const mapStateToProps = (state) => ({
    registredHotKeyEvents: hotKeysSelector(state)
  })

  const mapDispatchToProps = {
    registerHotKeyEvents
  }

  return connect(mapStateToProps, mapDispatchToProps)(HotKeys)
}

export {
  withHotKeys
}
