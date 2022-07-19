import api from 'src/api/api'
import { PELAYANAN_GET_DATA_SUCCESS } from 'src/redux/actionTypes'

export class PelayananController {
  fetchPelayanan() {
    return (dispatch) =>
      api
        .get('/pelayanan', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          dispatch({
            type: PELAYANAN_GET_DATA_SUCCESS,
            payload: res.data.data,
          })
        })
  }
}
