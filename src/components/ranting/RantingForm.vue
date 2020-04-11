<template>
  <div>
    <b-button id="show-btn" variant="outline-primary" @click="showModal" v-b-modal.modal-1>Tambah Data</b-button>
    <b-modal ref="myModal" size="lg" hide-footer title="Tambah Data Ranting">
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
        label="Ketua Ranting">
        <b-form-input
          id="ketua-ranting"
          v-model="ketuaRanting"/>
      </b-form-group>
      <hr/>
    </div>
    <b-button class="mt-3" variant="outline-primary" block @click="hideModal">Simpan</b-button>
  </b-modal>
  </div>
</template>

<script>
import RantingSvc from '../../service/RantingSvc'

export default {
  name: 'RantingForm',
  data () {
    return {
      name: '',
      ketuaRanting: ''
    }
  },
  methods: {
    hideModal () {
      this.isSubmit()
      const data = {
        name: this.name,
        ketuaRanting: this.ketuaRanting
      }
      RantingSvc.submitForm(data)
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
