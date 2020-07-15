import axios from 'axios'

const MEMBER_URI = 'v1/membership/member/'
const config = { headers: { 'Content-Type': 'application/json' } }

export default {
  getMember () {
    return axios.get(MEMBER_URI)
  },
  submitForm (data) {
    return axios
      .post(MEMBER_URI, data, config)
  },
  getMemberById (id) {
    return axios
      .get(`${MEMBER_URI}${id}`)
  },
  updateData (data, id) {
    return axios
      .post(`${MEMBER_URI}${id}/update`, data, config)
  },
  deleteData (id) {
    return axios
      .delete(`${MEMBER_URI}${id}/delete`)
  }
}
