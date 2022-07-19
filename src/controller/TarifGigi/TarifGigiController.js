import { toast } from 'react-toastify'
import api from 'src/api/api'
import { TARIF_GET_DATA_SUCCESS, TARIF_MODAL_HIDDEN, UPDATE_PAGE } from 'src/redux/actionTypes'

export class TarifGigiController {
  fetchTarif = () => {
    return (dispatch) => {
      api
        .get('/tarif', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          dispatch({
            type: TARIF_GET_DATA_SUCCESS,
            payload: res.data.data,
          })
        })
    }
  }

  updateTarif = (data, event) => {
    event.preventDefault()
    return (dispatch) => {
      api
        .put('/tarif', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          dispatch({
            type: TARIF_MODAL_HIDDEN,
          })
          dispatch({
            type: UPDATE_PAGE,
          })
          toast.success('Edit Data Tarif Gigi Sukses')
        })
        .catch((errors) => {
          toast.error(errors.response.data.message)
        })
    }
  }

  insertTarif = (data, event) => {
    event.preventDefault()
    return (dispatch) => {
      api
        .post('/tarif', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          dispatch({
            type: UPDATE_PAGE,
          })
          dispatch({
            type: TARIF_MODAL_HIDDEN,
          })
          toast.success('Tambah Data Tarif Gigi Sukses')
        })
        .catch((error) => {
          console.log(error)
          // toast.error(error.response.data)
        })
    }
  }

  deleteTarif = (id_tarif) => {
    if (window.confirm('Anda yakin ingin menghapus data tarif ?')) {
      return (dispatch) => {
        api
          .delete(`/tarif/${id_tarif}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          })
          .then(() => {
            dispatch({
              type: UPDATE_PAGE,
            })
            toast.success('Hapus Data Tarif Gigi Sukses')
          })
          .catch((e) => {
            toast.error(e.response.data.message)
          })
      }
    }
  }
}
