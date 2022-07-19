import { cilOptions, cilPen, cilPrint } from '@coreui/icons'
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
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import { AntrianController } from 'src/controller/Antrian/AntrianController'
import { TeknisiController } from 'src/controller/Teknisi/TeknisiController'
import { TarifGigiController } from 'src/controller/TarifGigi/TarifGigiController'
import ModalRincianBiaya from 'src/components/modal/ModalRincianBiaya'
import { ANTRIAN_MODAL_SHOW, RINCIAN_DETAIL } from 'src/redux/actionTypes'
import { PelayananController } from 'src/controller/Pelayanan/PelayananController'

function RincianBiaya() {
  var myDate = new Date()
  const [date, setDate] = useState(myDate.toLocaleDateString('en-CA'))
  const dispatch = useDispatch()
  const update = useSelector((state) => state.update)
  const antrian = useSelector((state) => state.antrian.data)
  const dataModalRincian = useSelector((state) => state.antrian.rincian)
  const antrianController = new AntrianController()
  const teknisiController = new TeknisiController()
  const tarifGigiController = new TarifGigiController()
  const pelayananController = new PelayananController()

  useEffect(() => {
    dispatch(antrianController.fetchAntrian(date))
  }, [date, update])

  useEffect(() => {
    dispatch(teknisiController.fetchTeknisi())
    dispatch(pelayananController.fetchPelayanan())
    dispatch(tarifGigiController.fetchTarif())
  }, [])

  return (
    <CRow>
      <ModalRincianBiaya />
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <CRow className="justify-content-between align-items-center">
              <CCol xs={8}>
                <strong>List Rincian Biaya</strong>
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
                  <CTableHeaderCell scope="row">Teknisi</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Jenis Pelayanan</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Tarif Gigi</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Jumlah Gigi</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Total Biaya</CTableHeaderCell>
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
                        <CTableDataCell>{data.teknisi?.nama}</CTableDataCell>
                        <CTableDataCell>{data.pelayanan?.jenis_pelayanan}</CTableDataCell>
                        <CTableDataCell>
                          <CurrencyFormat
                            value={data.tarif?.tarif_gigi}
                            thousandSeparator
                            displayType="text"
                            prefix="Rp. "
                          />
                        </CTableDataCell>
                        <CTableDataCell>{data?.jumlah_gigi}</CTableDataCell>
                        <CTableDataCell>
                          {
                            <CurrencyFormat
                              value={data.total_biaya != null ? data.total_biaya : 0}
                              thousandSeparator
                              displayType="text"
                              prefix="Rp. "
                            />
                          }
                        </CTableDataCell>
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
                                onClick={() => {
                                  dispatch({
                                    type: RINCIAN_DETAIL,
                                    payload: {
                                      ...dataModalRincian,
                                      id_antrian: data.id_antrian,
                                      id_status: data.id_status,
                                      id_pelayanan: data?.id_pelayanan,
                                      id_teknisi: data?.id_teknisi,
                                      id_tarif: data?.id_tarif,
                                      jumlah_gigi: data?.jumlah_gigi,
                                      nama: data.pasien.nama,
                                    },
                                  })
                                  dispatch({
                                    type: ANTRIAN_MODAL_SHOW,
                                  })
                                }}
                              >
                                <CIcon icon={cilPen} className="me-2" />
                                Edit Rincian Biaya
                              </CDropdownItem>
                              <CDropdownItem
                                disabled={data.id_status !== 3}
                                role={'button'}
                                onClick={() => antrianController.cetakKwitansi(data.id_antrian)}
                              >
                                <CIcon icon={cilPrint} className="me-2" />
                                Cetak Kwitansi
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={12}>
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

export default RincianBiaya
