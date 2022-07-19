import {
  CButton,
  CCol,
  CForm,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
import { ANTRIAN_MODAL_HIDDEN, RINCIAN_DETAIL } from 'src/redux/actionTypes'

function ModalRincianBiaya() {
  const rincian = useSelector((state) => state.antrian.modal.rincian)
  const modal = useSelector((state) => state.antrian.modal.show)
  const teknisi = useSelector((state) => state.teknisi.data)
  const tarif = useSelector((state) => state.tarif.data)
  const pelayanan = useSelector((state) => state.pelayanan.data)
  const dispatch = useDispatch()
  const antrianController = new AntrianController()

  console.log(rincian)
  return (
    <CModal visible={modal} onClose={() => dispatch({ type: ANTRIAN_MODAL_HIDDEN })}>
      <CModalHeader onClose={() => dispatch({ type: ANTRIAN_MODAL_HIDDEN })}>
        <CModalTitle>Edit Rincian Biaya</CModalTitle>
      </CModalHeader>
      <CForm
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(antrianController.updateAntrian(rincian))
        }}
      >
        <CModalBody>
          <CRow>
            <CCol>
              <CFormFloating className="mb-3">
                <CFormInput
                  id="nama"
                  value={rincian.nama}
                  name="nama"
                  placeholder="Nama Pasien"
                  disabled
                />
                <CFormLabel>Nama Pasien</CFormLabel>
              </CFormFloating>
              <CFormFloating className="mb-3">
                <CFormSelect
                  value={rincian?.id_teknisi === null ? '' : rincian.id_teknisi}
                  onChange={(e) =>
                    dispatch({
                      type: RINCIAN_DETAIL,
                      payload: {
                        ...rincian,
                        id_teknisi: e.target.value,
                      },
                    })
                  }
                >
                  <option>Pilih Teknisi</option>
                  {teknisi?.map((item) => {
                    return (
                      <option key={item.id_teknisi} value={item.id_teknisi}>
                        {item.nama}
                      </option>
                    )
                  })}
                </CFormSelect>
                <CFormLabel>Teknisi</CFormLabel>
              </CFormFloating>
              <CFormFloating className="mb-3">
                <CFormSelect
                  value={rincian?.id_pelayanan === null ? '' : rincian.id_pelayanan}
                  onChange={(e) => {
                    e.target.value == 2
                      ? dispatch({
                          type: RINCIAN_DETAIL,
                          payload: {
                            ...rincian,
                            id_pelayanan: e.target.value,
                            id_tarif: '',
                          },
                        })
                      : dispatch({
                          type: RINCIAN_DETAIL,
                          payload: {
                            ...rincian,
                            id_pelayanan: e.target.value,
                          },
                        })
                  }}
                >
                  <option>Pilih Jenis Pelayanan</option>
                  {pelayanan?.map((item) => {
                    return (
                      <option key={item.id_pelayanan} value={item.id_pelayanan}>
                        {item.jenis_pelayanan}
                      </option>
                    )
                  })}
                </CFormSelect>
                <CFormLabel>Jenis Pelayanan</CFormLabel>
              </CFormFloating>
              {(rincian.id_pelayanan == 1 || rincian.id_pelayanan == 3) && (
                <CFormFloating className="mb-3">
                  <CFormSelect
                    value={rincian?.id_tarif === null ? '' : rincian.id_tarif}
                    onChange={(e) => {
                      dispatch({
                        type: RINCIAN_DETAIL,
                        payload: {
                          ...rincian,
                          id_tarif: e.target.value,
                        },
                      })
                    }}
                  >
                    <option>Pilih Tarif Gigi</option>
                    {tarif?.map((item) => {
                      return (
                        <option key={item.id_tarif} value={item.id_tarif}>
                          Rp. {item.tarif_gigi}
                        </option>
                      )
                    })}
                  </CFormSelect>
                  <CFormLabel>Tarif Gigi</CFormLabel>
                </CFormFloating>
              )}
              <CFormFloating>
                <CFormInput
                  id="jumlah_gigi"
                  value={rincian.jumlah_gigi}
                  type="number"
                  name="jumlah_gigi"
                  onChange={(e) => {
                    dispatch({
                      type: RINCIAN_DETAIL,
                      payload: {
                        ...rincian,
                        jumlah_gigi: e.target.value,
                      },
                    })
                  }}
                  placeholder="Jumlah Gigi"
                />
                <CFormLabel>Jumlah Gigi</CFormLabel>
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

export default ModalRincianBiaya
