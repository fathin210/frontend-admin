import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CRow, CWidgetStatsF } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilUser, cilAvTimer, cilCheck, cilX, cilList } from '@coreui/icons'
import axios from 'axios'
import { AuthController } from 'src/controller/Auth/AuthController'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Dashboard = () => {
  var date = new Date()
  const [dataOneWeek, setDataOneWeek] = useState({
    tanggal: [],
    selesai: [],
    batal: [],
  })
  const [dataStatus, setDataStatus] = useState({
    total: [],
    menunggu: [],
    ditangani: [],
    selesai: [],
    batal: [],
  })

  const authController = new AuthController()
  const history = useHistory()

  const getDataOneStatus = () => {
    axios
      .get('http://127.0.0.1:8000/api/info-antrian/day', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        setDataStatus(res.data.data)
      })
  }

  const getDataOneWeek = () => {
    axios
      .get('http://127.0.0.1:8000/api/admin/info-antrian/week', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        setDataOneWeek(res.data.data)
      })
  }

  useEffect(() => {
    authController
      .profile()
      .then(() => {
        getDataOneStatus()
        getDataOneWeek()
      })
      .catch((e) => {
        localStorage.clear()
        history.push('/login')
        toast.error('Silahkan Login Kembali')
      })
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <strong>Data Antrian Hari Ini</strong>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            padding={false}
            icon={<CIcon icon={cilAvTimer} height={24} />}
            title="Menunggu"
            value={dataStatus.menunggu?.length === 0 ? '0' : dataStatus.menunggu[0].jumlah_pasien}
          />
        </CCol>
        <CCol xs={12} md={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="secondary"
            padding={false}
            icon={<CIcon icon={cilList} height={24} />}
            title="Sedang Ditangani"
            value={dataStatus.ditangani?.length === 0 ? '0' : dataStatus.ditangani[0].jumlah_pasien}
          />
        </CCol>
        <CCol xs={12} md={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            padding={false}
            icon={<CIcon icon={cilCheck} height={24} />}
            title="Selesai"
            value={dataStatus.selesai?.length === 0 ? '0' : dataStatus.selesai[0].jumlah_pasien}
          />
        </CCol>
        <CCol xs={12} md={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            padding={false}
            icon={<CIcon icon={cilX} height={24} />}
            title="Batal"
            value={dataStatus.batal?.length === 0 ? '0' : dataStatus.batal[0].jumlah_pasien}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CWidgetStatsF
            className="mb-3"
            color="info"
            padding={false}
            icon={<CIcon icon={cilUser} height={24} />}
            title="Antrian Hari Ini"
            value={dataStatus.total?.length === 0 ? '0' : dataStatus.total[0]?.jumlah_pasien}
          />
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Pasien
              </h4>
              <div className="small text-medium-emphasis">
                {`${date.toLocaleString('id-ID', { month: 'long' })} ${date.getFullYear()}`}
              </div>
            </CCol>
          </CRow>
          <CChart
            type="bar"
            data={{
              labels: dataOneWeek.tanggal?.map((item) => item?.tanggal_pelaksanaan),
              datasets: [
                {
                  label: 'Jumlah Pasien',
                  backgroundColor: 'blue',
                  data: dataOneWeek.tanggal?.map((item) => item?.jumlah_pasien),
                },
              ],
            }}
            labels="months"
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
