const mockDispatch = jest.fn((action) => action)

const createMockMapStateToProps = (mapStateToProps) => {
  if (!mapStateToProps) {
    return mapStateToProps
  }

  return (state, ownProps) => ({
    props: mapStateToProps(state, ownProps)
  })
}

const getDispatchFunctionFormShorthandObject = (actionsObj) => (dispatch) => (
  Object.keys(actionsObj).reduce(
    (props, actionKey) => ({
      ...props,
      [actionKey]: jest.fn(
        (...args) => dispatch(actionsObj[actionKey].apply(undefined, args))
      )
    }),
    {}
  )
)

const createMockMapDispatchToProps = (mapDispatchToProps) => {
  if (!mapDispatchToProps) {
    return mapDispatchToProps
  }

  const mappingFunction = typeof mapDispatchToProps === 'function'
    ? mapDispatchToProps
    : getDispatchFunctionFormShorthandObject(mapDispatchToProps)

  return (dispatch, ownProps) => {
    dispatch = dispatch || mockDispatch

    return {
      props: mappingFunction(dispatch, ownProps),
      dispatch
    }
  }
}

const createMockMergeProps = (mergeProps) => {
  if (!mergeProps) {
    return mergeProps
  }

  return (stateProps, dispatchProps, ownProps) => {
    dispatchProps = dispatchProps || { dispatch: mockDispatch }

    return {
      props: mergeProps(stateProps, dispatchProps, ownProps),
      dispatch: dispatchProps.dispatch
    }
  }
}

const mockReactRedux = {
  connect: (mapStateToProps, mapDispatchToProps, mergeProps) => (WrappedComponent) => ({
    mapStateToProps: createMockMapStateToProps(mapStateToProps),
    mapDispatchToProps: createMockMapDispatchToProps(mapDispatchToProps),
    mergeProps: createMockMergeProps(mergeProps),
    WrappedComponent
  }),
  batch: (fn) => Promise.resolve(fn),
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn((selector) => selector())
}

export {
  mockReactRedux
}
