import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CFormInput, CRow } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookingController } from 'src/controller/Booking/BookingController'

function RekapBooking() {
  var myDate = new Date()
  var bulan = myDate.getMonth()
  var tahun = myDate.getFullYear()
  const [date, setDate] = useState(`${tahun}-0${bulan + 1}`)
  const bookingController = new BookingController()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.booking.data)
  useEffect(() => {
    dispatch(bookingController.fetchBookingBatal(date))
  }, [date])

  console.log(data)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <CRow className="justify-content-between align-items-center">
              <CCol xs={8}>
                <strong>Rekap Booking Batal</strong>
              </CCol>
            </CRow>
            <CRow className="mt-3 mb-3">
              <CCol>
                <CFormInput type="month" value={date} onChange={(e) => setDate(e.target.value)} />
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow className="d-flex justify-content-center align-items-center">
              <CCol xs={7} md={5}>
                <CChartDoughnut
                  data={{
                    labels: ['Lain-Lain', 'Keperluan Mendesak', 'Tidak Ingin Memberitahu'],
                    datasets: [
                      {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [
                          data.lain?.length === 0
                            ? 0
                            : data.lain?.map((item) => item.jumlah_pasien),
                          data.keperluan?.length === 0
                            ? 0
                            : data.keperluan?.map((item) => item.jumlah_pasien),
                          data.tidakMemberitahu?.length === 0
                            ? 0
                            : data.tidakMemberitahu?.map((item) => item.jumlah_pasien),
                        ],
                      },
                    ],
                  }}
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter></CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RekapBooking
