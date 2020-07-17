export default {
  formatPrice (value) {
    let val = (value / 1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },
  filterInput (e) {
    e.target.value = e.target.value.replace(/[^0-9]+/g, '')
  }
}
