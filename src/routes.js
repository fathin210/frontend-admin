import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const Tarif = React.lazy(() => import('./views/pages/tarif/Tarif'))
const Teknisi = React.lazy(() => import('./views/pages/teknisi/Teknisi'))

const Pasien = React.lazy(() => import('./views/pages/pasien/Pasien'))
const TambahPasien = React.lazy(() => import('./views/pages/pasien/TambahPasien'))
const UbahPasien = React.lazy(() => import('./views/pages/pasien/UbahPasien'))
const DetailPasien = React.lazy(() => import('./views/pages/pasien/DetailPasien'))

const Antrian = React.lazy(() => import('./views/pages/antrian/Antrian'))
const RincianBiaya = React.lazy(() => import('./views/pages/antrian/RincianBiaya'))

const Booking = React.lazy(() => import('./views/pages/booking/Booking'))
const RekapBooking = React.lazy(() => import('./views/pages/laporan/RekapBooking'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  // Ini Route Pasien
  { path: '/pasien', exact: true, name: 'Pasien', component: Pasien },
  { path: '/pasien/tambah', name: 'Tambah Pasien', component: TambahPasien },
  { path: '/pasien/edit/:id_pasien', name: 'Ubah Data Pasien', component: UbahPasien },
  { path: '/pasien/detail/:id_pasien', name: 'Detail Pasien', component: DetailPasien },

  // Ini Route Teknisi
  { path: '/teknisi', exact: true, name: 'Teknisi', component: Teknisi },

  // Ini Route Antrian
  { path: '/antrian', exact: true, name: 'Antrian', component: Antrian },
  { path: '/rincian', exact: true, name: 'Antrian', component: RincianBiaya },

  // Ini Route Tarif
  { path: '/tarif', exact: true, name: 'Tarif', component: Tarif },

  // Ini Route Booking
  { path: '/booking', exact: true, name: 'Booking', component: Booking },
  { path: '/laporan/booking', exact: true, name: 'Rekap Booking', component: RekapBooking },
]

export default routes
