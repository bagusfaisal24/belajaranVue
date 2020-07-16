<template>
  <b-container>
    <b-row>
      <b-col>
      </b-col>
      <b-col cols="10" class="my-1">
        <h3>
          Form Data Ranting
        </h3>
    <div role="group">
      <b-form-group
        label-cols-sm="3"
        label="Nama">
        <b-form-input
          id="name"
          v-model="name"
          :state="nameState"
          @change="onChangeName"
          aria-describedby="input-live-help input-live-feedback"
          trim
          placeholder="Nama Ranting"/>
        <b-form-invalid-feedback id="input-live-feedback">
          {{ messageError != null ? messageError : 'tidak boleh kosong' }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Ketua Ranting">
        <b-form-input
          id="ketua-ranting"
          v-model="ketuaRanting"
          :state="ketuaRantingState"
          @change="onChangeKetua"
          aria-describedby="input-live-help input-live-feedback"
          trim
          placeholder="Ketua Ranting"/>
        <b-form-invalid-feedback id="input-live-feedback">
          {{ messageError != null ? messageError : 'tidak boleh kosong' }}
        </b-form-invalid-feedback>
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
import RantingSvc from '../../service/RantingSvc'
import ErrorSvc from '../../ErrorSvc'

export default {
  name: 'UpdateRanting',
  data () {
    return {
      rantingDetail: {},
      errors: {},
      name: null,
      ketuaRanting: null,
      nameState: null,
      ketuaRantingState: null,
      messageError: null
    }
  },
  methods: {
    getData (id) {
      this.isLoading()
      const RantingDetail = RantingSvc.getDetail(id)
      const promises = [RantingDetail]
      Promise.all(promises)
        .then((res) => {
          this.rantingDetail = res[0].data
          this.name = this.rantingDetail.name
          this.ketuaRanting = this.rantingDetail.ketuaRanting
        })
        .catch(e => console.log(e))
    },
    postData () {
      this.isSubmit()
      const data = {
        name: this.name,
        ketuaRanting: this.ketuaRanting
      }
      if (this.$route.params.type === 'new') {
        RantingSvc.submitForm(data)
          .then(() => {
            this.isSubmit()
            this.showNotification('Berhasil Menyimpan')
          })
          .catch(e => {
            this.errors = ErrorSvc.getError(e)
            this.showToast(this.errors)
            this.error = e.response.data
            this.fetchErrorData(this.error)
          })
      } else {
        RantingSvc.updateData(data, this.rantingDetail.id)
          .then(() => {
            this.isSubmit()
            this.showNotification('Berhasil Menyimpan')
          })
          .catch(e => {
            this.errors = ErrorSvc.getError(e)
            this.showToast(this.errors)
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
    onChangeKetua () {
      this.ketuaRantingState = this.ketuaRanting.length !== 0
    },
    fetchErrorData (data) {
      data.errors.forEach((detail) => {
        if (detail.field === 'name') {
          this.nameState = false
          this.messageError = detail.defaultMessage
        } else if (detail.field === 'ketuaRanting') {
          this.ketuaRantingState = false
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
    },
    change: function ($event) {
      this.hai = $event
    }
  },
  created () {
    if (this.$route.params.type === 'update') {
      this.getData(this.$route.params.id)
    }
  }
}
</script>

<style scoped>

</style>
