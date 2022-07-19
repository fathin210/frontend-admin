import {
  TEKNISI_DETAIL,
  TEKNISI_GET_DATA_SUCCESS,
  TEKNISI_MODAL_HIDDEN,
  TEKNISI_MODAL_SHOW,
} from '../actionTypes'

const initialState = {
  data: [],
  detail: {
    id_teknisi: '',
    nama: '',
  },
  modal: {
    show: false,
    isInsert: false,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEKNISI_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case TEKNISI_DETAIL:
      return {
        ...state,
        detail: action.payload,
      }
    case TEKNISI_MODAL_SHOW:
      return {
        ...state,
        modal: {
          show: true,
          isInsert: action.payload,
        },
      }
    case TEKNISI_MODAL_HIDDEN:
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
