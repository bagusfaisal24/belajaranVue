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
              v-model="memberDetail.name"/>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Tempat Lahir">
            <b-form-input
              id="dob-place"
              v-model="memberDetail.dobPlace"/>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Pekerjaan">
            <b-form-input
              id="job"
              v-model="memberDetail.job"/>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Tanggal Lahir">
            <b-form-datepicker
              id="birth-date"
              placeholder="Silakan pilih tanggal"
              v-model="date"
              locale="id"
              size="md"
              calendar-width="300"
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
import moment from 'moment'
import MemberSvc from '../../service/MemberSvc'

export default {
  name: 'UpdateMember',
  data () {
    return {
      date: new Date(2020, 12, 23),
      memberDetail: {}
    }
  },
  methods: {
    getData (id) {
      this.isLoading()
      const MemberDetail = MemberSvc.getMemberById(id)
      const promises = [MemberDetail]
      Promise.all(promises)
        .then((res) => {
          this.memberDetail = res[0].data
        })
        .catch(e => console.log(e))
    },
    postData () {
      this.isSubmit()
      const data = {
        name: this.memberDetail.name,
        birthDate: moment(this.memberDetail.birthDate).locale('ID').format('DD-MM-YYYY'),
        dobPlace: this.memberDetail.dobPlace,
        job: this.memberDetail.job
      }
      MemberSvc.updateData(data, this.memberDetail.id)
        .then(() => {
          this.isSubmit()
          this.showNotification('Berhasil Menyimpan')
        })
        .catch(e => console.log(e))
    },
    isSubmit () {
      this.submit = !this.submit
    },
    isLoading () {
      this.loading = !this.loading
    },
    formatingDate (date) {
      return moment(date).locale('ID').format('DD MMMM YYYY')
    },
    showNotification (message) {
      const variant = 'outline-primary'
      this.$bvToast.toast(message, {
        title: 'Sukses',
        autoHideDelay: 5000,
        variant
      })
    }
  },
  created () {
    this.getData(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
