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
  CFormSelect,
  CRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { PasienController } from 'src/controller/Pasien/PasienController'
import * as Yup from 'yup'

const CreatePasienSchema = Yup.object().shape({
  nama: Yup.string().required('Field Nama harus diisi!'),
  alamat: Yup.string().required('Field Alamat harus diisi!'),
  jenis_kelamin: Yup.string()
    .max(1, 'Isi field terlalu panjang')
    .required('Field Jenis Kelamin harus diisi!'),
  no_telepon: Yup.number()
    .min(9999999999, 'Nomor Harus Lebih Dari 10 Karakter')
    .max(9999999999999, 'Nomor Harus Kurang Dari 13 Karakter')
    .required('Field Nomor Telepon harus diisi!'),
})

function TambahPasien() {
  const [validated, setValidated] = useState(false)
  const history = useHistory()
  const pasienController = new PasienController()

  const formik = useFormik({
    initialValues: {
      nama: '',
      alamat: '',
      jenis_kelamin: 'L',
      no_telepon: '',
    },
    validationSchema: CreatePasienSchema,
    onSubmit: (value) => {
      console.log(value)
      setValidated(true)
      if (value.no_telepon.toString().charAt(0) == '0') {
        value = {
          ...value,
          no_telepon: value.no_telepon.substring(1),
        }
        console.log(value.no_telepon)
      }
      pasienController.insertPasien(value, history)
    },
  })

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={8}>
        <CCard>
          <CCardHeader>Formulir Tambah Pasien</CCardHeader>
          <CCardBody>
            <CForm
              onSubmit={(e) => {
                setValidated(true)
                formik.handleSubmit(e)
              }}
              noValidate
              validated={validated}
            >
              <CRow className="mb-3" xs={{ gutterY: 3 }}>
                <CCol xs={12} md={6}>
                  <CFormFloating>
                    <CFormInput
                      id="nama"
                      name="nama"
                      value={formik.values.nama}
                      onChange={formik.handleChange}
                      placeholder="Nama Pasien"
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
                <CCol xs={12} md={6}>
                  <CFormFloating>
                    <CFormInput
                      name="alamat"
                      placeholder="Alamat"
                      value={formik.values.alamat}
                      onChange={formik.handleChange}
                      required
                    />
                    <CFormLabel>Alamat</CFormLabel>
                    {formik.touched.alamat && Boolean(formik.errors.alamat) ? (
                      <CFormFeedback invalid>{formik.errors.alamat}</CFormFeedback>
                    ) : (
                      <CFormFeedback valid>Alamat sudah valid</CFormFeedback>
                    )}
                  </CFormFloating>
                </CCol>
              </CRow>
              <CRow xs={{ gutterY: 3 }}>
                <CCol xs={12} md={6}>
                  <CFormFloating>
                    <CFormSelect
                      name="jenis_kelamin"
                      value={formik.values.jenis_kelamin}
                      onChange={formik.handleChange}
                      options={[
                        { label: 'Laki-laki', value: 'L' },
                        { label: 'Perempuan', value: 'P' },
                      ]}
                    ></CFormSelect>
                    <CFormLabel>Jenis Kelamin</CFormLabel>
                    {formik.touched.jenis_kelamin && Boolean(formik.errors.jenis_kelamin) ? (
                      <CFormFeedback invalid>{formik.errors.jenis_kelamin}</CFormFeedback>
                    ) : (
                      <CFormFeedback valid>Jenis Kelamin sudah valid</CFormFeedback>
                    )}
                  </CFormFloating>
                </CCol>
                <CCol xs={12} md={6}>
                  <CFormFloating className="mb-3">
                    <CFormInput
                      name="no_telepon"
                      type="number"
                      value={formik.values.no_telepon}
                      onChange={formik.handleChange}
                      min={9999999999}
                      max={9999999999999}
                      required
                      placeholder="Nomor Telepon"
                    />
                    <CFormLabel>Nomor Telepon</CFormLabel>
                    {formik.touched.no_telepon && Boolean(formik.errors.no_telepon) ? (
                      <CFormFeedback invalid>{formik.errors.no_telepon}</CFormFeedback>
                    ) : (
                      <CFormFeedback valid>Nomor Telepon sudah valid</CFormFeedback>
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

export default TambahPasien
