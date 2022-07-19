import { cilOptions, cilPen, cilTrash } from '@coreui/icons'
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
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import ModalTeknisi from 'src/components/modal/ModalTeknisi'
import { TeknisiController } from 'src/controller/Teknisi/TeknisiController'
import { TEKNISI_DETAIL, TEKNISI_MODAL_SHOW } from 'src/redux/actionTypes'

function Teknisi() {
  const dispatch = useDispatch()
  const update = useSelector((state) => state.update)
  const teknisi = useSelector((state) => state.teknisi.data)
  const teknisiController = new TeknisiController()

  useEffect(() => {
    dispatch(teknisiController.fetchTeknisi())
  }, [update])

  return (
    <CRow>
      <ModalTeknisi />
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <CRow className="justify-content-between align-items-center mb-2">
              <CCol xs={8}>
                <strong>List Data Teknisi</strong>
              </CCol>
              <CCol xs={4} className="d-flex justify-content-end">
                <CButton
                  onClick={() => {
                    dispatch({
                      type: TEKNISI_MODAL_SHOW,
                      payload: true,
                    })
                  }}
                >
                  Tambah Teknisi
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="md" hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="row">No.</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Nama</CTableHeaderCell>
                  <CTableHeaderCell scope="row"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* Disini map data dari api */}
                {teknisi?.map((data, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="col">{++index}</CTableHeaderCell>
                      <CTableDataCell>{data.nama}</CTableDataCell>
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
                                  type: TEKNISI_DETAIL,
                                  payload: data,
                                })
                                dispatch({
                                  type: TEKNISI_MODAL_SHOW,
                                  payload: false,
                                })
                              }}
                            >
                              <CIcon icon={cilPen} className="me-2" />
                              Edit
                            </CDropdownItem>
                            <CDropdownItem
                              role={'button'}
                              onClick={() =>
                                dispatch(teknisiController.deleteTeknisi(data.id_teknisi))
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
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Teknisi
