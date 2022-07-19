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
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ToastContainer } from 'react-toastify'
import CurrencyFormat from 'react-currency-format'
import { TARIF_DETAIL, TARIF_MODAL_SHOW } from 'src/redux/actionTypes'
import { TarifGigiController } from 'src/controller/TarifGigi/TarifGigiController'
import ModalTarif from 'src/components/modal/ModalTarif'

function Tarif() {
  const tarif = useSelector((state) => state.tarif.data)
  const history = useHistory()
  const dispatch = useDispatch()
  const update = useSelector((state) => state.update)
  const tarifGigiController = new TarifGigiController()

  useEffect(() => {
    dispatch(tarifGigiController.fetchTarif())
  }, [update])

  console.log(tarif)

  return (
    <CRow>
      <ModalTarif />
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <CRow className="justify-content-between align-items-center mb-2">
              <CCol xs={8}>
                <strong>List Data Tarif Gigi</strong>
              </CCol>
              <CCol xs={4} className="d-flex justify-content-end">
                <CButton
                  onClick={() =>
                    dispatch({
                      type: TARIF_MODAL_SHOW,
                      payload: true,
                    })
                  }
                >
                  Tambah Tarif Gigi
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable responsive="md" hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="row">No.</CTableHeaderCell>
                  <CTableHeaderCell scope="row">Tarif Gigi</CTableHeaderCell>
                  <CTableHeaderCell scope="row"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* Disini map data dari api */}
                {tarif.length > 0 ? (
                  tarif?.map((data, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="col">{data.id_tarif}</CTableHeaderCell>
                        <CTableDataCell>
                          <CurrencyFormat
                            value={data.tarif_gigi}
                            displayType="text"
                            thousandSeparator
                            prefix="Rp. "
                          />
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
                                    type: TARIF_DETAIL,
                                    payload: data,
                                  })
                                  dispatch({
                                    type: TARIF_MODAL_SHOW,
                                  })
                                }}
                              >
                                <CIcon icon={cilPen} className="me-2" />
                                Edit
                              </CDropdownItem>
                              <CDropdownItem
                                role={'button'}
                                onClick={() => {
                                  dispatch(tarifGigiController.deleteTarif(data.id_tarif))
                                }}
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
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tarif
