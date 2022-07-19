import { cilCheck, cilOptions, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
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
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import { AntrianController } from 'src/controller/Antrian/AntrianController'
import { AuthController } from 'src/controller/Auth/AuthController'

function Antrian() {
  var myDate = new Date()
  const [date, setDate] = useState(myDate.toLocaleDateString('en-CA'))
  const dispatch = useDispatch()
  const update = useSelector((state) => state.update)
  const antrianController = new AntrianController()
  const antrian = useSelector((state) => state.antrian.data)
  const authController = new AuthController()
  const history = useHistory()

  useEffect(() => {
    authController
      .profile()
      .then(() => {
        dispatch(antrianController.fetchAntrian(date))
      })
      .catch((e) => {
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
                <strong>List Data Antrian</strong>
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
                  <CTableHeaderCell scope="row">No. Pendaftaran</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Nama</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="row"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* Disini map data dari api */}
                {antrian.length > 0 ? (
                  antrian?.map((data, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="col">{++index}</CTableHeaderCell>
                        <CTableDataCell>{data?.nomor_pendaftaran}</CTableDataCell>
                        <CTableDataCell>{data.pasien?.nama}</CTableDataCell>
                        <CTableDataCell>
                          {data?.id_status === 1 ? (
                            <CBadge color="primary" shape="rounded-pill">
                              {data.status.jenis_status}
                            </CBadge>
                          ) : data.id_status === 2 ? (
                            <CBadge color="secondary" shape="rounded-pill">
                              {data.status.jenis_status}
                            </CBadge>
                          ) : data.id_status === 3 ? (
                            <CBadge color="success" shape="rounded-pill">
                              {data.status.jenis_status}
                            </CBadge>
                          ) : (
                            <CBadge color="danger" shape="rounded-pill">
                              {data.status.jenis_status}
                            </CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CDropdown>
                            <CDropdownToggle color="light">
                              <CIcon icon={cilOptions} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem
                                role={'button'}
                                onClick={() =>
                                  dispatch(
                                    antrianController.updateStatusAntrian(
                                      data?.id_antrian,
                                      2,
                                      'Sedang Ditangani',
                                    ),
                                  )
                                }
                              >
                                <CIcon icon={cilCheck} className="me-2" />
                                Tangani
                              </CDropdownItem>
                              <CDropdownItem
                                role={'button'}
                                onClick={() =>
                                  dispatch(
                                    antrianController.updateStatusAntrian(
                                      data?.id_antrian,
                                      4,
                                      'Batal',
                                    ),
                                  )
                                }
                              >
                                <CIcon icon={cilX} className="me-2" />
                                Batal
                              </CDropdownItem>
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

export default Antrian
