import { toast } from 'react-toastify'
import api from 'src/api/api'
import { BOOKING_GET_DATA_SUCCESS, UPDATE_PAGE } from 'src/redux/actionTypes'

export class BookingController {
  fetchBooking(date) {
    return (dispatch) => {
      api
        .post(
          '/booking',
          { tanggal: date },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          },
        )
        .then((res) => {
          dispatch({
            type: BOOKING_GET_DATA_SUCCESS,
            payload: res.data.data,
          })
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    }
  }

  deleteBooking(id_booking) {
    return (dispatch) => {
      api
        .delete(`/booking/${id_booking}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          dispatch({
            type: UPDATE_PAGE,
          })
          toast.success('Berhasil Menghapus Data Booking')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    }
  }

  fetchBookingBatal(bulan) {
    return (dispatch) => {
      api
        .post(
          '/booking/laporan',
          { bulan },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          },
        )
        .then((res) => {
          dispatch({
            type: BOOKING_GET_DATA_SUCCESS,
            payload: res.data.data,
          })
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    }
  }
}
