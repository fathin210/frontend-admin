import {
  TARIF_DETAIL,
  TARIF_GET_DATA_SUCCESS,
  TARIF_MODAL_HIDDEN,
  TARIF_MODAL_SHOW,
} from '../actionTypes'

const initialState = {
  data: [],
  detail: {
    id_tarif: '',
    tarif_gigi: '',
  },
  modal: {
    show: false,
    isInsert: false,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TARIF_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case TARIF_DETAIL:
      return {
        ...state,
        detail: action.payload,
      }

    case TARIF_MODAL_SHOW:
      return {
        ...state,
        modal: {
          show: true,
          isInsert: action.payload,
        },
      }
    case TARIF_MODAL_HIDDEN:
      return {
        ...state,
        modal: {
          show: false,
          isInsert: false,
        },
      }
    default:
      return state
  }
}

export default reducer
