import { toast } from 'react-toastify'
import api from 'src/api/api'
import { PASIEN_DETAIL, PASIEN_GET_DATA_SUCCESS, UPDATE_PAGE } from 'src/redux/actionTypes'

export class PasienController {
  fetchPasien(page) {
    return (dispatch) => {
      api
        .get(`/pasien?page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          dispatch({
            type: PASIEN_GET_DATA_SUCCESS,
            payload: res.data.data,
          })
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    }
  }

  detailPasien(data) {
    return (dispatch) => {
      api
        .get(`/pasien/${data}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          dispatch({
            type: PASIEN_DETAIL,
            payload: res.data.data,
          })
        })
    }
  }

  searchPasien(data) {
    return (dispatch) => {
      api
        .get(`/pasien/cari?search=${data}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          dispatch({
            type: PASIEN_GET_DATA_SUCCESS,
            payload: res.data.data,
          })
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    }
  }

  insertPasien(data, history) {
    api
      .post('/pasien', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        history.push(`/pasien?nomor_pasien=${res.data.data.nomor_pasien}`)
        toast.success('Tambah Pasien Sukses')
      })
      .catch((e) => {
        toast.error(e.response.data.message)
      })
  }

  deletePasien(id_pasien) {
    if (window.confirm('Anda yakin ingin menghapus data pasien ?')) {
      return (dispatch) => {
        api
          .delete(`/pasien/${id_pasien}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          })
          .then(() => {
            dispatch({ type: UPDATE_PAGE })
            toast.success('Berhasil Menghapus Data Pasien')
          })
      }
    }
  }

  cetakKartu(id_pasien) {
    window.open(`https://api-setiakawan.gazebo-skripsi.my.id/api/pasien/cetak/${id_pasien}`)
  }

  updatePasien(data, history) {
    api
      .put(`/pasien/${data.id_pasien}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then(() => {
        history.push('/pasien')
        toast.success('Ubah Data Pasien Sukses')
      })
      .catch((e) => {
        toast.error(e.response.data.message)
      })
  }
}
