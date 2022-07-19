import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect } from 'react'
import { AuthController } from 'src/controller/Auth/AuthController'
import { ToastContainer } from 'react-toastify'

const Login = () => {
  const history = useHistory()
  const authController = new AuthController()
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      history.push('/')
    }
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(event) => authController.login(form, event, history)}>
                    <h1>Login Admin</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CButton type="submit" color="primary" className="btn btn-lg px-4 btn-block">
                        Login
                      </CButton>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
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
      </CContainer>
    </div>
  )
}

export default Login
