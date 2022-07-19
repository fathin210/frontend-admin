import { toast } from 'react-toastify'
import api from 'src/api/api'
import { ANTRIAN_GET_DATA_SUCCESS, ANTRIAN_MODAL_HIDDEN, UPDATE_PAGE } from 'src/redux/actionTypes'

export class AntrianController {
  fetchAntrian(date) {
    return (dispatch) => {
      api
        .post(
          '/antrian/tanggal',
          {
            tanggal_pelaksanaan: date,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          },
        )
        .then((res) => {
          dispatch({
            type: ANTRIAN_GET_DATA_SUCCESS,
            payload: res.data.data,
          })
        })
    }
  }

  insertAntrian(data, event) {
    return async (dispatch) => {
      event.preventDefault()
      await api
        .get('/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          data = { ...data, id_admin: res.data.id_admin }
        })
      api
        .post('/antrian', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          toast.success('Sukses menambahkan pasien ke antrian')
          dispatch({ type: ANTRIAN_MODAL_HIDDEN })
        })
        .catch((e) => {
          toast.error(e.response.data.meta.message)
        })
    }
  }

  updateStatusAntrian(id_antrian, id_status, jenis_status) {
    return (dispatch) => {
      api
        .put(
          '/antrian/status',
          { id_antrian, id_status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          },
        )
        .then(() => {
          dispatch({ type: UPDATE_PAGE })
          toast.success('Berhasil Mengubah Status Antrian')
        })
        .catch((e) => {
          toast.error(e.response.data.message)
        })
    }
  }

  updateAntrian(data) {
    return (dispatch) => {
      api
        .put('/antrian', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          dispatch({
            type: ANTRIAN_MODAL_HIDDEN,
          })
          dispatch({ type: UPDATE_PAGE })
          toast.success('Sukses Merubah Rincian Biaya')
        })
        .catch((e) => {
          toast.error(e.response.data.message)
        })
    }
  }

  cetakKwitansi(id_antrian) {
    window.open(`https://api-setiakawan.gazebo-skripsi.my.id/api/kwitansi/cetak/${id_antrian}`)
  }
}
