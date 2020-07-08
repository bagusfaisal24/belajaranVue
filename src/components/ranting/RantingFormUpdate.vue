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
        label="Nama">
        <b-form-input
          id="name"
          v-model="rantingDetail.name"/>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Ketua Ranting">
        <b-form-input
          id="ketua-ranting"
          v-model="rantingDetail.ketuaRanting"/>
      </b-form-group>
      <hr/>
    </div>
    <b-button class="mt-3" variant="outline-primary" block @click="postData">Simpan</b-button>
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
      errors: {}
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
        })
        .catch(e => console.log(e))
    },
    postData () {
      this.isSubmit()
      const data = {
        name: this.rantingDetail.name,
        ketuaRanting: this.rantingDetail.ketuaRanting
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
