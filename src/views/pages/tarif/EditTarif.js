import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ToastContainer } from 'react-toastify'
import { TarifGigiController } from 'src/controller/TarifGigi/TarifGigiController'
import * as Yup from 'yup'

const CreateTarifSchema = Yup.object().shape({
  tarif_gigi: Yup.string().required('Field Nama harus diisi!'),
})

function EditTarif() {
  const [validated, setValidated] = useState(false)
  const history = useHistory()
  const tarif = useSelector((state) => state.tarif.detail)
  const tarifGigiController = new TarifGigiController()

  const formik = useFormik({
    initialValues: tarif,
    validationSchema: CreateTarifSchema,
    onSubmit: (data) => {
      setValidated(true)
      tarifGigiController.updateTarif(data, history)
    },
  })

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader>Formulir Edit Teknisi</CCardHeader>
          <CCardBody>
            <CForm onSubmit={formik.handleSubmit} noValidate validated={validated}>
              <CRow className="mb-3" xs={{ gutterY: 3 }}>
                <CCol>
                  <CFormFloating>
                    <CFormInput
                      id="tarif_gigi"
                      name="tarif_gigi"
                      value={formik.values.tarif_gigi}
                      onChange={formik.handleChange}
                      placeholder="Tarif Gigi"
                      required
                    />
                    <CFormLabel>Tarif Gigi</CFormLabel>
                    {formik.touched.tarif_gigi && Boolean(formik.errors.tarif_gigi) ? (
                      <CFormFeedback invalid>{formik.errors.tarif_gigi}</CFormFeedback>
                    ) : (
                      <CFormFeedback valid>Tarif Gigi sudah valid</CFormFeedback>
                    )}
                  </CFormFloating>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="d-grid">
                    <CButton type="submit">Simpan Data</CButton>
                  </div>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CRow>
  )
}

export default EditTarif
