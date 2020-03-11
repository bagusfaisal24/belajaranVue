<template>
  <b-modal id="modal-1" size="lg" title="Tambah Data Peserta" hide-footer>
    <div role="group">
      <b-form-group
        label-cols-sm="3"
        label="Nama">
        <b-form-input
          id="name"
          v-model="name"/>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Tempat Lahir">
        <b-form-input
          id="dob-place"
          v-model="dobPlace"/>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Pekerjaan">
        <b-form-input
          id="dob-place"
          v-model="job"/>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Tanggal Lahir">
        <b-form-datepicker
          id="start-date"
          placeholder="Silakan pilih tanggal"
          v-model="birthDate"
          locale="id"
          size="md"
          calendar-width="290"
          start-weekday=1
          hide-header=false/>
        </b-form-datepicker>
      </b-form-group>
      <hr/>
    </div>
    <b-button class="mt-2" variant="outline-primary" block @click="toggleModal">Simpan</b-button>
  </b-modal>
</template>

<script>

import moment from 'moment'
import MemberSvc from '../../service/MemberSvc'

export default {
  name: 'MemberForm',
  data () {
    return {
      name: '',
      birthDate: '',
      job: '',
      dobPlace: ''
    }
  },
  methods: {
    toggleModal (evt) {
      this.isSubmit()
      evt.preventDefault()
      const data = {
        name: this.name,
        birthDate: moment(this.birthDate).locale('ID').format('DD-MM-YYYY'),
        dobPlace: this.dobPlace,
        job: this.job
      }
      MemberSvc.submitForm(data)
        .then(() => {
          this.isSubmit()
          this.showNotification('Berhasil Menyimpan')
        })
        .catch(e => console.log(e))
    },
    isSubmit () {
      this.submit = !this.submit
    },
    showNotification (message) {
      const variant = 'outline-primary'
      this.$bvToast.toast(message, {
        title: 'Sukses',
        autoHideDelay: 5000,
        variant
      })
    }
  }
}
</script>

<style scoped>

</style>
