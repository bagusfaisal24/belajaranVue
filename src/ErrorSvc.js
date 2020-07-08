export default {
  getError (e) {
    if (typeof e.response !== 'undefined') {
      // eslint-disable-next-line default-case
      switch (e.response.status) {
        case 400:
          return e.response.data.message
            ? e.response.data.message : e.response.data.error_description
        case 401:
          return e.response.data.message
            ? e.response.data.message : e.response.data.error_description
        case 404:
          return e.response.data.message
        case 406:
          return 'File tidak ditemukan'
        case 409:
          // return 'Silakan periksa kembali'
          return e.response.data.message
        case 500:
          return 'Kegagalan sistem. Coba lagi'
      }
    }

    return 'Periksa koneksi internet Anda'
  },
  getErrorWithState (e, state) {
    if (typeof e.response !== 'undefined') {
      const { status } = e.response
      // eslint-disable-next-line default-case
      if (state === 'login') {
        if (status === 400) {
          return 'Kode pengguna atau kata sandi tidak sesuai'
        }
        if (status === 401) {
          return 'Kode pengguna atau kata sandi tidak sesuai'
        }
        if (status === 500) {
          return 'Kegagalan sistem. Coba lagi'
        }
      }
    }
    return 'Periksa koneksi internet Anda'
  },
  getErrors (e) {
    // eslint-disable-next-line prefer-const
    let errors = {}
    if (typeof e.response === 'undefined') {
      return errors
    }

    if (e.response.status !== 409) {
      return errors
    }

    if (typeof e.response.data.errors === 'undefined' || !Array.isArray(e.response.data.errors)) {
      return errors
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < e.response.data.errors.length; i++) {
      const v = e.response.data.errors[i]
      errors[v.field] = v.defaultMessage
    }
    return errors
  }
}
