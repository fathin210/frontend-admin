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
import API from '../../../api/api'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const CreateTeknisiSchema = Yup.object().shape({
  nama: Yup.string().required('Field Nama harus diisi!'),
})

function TambahTeknisi() {
  const [validated, setValidated] = useState(false)
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      nama: '',
    },
    validationSchema: CreateTeknisiSchema,
    onSubmit: (value) => {
      console.log(value)
      setValidated(true)
    },
  })

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader>Formulir Tambah Teknisi</CCardHeader>
          <CCardBody>
            <CForm onSubmit={formik.handleSubmit} noValidate validated={validated}>
              <CRow className="mb-3">
                <CCol>
                  <CFormFloating>
                    <CFormInput
                      id="nama"
                      name="nama"
                      value={formik.values.nama}
                      onChange={formik.handleChange}
                      placeholder="Nama Teknisi"
                      required
                    />
                    <CFormLabel>Nama Pasien</CFormLabel>
                    {formik.touched.nama && Boolean(formik.errors.nama) ? (
                      <CFormFeedback invalid>{formik.errors.nama}</CFormFeedback>
                    ) : (
                      <CFormFeedback valid>Nama sudah valid</CFormFeedback>
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

export default TambahTeknisi
