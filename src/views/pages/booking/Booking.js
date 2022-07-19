import { cilOptions, cilPlus, cilSend, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import { AntrianController } from 'src/controller/Antrian/AntrianController'
import { AuthController } from 'src/controller/Auth/AuthController'
import { BookingController } from 'src/controller/Booking/BookingController'

function Booking() {
  var myDate = new Date()
  const [date, setDate] = useState(myDate.toLocaleDateString('en-CA'))
  const update = useSelector((state) => state.update)

  const booking = useSelector((state) => state.booking.data)
  const bookingController = new BookingController()
  const antrianController = new AntrianController()
  const authController = new AuthController()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    authController
      .profile()
      .then(() => dispatch(bookingController.fetchBooking(date)))
      .catch(() => {
        localStorage.clear()
        history.push('/login')
        toast.error('Silahkan Login Kembali')
      })
  }, [date, update])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <CRow className="justify-content-between align-items-center">
              <CCol xs={8}>
                <strong>List Data Booking</strong>
              </CCol>
            </CRow>
            <CRow className="mt-3 mb-3">
              <CCol>
                <CFormInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="md" hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="row">No.</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Kode Booking</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Tanggal</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Jam</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Nama</CTableHeaderCell>
                  <CTableHeaderCell scope="row"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* Disini map data dari api */}
                {booking.length > 0 ? (
                  booking?.map((data, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="col">{++index}</CTableHeaderCell>
                        <CTableDataCell>{data?.nomor_booking}</CTableDataCell>
                        <CTableDataCell>{data?.tanggal}</CTableDataCell>
                        <CTableDataCell>{data?.jam}</CTableDataCell>
                        <CTableDataCell>{data.pasien?.nama}</CTableDataCell>
                        <CTableDataCell>
                          <CDropdown>
                            <CDropdownToggle color="light">
                              <CIcon icon={cilOptions} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem
                                role={'button'}
                                onClick={() => {
                                  window.open(
                                    `https://web.whatsapp.com/send?phone=62${data.pasien?.no_telepon}&text=SETIA+KAWAN%0APesan+ini+merupakan+pengingat+booking+anda+dengan+data+sebagai+berikut:%0ABooking+Tanggal:+${data.tanggal}%0AJam:+${data?.jam}%0AKode+Booking:+${data.nomor_booking}%0ANama:+${data.pasien?.nama}%0AAlamat:+${data.pasien?.alamat}%0ATerimakasih+atas+perhatiannya+bila+ada+pertanyaan+lebih+lanjut,+silahkan+chat+pada+nomor+ini&app_absent=0`,
                                  )
                                }}
                              >
                                <CIcon icon={cilSend} className="me-2" />
                                Kirim Reminder
                              </CDropdownItem>
                              <CDropdownItem
                                role={'button'}
                                onClick={(event) => {
                                  dispatch(bookingController.deleteBooking(data.id_booking))
                                  dispatch(
                                    antrianController.insertAntrian(
                                      {
                                        id_pasien: data.id_pasien,
                                        tanggal_pelaksanaan: data.tanggal,
                                      },
                                      event,
                                    ),
                                  )
                                }}
                              >
                                <CIcon icon={cilPlus} className="me-2" />
                                Masukkan Ke Antrian
                              </CDropdownItem>
                              <CDropdownItem
                                role="button"
                                onClick={() => {
                                  if (window.confirm('Anda yakin ingin menghapus data booking ?')) {
                                    dispatch(bookingController.deleteBooking(data.id_booking))
                                  }
                                }}
                              >
                                <CIcon icon={cilTrash} className="me-2" />
                                Batalkan
                              </CDropdownItem>
                              <CDropdownItem></CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={7}>
                      <h4 className="text-center">Data Tidak Ada</h4>
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Booking
