import { applyMiddleware, combineReducers, createStore } from 'redux'
import antrianReducer from './reducers/antrian'
import bookingReducer from './reducers/booking'
import updateReducer from './reducers/update'
import sidebarReducer from './reducers/sidebar'
import sidebarUnfoldableReducer from './reducers/sidebarUnfoldable'
import pasienReducer from './reducers/pasien'
import pelayananReducer from './reducers/pelayanan'
// import rincianReducer from './reducers/rincian'
import teknisiReducer from './reducers/teknisi'
import tarifReducer from './reducers/tarif'
import thunk from 'redux-thunk'

let rootReducers = combineReducers({
  antrian: antrianReducer,
  booking: bookingReducer,
  pelayanan: pelayananReducer,
  // rincian: rincianReducer,
  update: updateReducer,
  sidebarShow: sidebarReducer,
  sidebarUnfoldable: sidebarUnfoldableReducer,
  pasien: pasienReducer,
  teknisi: teknisiReducer,
  tarif: tarifReducer,
})

export const store = createStore(rootReducers, applyMiddleware(thunk))
