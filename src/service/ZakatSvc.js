import axios from 'axios'

const ZAKAT_URI = 'v1/zakat/'
const config = { headers: { 'Content-Type': 'application/json' } }

export default {
  getZakat () {
    return axios.get(ZAKAT_URI)
  },
  submitForm (data) {
    return axios
      .post(ZAKAT_URI, data, config)
  }
}
