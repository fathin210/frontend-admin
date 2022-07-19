import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
import { useParams } from 'react-router-dom'
import { PasienController } from 'src/controller/Pasien/PasienController'

function DetailPasien() {
  const pasien = useSelector((state) => state.pasien.detail)
  const { id_pasien } = useParams()
  const pasienController = new PasienController()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pasienController.detailPasien(id_pasien))
  }, [])

  return (
    <>
      <CRow className="justify-content-center mb-3">
        <CCol xs={12} md={8}>
          <CCard>
            <CCardHeader>Data Pasien</CCardHeader>
            <CCardBody>
              <CRow className="mb-3" xs={{ gutterY: 3 }}>
                <CCol xs={12} md={6}>
                  <CFormFloating>
                    <CFormInput
                      id="nama"
                      name="nama"
                      value={pasien?.nama}
                      placeholder="Nama Pasien"
                      readOnly
                    />
                    <CFormLabel>Nama Pasien</CFormLabel>
                  </CFormFloating>
                </CCol>
                <CCol xs={12} md={6}>
                  <CFormFloating>
                    <CFormInput
                      name="alamat"
                      placeholder="Alamat"
                      value={pasien?.alamat}
                      readOnly
                    />
                    <CFormLabel>Alamat</CFormLabel>
                  </CFormFloating>
                </CCol>
              </CRow>
              <CRow xs={{ gutterY: 3 }}>
                <CCol xs={12} md={6}>
                  <CFormFloating>
                    <CFormSelect
                      name="jenis_kelamin"
                      value={pasien?.jenis_kelamin}
                      readOnly
                      options={[
                        'Silahkan Pilih',
                        { label: 'Laki-laki', value: 'L' },
                        { label: 'Perempuan', value: 'P' },
                      ]}
                    ></CFormSelect>
                    <CFormLabel>Jenis Kelamin</CFormLabel>
                  </CFormFloating>
                </CCol>
                <CCol xs={12} md={6}>
                  <CFormFloating className="mb-3">
                    <CFormInput
                      name="no_telepon"
                      value={pasien?.no_telepon}
                      minLength={7}
                      placeholder="Nomor Telepon"
                      readOnly
                    />
                    <CFormLabel>Nomor Telepon</CFormLabel>
                  </CFormFloating>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="d-grid">
                    <CButton onClick={() => pasienController.cetakKartu(pasien.id_pasien)}>
                      Cetak Kartu
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <CRow className="justify-content-between align-items-center">
                <CCol xs={8}>
                  <strong>List Data Kunjungan Pasien</strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable responsive="md" hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="row">No.</CTableHeaderCell>
                    <CTableHeaderCell scope="row">Nomor Antrian</CTableHeaderCell>
                    <CTableHeaderCell scope="row">Teknisi</CTableHeaderCell>
                    <CTableHeaderCell scope="row">Jenis Pelayanan</CTableHeaderCell>
                    <CTableHeaderCell scope="row">Tarif Gigi</CTableHeaderCell>
                    <CTableHeaderCell scope="row">Jumlah Gigi</CTableHeaderCell>
                    <CTableHeaderCell scope="row">Total Biaya</CTableHeaderCell>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {/* Disini map data dari api */}
                  {pasien.pendaftaran.length > 0 ? (
                    pasien.pendaftaran?.map((data, index) => {
                      return (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="col">{++index}</CTableHeaderCell>
                          <CTableDataCell>{data.nomor_pendaftaran}</CTableDataCell>
                          <CTableDataCell>{data.teknisi?.nama}</CTableDataCell>
                          <CTableDataCell>{data.pelayanan?.jenis_pelayanan}</CTableDataCell>
                          <CTableDataCell>{data.tarif?.tarif_gigi}</CTableDataCell>
                          <CTableDataCell>{data?.jumlah_gigi}</CTableDataCell>
                          <CTableDataCell>{data.total_biaya}</CTableDataCell>
                          <CTableDataCell width={120}>{data.alamat}</CTableDataCell>
                          <CTableDataCell>{data.no_telepon}</CTableDataCell>
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
    </>
  )
}

export default DetailPasien
