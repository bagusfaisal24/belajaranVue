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
  }
}
