<template>
  <b-container>
    <b-row>
      <b-col>
      </b-col>
      <b-col cols="10" class="my-1">
        <h3>
          Form Update Data Peserta
        </h3>
        <div role="group">
          <b-form-group
            label-cols-sm="3"
            label-cols-lg="3"
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
              start-weekday=1/>
            </b-form-datepicker>
          </b-form-group>
          <hr/>
        </div>
        <b-button class="mt-3" variant="outline-primary" block @click="hideModal">Simpan</b-button>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment'
import MemberSvc from '../../service/MemberSvc'

export default {
  name: 'UpdateMember',
  data () {
    return {
      name: '',
      birthDate: '',
      job: '',
      dobPlace: ''
    }
  },
  methods: {
    hideModal () {
      this.isSubmit()
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
      this.$refs['myModal'].hide()
    },
    isSubmit () {
      this.submit = !this.submit
    },
    showModal () {
      this.$refs['myModal'].show()
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
