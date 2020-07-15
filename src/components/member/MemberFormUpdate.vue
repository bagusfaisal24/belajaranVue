<template>
  <b-container>
    <b-row>
      <b-col>
      </b-col>
      <b-col cols="10" class="my-1">
        <h3>
          Form Data Muzakki
        </h3>
        <div role="group">
          <b-form-group
            label-cols-sm="3"
            label-cols-lg="3"
            label="Nama">
            <b-form-input
              id="name"
              v-model="name"
              :state="nameState"
              @change="onChangeName"
              aria-describedby="input-live-help input-live-feedback"
              trim
              placeholder="Nama Lengkap"/>
            <b-form-invalid-feedback id="input-live-feedback">
              {{ messageError != null ? messageError : 'tidak boleh kosong' }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Tempat Lahir">
            <b-form-input
              id="dob-place"
              v-model="dobPlace"
              placeholder="Tempat Lahir"/>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Pekerjaan">
            <b-form-input
              id="job"
              v-model="job"
              :state="jobState"
              @change="onChangejob"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Pekerjaan"/>
            <b-form-invalid-feedback id="input-live-feedback">
              {{ messageError != null ? messageError : 'tidak boleh kosong' }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="NBM">
            <b-form-input
              id="nbm"
              v-model="nbm"
              placeholder="NBM"/>
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
          <b-form-group
            label-cols-sm="3"
            label="Ranting">
            <b-form-select v-model="selected" :options="newArray"/>
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
import ErrorSvc from '../../ErrorSvc'

export default {
  name: 'UpdateMember',
  data () {
    return {
      memberDetail: {},
      selected: null,
      newArray: [],
      errors: {},
      birthDate: null,
      name: '',
      dobPlace: '',
      job: '',
      nbm: null,
      nameState: null,
      jobState: null,
      messageError: null
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
          this.birthDate = this.formatingDate(this.memberDetail.birthDate)
          this.selected = this.memberDetail.ranting.id
          this.name = this.memberDetail.name
          this.dobPlace = this.memberDetail.dobPlace
          this.job = this.memberDetail.job
          this.nbm = this.memberDetail.nbm
        })
        .catch(e => {
          this.errors = ErrorSvc.getError(e)
          this.showToast(this.errors)
        })
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
        .catch(e => {
          this.errors = ErrorSvc.getError(e)
          this.showToast(this.errors)
        })
    },
    postData () {
      this.isSubmit()
      const data = {
        name: this.name,
        birthDate: moment(this.formatingDate(this.birthDate)).locale('ID').format('DD-MM-YYYY'),
        dobPlace: this.dobPlace,
        job: this.job,
        nbm: this.nbm,
        rantingId: this.selected
      }
      if (this.$route.params.type === 'update') {
        MemberSvc.updateData(data, this.memberDetail.id)
          .then(() => {
            this.isSubmit()
            this.showNotification('Berhasil Menyimpan')
          })
          .catch(e => {
            if (this.name.length === 0) {
              this.nameState = false
            }
            if (this.job.length === 0) {
              this.jobState = false
            }
            console.log(e)
          })
      } else {
        MemberSvc.submitForm(data)
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
      }
    },
    isSubmit () {
      this.submit = !this.submit
    },
    isLoading () {
      this.loading = !this.loading
    },
    onChangeName () {
      this.nameState = this.name.length !== 0
    },
    onChangejob () {
      this.jobState = this.job.length !== 0
    },
    formatingDate (date) {
      return new Date(date)
    },
    fetchErrorData (data) {
      data.errors.forEach((detail) => {
        if (detail.field === 'name') {
          this.nameState = false
          this.messageError = detail.defaultMessage
        } else if (detail.field === 'job') {
          this.jobState = false
          this.messageError = detail.defaultMessage
        }
      })
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
    }
  },
  created () {
    if (this.$route.params.type === 'update') {
      this.getData(this.$route.params.id)
    }
    this.getDataRanting()
  }
}
</script>

<style scoped>
  .p {
    color: red;
  }

</style>
