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
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import API from '../../../api/api'

const CreateTarifSchema = Yup.object().shape({
  tarif_gigi: Yup.number().required('Field Nama harus diisi!'),
})

function TambahTarif() {
  const [validated, setValidated] = useState(false)
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      tarif_gigi: '',
    },
    validationSchema: CreateTarifSchema,
    onSubmit: (value) => {
      console.log(value)
      setValidated(true)
      API.post('/tarif', value)
        .then(() => {
          history.push('/tarif')
          toast.success('Tambah Tarif Gigi Sukses')
        })
        .catch((errors) => console.log(errors))
    },
  })

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader>Formulir Tambah Tarif</CCardHeader>
          <CCardBody>
            <CForm onSubmit={formik.handleSubmit} noValidate validated={validated}>
              <CRow className="mb-3">
                <CCol>
                  <CFormFloating>
                    <CFormInput
                      id="tarif_gigi"
                      name="tarif_gigi"
                      value={formik.values.tarif_gigi}
                      onChange={formik.handleChange}
                      placeholder="Tarif Gigi"
                      type="number"
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
    </CRow>
  )
}

export default TambahTarif
