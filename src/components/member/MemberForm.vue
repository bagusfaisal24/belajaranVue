<template>
  <b-modal id="modal-1" size="lg" title="Tambah Data Peserta">
    <div role="group">
      <b-form-group
        label-cols-sm="3"
        label="Nama">
        <b-form-input id="name">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Tempat Lahir">
        <b-form-input id="dob-place">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Pekerjaan">
        <b-form-input id="dob-place">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Tanggal Lahir">
        <b-form-datepicker
          id="start-date"
          placeholder="Silakan pilih tanggal"
          v-model="form.birthDate"
          locale="id"
          size="md"
          class="mb-2"/>
      </b-form-group>
      <hr/>
    </div>
  </b-modal>
</template>

<script>

export default {
  name: 'MemberForm',
  data () {
    return {
      form: {
        birthDate: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
