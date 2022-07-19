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
import { AntrianController } from 'src/controller/Antrian/AntrianController'
import { ANTRIAN_DETAIL, ANTRIAN_MODAL_HIDDEN } from 'src/redux/actionTypes'

function ModalAntrian() {
  const date = new Date()
  const antrian = useSelector((state) => state.antrian.modal.antrian)
  const modalAntrian = useSelector((state) => state.antrian.modal.show)
  const dispatch = useDispatch()
  const antrianController = new AntrianController()
  console.log(antrian)
  return (
    <CModal visible={modalAntrian} onClose={() => dispatch({ type: ANTRIAN_MODAL_HIDDEN })}>
      <CModalHeader onClose={() => dispatch({ type: ANTRIAN_MODAL_HIDDEN })}>
        <CModalTitle>Tambahkan Ke Antrian</CModalTitle>
      </CModalHeader>
      <CForm
        onSubmit={(e) => {
          dispatch(antrianController.insertAntrian(antrian, e))
        }}
      >
        <CModalBody>
          <CRow>
            <CCol>
              <CFormFloating className="mb-3">
                <CFormInput
                  id="nama"
                  name="nama"
                  value={antrian.nama}
                  placeholder="Nama Pasien"
                  disabled
                />
                <CFormLabel>Nama Pasien</CFormLabel>
              </CFormFloating>
              <CFormFloating>
                <CFormInput
                  id="nama"
                  name="nama"
                  type="date"
                  min={date.toLocaleDateString('en-CA')}
                  value={antrian.tanggal_pelaksanaan}
                  onChange={(e) =>
                    dispatch({
                      type: ANTRIAN_DETAIL,
                      payload: {
                        ...antrian,
                        tanggal_pelaksanaan: e.target.value,
                      },
                    })
                  }
                  placeholder="Nama Pasien"
                  required
                />
                <CFormLabel>Tanggal Pelaksanaan</CFormLabel>
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

export default ModalAntrian
