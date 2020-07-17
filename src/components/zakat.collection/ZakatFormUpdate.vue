<template>
    <b-container>
      <b-row>
        <b-col>
        </b-col>
        <b-col cols="9" class="my-1">
          <h3>
            Form Data Zakat
          </h3>
          <div role="group">
            <b-form-group
              label-cols-sm="3"
              label="Muzakki">
              <b-form-select v-model="muzakkiSelected" :options="newArrMuzakki"
                             :state="muzakkiState"
                             aria-describedby="input-live-help input-live-feedback"/>
              <b-form-invalid-feedback id="input-live-feedback">
                {{ messageError != null ? messageError : 'tidak boleh kosong' }}
              </b-form-invalid-feedback>
            </b-form-group>
            <hr/>
            <b-form-group
              label-cols-sm="3"
              label="Tipe Zakat">
              <b-form-select v-model="tipeZakatSelected" :options="newArrTipe"
                             :state="muzakkiState"
                             aria-describedby="input-live-help input-live-feedback"/>
              <b-form-invalid-feedback id="input-live-feedback">
                {{ messageError != null ? messageError : 'tidak boleh kosong' }}
              </b-form-invalid-feedback>
            </b-form-group>
            <hr/>
            <b-form-group
              label-cols-sm="3"
              label="Jumlah">
              <b-form-input
                id="job"
                v-model="jumlah"
                type="number"
                :state="jumlahState"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Jumlah"/>
              <b-form-invalid-feedback id="input-live-feedback">
                {{ messageError != null ? messageError : 'tidak boleh kosong' }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Tanggal Zakat">
              <b-form-datepicker
                id="start-date"
                placeholder="Silakan pilih tanggal"
                v-model="submitDate"
                locale="id"
                size="md"
                calendar-width="290"
                start-weekday=1/>
              </b-form-datepicker>
            </b-form-group>
            <hr/>
          </div>
          <b-button class="mt-3" variant="outline-primary" block @click="postData">Simpan</b-button>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import muzakki from '../../service/MemberSvc'
import tipeZakat from '../../service/ProductType'
import zakat from '../../service/ZakatSvc'
import ErrorSvc from '../../ErrorSvc'
import moment from 'moment'
import utils from '../../utils'

export default {
  name: 'ZakatFormUpdate',
  data () {
    return {
      muzakki: {},
      tipeZakat: {},
      newArrMuzakki: [],
      newArrTipe: [],
      muzakkiSelected: null,
      tipeZakatSelected: null,
      submitDate: null,
      messageError: null,
      jumlah: null,
      jumlahState: null,
      muzakkiState: null,
      tipeState: null,
      errors: {}
    }
  },
  methods: {
    getDataMuzakki () {
      this.isLoading()
      const DataMuzakki = muzakki.getMember()
      const promises = [DataMuzakki]
      Promise.all(promises)
        .then((res) => {
          this.muzakkis = res[0].data
          this.newArrMuzakki = this.muzakkis.map(function (v, index) {
            return { value: v.id, text: v.name }
          })
        })
        .catch(e => {
          this.errors = ErrorSvc.getError(e)
          this.showToast(this.errors)
        })
    },
    getDataTipeZakat () {
      this.isLoading()
      const tipeZakats = tipeZakat.getData()
      const promises = [tipeZakats]
      Promise.all(promises)
        .then((res) => {
          this.tipeZakats = res[0].data
          this.newArrTipe = this.tipeZakats.map(function (v, index) {
            return { value: v.id, text: v.name }
          })
        })
        .catch(e => {
          this.errors = ErrorSvc.getError(e)
          this.showToast(this.errors)
        })
    },
    postData () {
      this.isSubmit()
      const data = {
        memberId: this.muzakkiSelected,
        productTypeId: this.tipeZakatSelected,
        amount: this.jumlah,
        submitDate: moment(this.formatingDate(this.submit)).locale('ID').format('DD-MM-YYYY')
      }
      zakat.submitForm(data)
        .then(() => {
          this.isSubmit()
          this.showNotification('Berhasil Menyimpan')
        })
        .catch((e) => {
          this.errors = ErrorSvc.getError(e)
          this.showToast(this.errors)
          this.error = e.response.data
          this.fetchErrorData(this.error)
        })
    },
    isSubmit () {
      this.submit = !this.submit
    },
    isLoading () {
      this.loading = !this.loading
    },
    formatingDate (date) {
      return new Date(date)
    },
    onlyNumber (e) {
      utils.filterInput(e)
    },
    showNotification (message) {
      const variant = 'success'
      this.$bvToast.toast(message, {
        title: 'Sukses',
        autoHideDelay: 5000,
        variant
      })
    },
    showToast (message) {
      const variant = 'danger'
      this.$bvToast.toast(message, {
        title: 'Terjadi Kesalahan',
        autoHideDelay: 5000,
        variant
      })
    },
    fetchErrorData (data) {
      data.errors.forEach((detail) => {
        this.messageError = detail.defaultMessage

        if (detail.field === 'productTypeId') {
          this.tipeState = false
          this.messageError = detail.defaultMessage
        } else if (detail.field === 'memberId') {
          this.muzakkiState = false
          this.messageError = detail.defaultMessage
        } else if (detail.field === 'amount') {
          this.jumlahState = false
          this.messageError = detail.defaultMessage
        }
      })
    }
  },
  created () {
    this.getDataMuzakki()
    this.getDataTipeZakat()
  }
}
</script>

<style scoped>

</style>
