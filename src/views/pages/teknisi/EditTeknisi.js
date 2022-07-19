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
import { toast } from 'react-toastify'
import { TeknisiController } from 'src/controller/Teknisi/TeknisiController'
import * as Yup from 'yup'
import API from '../../../api/api'

const CreatePasienSchema = Yup.object().shape({
  nama: Yup.string().required('Field Nama harus diisi!'),
})

function EditTeknisi() {
  const [validated, setValidated] = useState(false)
  const history = useHistory()
  const teknisi = useSelector((state) => state.teknisi.detail)
  const teknisiController = new TeknisiController()

  console.log(teknisi)

  const formik = useFormik({
    initialValues: teknisi,
    validationSchema: CreatePasienSchema,
    onSubmit: (value) => {
      setValidated(true)
      teknisiController.editTeknisi(value, history)
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
                      id="nama"
                      name="nama"
                      value={formik.values.nama}
                      onChange={formik.handleChange}
                      placeholder="Nama Teknisi"
                      required
                    />
                    <CFormLabel>Nama Teknisi</CFormLabel>
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

export default EditTeknisi
