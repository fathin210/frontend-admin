import { PASIEN_DETAIL, PASIEN_GET_DATA_SUCCESS } from '../actionTypes'

const initialState = {
  data: [],
  detail: {
    id_pasien: '',
    alamat: '',
    nama: '',
    jenis_kelamin: '',
    no_telepon: '',
    nomor_pasien: '',
    pendaftaran: [],
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PASIEN_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case PASIEN_DETAIL:
      return {
        ...state,
        detail: action.payload,
      }
    default:
      return state
  }
}

export default reducer
