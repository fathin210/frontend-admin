import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilHistory,
  cilMoney,
  cilNotes,
  cilSpeedometer,
  cilUser,
  cilWifiSignal4,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Master',
  },
  {
    component: CNavItem,
    name: 'Teknisi',
    to: '/teknisi',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tarif Gigi',
    to: '/tarif',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pasien',
    to: '/pasien',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Antrian',
  },
  {
    component: CNavItem,
    name: 'Antrian Onsite',
    to: '/antrian',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Booking Antrian',
    to: '/booking',
    icon: <CIcon icon={cilWifiSignal4} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Rincian Biaya',
    to: '/rincian',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Laporan',
  },
  {
    component: CNavItem,
    name: 'Laporan Booking Batal',
    to: '/laporan/booking',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
]

export default _nav
