import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { AuthController } from 'src/controller/Auth/AuthController'

const AppHeaderDropdown = () => {
  const history = useHistory()

  const authCoontroller = new AuthController()

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem onClick={() => authCoontroller.logout(history)}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Keluar
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
