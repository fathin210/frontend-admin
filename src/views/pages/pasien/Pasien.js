import { cilCheck, cilInfo, cilOptions, cilPen, cilSearch, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import debounce from 'lodash.debounce'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import ModalAntrian from 'src/components/modal/ModalAntrian'
import { PasienController } from 'src/controller/Pasien/PasienController'
import { ANTRIAN_DETAIL, ANTRIAN_MODAL_SHOW, PASIEN_DETAIL } from 'src/redux/actionTypes'

function Pasien() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const update = useSelector((state) => state.update)
  const pasien = useSelector((state) => state.pasien.data.data)
  const antrian = useSelector((state) => state.antrian.modal.antrian)
  const infoPage = useSelector((state) => state.pasien.data)
  const pasienController = new PasienController()

  const useQuery = () => {
    const { search } = useLocation()
    return new URLSearchParams(search, [search])
  }

  let query = useQuery()

  const handleNextPage = () => {
    setPage((page) => ++page)
    window.scrollTo({ top: 0 })
  }

  const handlePrevPage = () => {
    setPage((page) => --page)
    window.scrollTo({ top: 0 })
  }

  const debounced = useCallback(
    debounce((value) => dispatch(pasienController.searchPasien(value)), 500),
    [],
  )

  const search = (e) => {
    debounced(e.target.value)
  }

  useEffect(() => {
    if (query.get('nomor_pasien') == null) {
      dispatch(pasienController.fetchPasien(page))
    } else {
      dispatch(pasienController.searchPasien(query.get('nomor_pasien')))
    }
  }, [page, update])

  return (
    <CRow>
      <ModalAntrian />
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <CRow className="justify-content-between align-items-center">
              <CCol xs={8}>
                <strong>List Data Pasien</strong>
              </CCol>
              <CCol xs={4} className="d-flex justify-content-end">
                <Link to={'/pasien/tambah'}>
                  <CButton>Tambah Pasien</CButton>
                </Link>
              </CCol>
            </CRow>
            <CRow className="mt-3 mb-3">
              <CCol>
                <CInputGroup>
                  <CInputGroupText style={{ background: 'white', borderRight: 'none' }}>
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Cari Data Pasien"
                    onChange={(e) => search(e)}
                    style={{ borderLeft: 'none' }}
                  />
                </CInputGroup>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="md" hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="row">No.</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Nama</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Nomor Pasien</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Jenis Kelamin</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Alamat</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Nomor Telepon</CTableHeaderCell>
                  <CTableHeaderCell scope="row"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ overflow: 'hidden' }}>
                {/* Disini map data dari api */}
                {pasien?.length > 0 ? (
                  pasien.map((data, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="col">{data.id_pasien}</CTableHeaderCell>
                        <CTableDataCell>{data.nama}</CTableDataCell>
                        <CTableDataCell>{data.nomor_pasien}</CTableDataCell>
                        <CTableDataCell>
                          {data.jenis_kelamin === 'L' ? 'Pria' : 'Wanita'}
                        </CTableDataCell>
                        <CTableDataCell width={120}>{data.alamat}</CTableDataCell>
                        <CTableDataCell>{data.no_telepon}</CTableDataCell>
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
                                    type: ANTRIAN_DETAIL,
                                    payload: {
                                      ...antrian,
                                      nama: data.nama,
                                      id_pasien: data.id_pasien,
                                    },
                                  })
                                  dispatch({
                                    type: ANTRIAN_MODAL_SHOW,
                                  })
                                }}
                              >
                                <CIcon icon={cilCheck} className="me-2" />
                                Tambahkan ke Antrian
                              </CDropdownItem>
                              <CDropdownItem
                                role={'button'}
                                onClick={() => {
                                  // dispatch(pasienController.detailPasien(data))
                                  history.push(`/pasien/detail/${data.id_pasien}`)
                                }}
                              >
                                <CIcon icon={cilInfo} className="me-2" />
                                Lihat Detail Pasien
                              </CDropdownItem>
                              <CDropdownItem
                                role={'button'}
                                onClick={() => {
                                  dispatch({
                                    type: PASIEN_DETAIL,
                                    payload: data,
                                  })
                                  history.push(`/pasien/edit/${data.id_pasien}`)
                                }}
                              >
                                <CIcon icon={cilPen} className="me-2" />
                                Edit
                              </CDropdownItem>
                              <CDropdownItem
                                role={'button'}
                                onClick={() =>
                                  dispatch(pasienController.deletePasien(data.id_pasien))
                                }
                              >
                                <CIcon icon={cilTrash} className="me-2" />
                                Delete
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
          <CCardFooter>
            <CRow>
              <CCol xs={12} className="d-flex justify-content-center">
                <CPagination>
                  <CPaginationItem
                    disabled={infoPage?.prev_page_url === null && true}
                    onClick={handlePrevPage}
                    style={{ cursor: 'pointer' }}
                  >
                    Sebelumnya
                  </CPaginationItem>
                  <CPaginationItem
                    disabled={infoPage?.next_page_url === null && true}
                    onClick={handleNextPage}
                    style={{ cursor: 'pointer' }}
                  >
                    Selanjutnya
                  </CPaginationItem>
                </CPagination>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Pasien
