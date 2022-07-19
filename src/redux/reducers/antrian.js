import {
  ANTRIAN_DETAIL,
  ANTRIAN_GET_DATA_SUCCESS,
  ANTRIAN_MODAL_HIDDEN,
  ANTRIAN_MODAL_SHOW,
  RINCIAN_DETAIL,
} from '../actionTypes'

const initialState = {
  data: [],
  modal: {
    show: false,
    antrian: {
      id_pasien: '',
      id_admin: '',
      nama: '',
      tanggal_pelaksanaan: '',
    },
    rincian: {
      id_status: '',
      id_pelayanan: '',
      id_pasien: '',
      id_admin: '',
      nama: '',
      tanggal_pelaksanaan: '',
    },
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ANTRIAN_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case ANTRIAN_DETAIL:
      return {
        ...state,
        modal: {
          ...state.modal,
          antrian: action.payload,
        },
      }
    case RINCIAN_DETAIL:
      return {
        ...state,
        modal: {
          ...state.modal,
          rincian: action.payload,
        },
      }
    case ANTRIAN_MODAL_SHOW:
      return {
        ...state,
        modal: {
          ...state.modal,
          show: true,
        },
      }
    case ANTRIAN_MODAL_HIDDEN:
      return {
        ...state,
        modal: {
          ...state.modal,
          show: false,
        },
      }
    default:
      return state
  }
}

export default reducer
