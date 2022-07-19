import {
  CButton,
  CCol,
  CForm,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TARIF_DETAIL, TARIF_MODAL_HIDDEN } from 'src/redux/actionTypes'
import { TarifGigiController } from 'src/controller/TarifGigi/TarifGigiController'

function ModalTarif() {
  const tarif = useSelector((state) => state.tarif.detail)
  const ModalTarif = useSelector((state) => state.tarif.modal)
  const dispatch = useDispatch()
  const tarifGigiController = new TarifGigiController()

  return (
    <CModal visible={ModalTarif.show} onClose={() => dispatch({ type: TARIF_MODAL_HIDDEN })}>
      <CModalHeader onClose={() => dispatch({ type: TARIF_MODAL_HIDDEN })}>
        <CModalTitle>{ModalTarif.isInsert ? 'Tambah Tarif Baru' : 'Edit Data Tarif'}</CModalTitle>
      </CModalHeader>
      <CForm
        onSubmit={(event) => {
          if (ModalTarif.isInsert) {
            dispatch(tarifGigiController.insertTarif(tarif, event))
          } else {
            dispatch(tarifGigiController.updateTarif(tarif, event))
          }
        }}
      >
        <CModalBody>
          <CRow>
            <CCol>
              <CFormFloating className="mb-3">
                <CFormInput
                  id="tarif_gigi"
                  name="tarif_gigi"
                  value={tarif.tarif_gigi}
                  type="number"
                  onChange={(e) => {
                    dispatch({
                      type: TARIF_DETAIL,
                      payload: {
                        ...tarif,
                        tarif_gigi: e.target.value,
                      },
                    })
                  }}
                  placeholder="Tarif Gigi"
                />
                <CFormLabel>Tarif Gigi</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit">Simpan</CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default ModalTarif
