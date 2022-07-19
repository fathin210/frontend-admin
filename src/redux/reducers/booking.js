import { BOOKING_GET_DATA_SUCCESS } from '../actionTypes'

const initialState = {
  data: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state
  }
}

export default reducer
