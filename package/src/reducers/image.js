import { handleActions } from 'redux-actions'
import { resetDefault, setImage } from '@/actions/image'

const defaultState = {}

const setImageHandler = (state, action) => ({
  ...state,
  width: action.payload.width,
  height: action.payload.height
})

const resetDefaultHandler = () => (defaultState)

const imageReducer = handleActions(
  new Map([
    [
      resetDefault,
      resetDefaultHandler
    ],
    [
      setImage,
      setImageHandler
    ]
  ]),
  defaultState
)

export {
  imageReducer
}
