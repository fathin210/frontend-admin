import { toast } from 'react-toastify'
import api from 'src/api/api'
import { TEKNISI_GET_DATA_SUCCESS, TEKNISI_MODAL_HIDDEN, UPDATE_PAGE } from 'src/redux/actionTypes'

export class TeknisiController {
  fetchTeknisi = () => {
    return (dispatch) => {
      api
        .get('/teknisi', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          dispatch({
            type: TEKNISI_GET_DATA_SUCCESS,
            payload: res.data.data,
          })
        })
    }
  }

  insertTeknisi = (data, event) => {
    event.preventDefault()
    return (dispatch) => {
      api
        .post('/teknisi', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          dispatch({
            type: UPDATE_PAGE,
          })
          dispatch({
            type: TEKNISI_MODAL_HIDDEN,
          })
          toast.success('Tambah Teknisi Sukses')
        })
        .catch((errors) => toast.error(errors.response.data.message))
    }
  }

  deleteTeknisi = (id_teknisi) => {
    if (window.confirm('Anda yakin ingin menghapus data teknisi ?')) {
      return (dispatch) => {
        api
          .delete(`/teknisi/${id_teknisi}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          })
          .then(() => {
            dispatch({ type: UPDATE_PAGE })
            toast.success('Berhasil Menghapus Data Teknisi')
          })
      }
    }
  }

  updateTeknisi = (data, event) => {
    event.preventDefault()
    return (dispatch) => {
      api
        .put(`/teknisi`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          dispatch({
            type: UPDATE_PAGE,
          })
          dispatch({
            type: TEKNISI_MODAL_HIDDEN,
          })
          toast.success('Edit Data Teknisi Sukses')
        })
        .catch((errors) => toast.error(errors.response.data.message))
    }
  }
}
