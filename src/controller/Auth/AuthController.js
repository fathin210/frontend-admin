import axios from 'axios'
import { toast } from 'react-toastify'
import api from 'src/api/api'

export class AuthController {
  login = (data, event, history) => {
    event.preventDefault()
    axios
      .post('https://api-setiakawan.gazebo-skripsi.my.id/api/admin/login', data)
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token)
        history.push('/')
      })
      .catch((e) => {
        toast.error(e.response.data.meta.message)
      })
  }

  profile = () => {
    return api.get('/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
  }

  logout = (history) => {
    return api
      .post('/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then(() => {
        localStorage.clear()
        history.push('/login')
      })
  }
}
