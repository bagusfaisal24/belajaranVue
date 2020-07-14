import axios from 'axios'

const PRODUCT_TYPE = 'v1/master/product-type'

export default {
  getData () {
    return axios.get(PRODUCT_TYPE)
  }
}
