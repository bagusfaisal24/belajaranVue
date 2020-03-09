import axios from 'axios'

const MEMBER_URI = 'v1/membership/member/'

export default {
  // getHistory(token) {
  //   const config = { headers: { Authorization: `Bearer ${token}` } };
  //   return axios
  //     .get(HISTORY_URI, config);
  // },
  getMember () {
    return axios.get(MEMBER_URI)
  }
}
