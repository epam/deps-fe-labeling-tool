import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider as StoreProvider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { resetDefault } from '@/actions/common'
import { rootReducer } from '@/reducers/root'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const Provider = (props) => {
  useEffect(() => () => {
    store.dispatch(resetDefault())
  })

  return (
    <StoreProvider store={store} >
      {props.children}
    </StoreProvider>
  )
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export {
  Provider
}
