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
import { TEKNISI_DETAIL, TEKNISI_MODAL_HIDDEN } from 'src/redux/actionTypes'
import { TeknisiController } from 'src/controller/Teknisi/TeknisiController'

function ModalTeknisi() {
  const teknisi = useSelector((state) => state.teknisi.detail)
  const ModalTeknisi = useSelector((state) => state.teknisi.modal)
  const dispatch = useDispatch()
  const teknisiController = new TeknisiController()

  return (
    <CModal visible={ModalTeknisi.show} onClose={() => dispatch({ type: TEKNISI_MODAL_HIDDEN })}>
      <CModalHeader onClose={() => dispatch({ type: TEKNISI_MODAL_HIDDEN })}>
        <CModalTitle>
          {ModalTeknisi.isInsert ? 'Tambah Teknisi Baru' : 'Edit Data Teknisi'}
        </CModalTitle>
      </CModalHeader>
      <CForm
        onSubmit={(event) => {
          if (ModalTeknisi.isInsert) {
            dispatch(teknisiController.insertTeknisi(teknisi, event))
          } else {
            dispatch(teknisiController.updateTeknisi(teknisi, event))
          }
        }}
      >
        <CModalBody>
          <CRow>
            <CCol>
              <CFormFloating className="mb-3">
                <CFormInput
                  id="nama"
                  name="nama"
                  value={teknisi.nama}
                  required
                  onChange={(e) => {
                    dispatch({
                      type: TEKNISI_DETAIL,
                      payload: {
                        ...teknisi,
                        nama: e.target.value,
                      },
                    })
                  }}
                  placeholder="Nama Teknisi"
                />
                <CFormLabel>Nama Teknisi</CFormLabel>
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

export default ModalTeknisi
