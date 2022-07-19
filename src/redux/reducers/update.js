import { UPDATE_PAGE } from '../actionTypes'

const initialState = {
  update: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...state, update: true }
    case 'STOP_UPDATE':
      return { ...state, update: false }
    default:
      return state
  }
}

export default reducer
