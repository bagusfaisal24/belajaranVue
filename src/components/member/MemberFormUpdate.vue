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
            label="NBM">
            <b-form-input
              id="nbm"
              v-model="memberDetail.nbm"/>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Tanggal Lahir">
            <b-form-datepicker
              id="start-date"
              placeholder="Silakan pilih tanggal"
              v-model="memberDetail.birthDate"
              locale="id"
              size="md"
              calendar-width="290"
              start-weekday=1/>
            </b-form-datepicker>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Ranting">
            <b-form-select v-model="selected" :options="newArray"/>
            <span> {{ selected }}</span>
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
import RantingSvc from '../../service/RantingSvc'

export default {
  name: 'UpdateMember',
  data () {
    return {
      memberDetail: {},
      selected: null,
      newArray: []
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
    getDataRanting () {
      this.isLoading()
      const DataRanting = RantingSvc.getRanting()
      const promises = [DataRanting]
      Promise.all(promises)
        .then((res) => {
          this.ranting = res[0].data
          this.newArray = this.ranting.map(function (val, index) {
            return { value: val.id, text: val.name }
          })
        })
        .catch(e => console.log(e))
    },
    postData () {
      this.isSubmit()
      const data = {
        name: this.memberDetail.name,
        birthDate: moment(this.formatingDate(this.memberDetail.birthDate)).locale('ID').format('DD-MM-YYYY'),
        dobPlace: this.memberDetail.dobPlace,
        job: this.memberDetail.job,
        nbm: this.memberDetail.nbm,
        rantingId: this.selected
      }
      if (this.$route.params.type === 'update') {
        MemberSvc.updateData(data, this.memberDetail.id)
          .then(() => {
            this.isSubmit()
            this.showNotification('Berhasil Menyimpan')
          })
          .catch(e => console.log(e))
      } else {
        MemberSvc.submitForm(data)
          .then(() => {
            this.isSubmit()
            this.showNotification('Berhasil Menyimpan')
          })
          .catch(e => console.log(e))
      }
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
    console.log(this.$route.params.type)
    if (this.$route.params.type === 'update') {
      this.getData(this.$route.params.id)
    }
    this.getDataRanting()
  }
}
</script>

<style scoped>

</style>
