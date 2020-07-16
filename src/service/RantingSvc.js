import axios from 'axios'

const RANTING_URI = 'v1/ranting/'
const config = { headers: { 'Content-Type': 'application/json' } }

export default {
  getRanting () {
    return axios.get(RANTING_URI)
  },
  submitForm (data) {
    return axios
      .post(RANTING_URI, data, config)
  },
  getDetail (id) {
    return axios
      .get(`${RANTING_URI}${id}`)
  },
  updateData (data, id) {
    return axios
      .post(`${RANTING_URI}${id}/update`, data, config)
  },
  deleteData (id) {
    return axios
      .delete(`${RANTING_URI}${id}/delete`, config)
  }
}
