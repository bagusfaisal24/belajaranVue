<template>
  <div class="about">
    <div class="container">
        <div class="col-px-md-5">
          <a href="#" class="btn btn-success pull-right" ><i class="fa fa-plus"></i> Tambah data </a>
        </div>
        <hr>
        <table class="table table-striped table-hover " id="pengguna">
          <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Tempat Lahir</th>
            <th scope="col">Tanggal Lahir</th>
            <th scope="col">Pekerjaan</th>
            <th>Aksi</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, data) in member" :key="data">
            <td>{{ item.name }}</td>
            <td>{{ item.dobPlace }}</td>
            <td>{{ format_date(item.birthDate) }}</td>
            <td>{{ item.job }}</td>
            <td>
              <a href="#" class="btn btn-sm btn-danger" onclick="return confirm('Yakin Ingin Menghapus ?')"><i class="fa fa-trash"></i> Hapus </a>

            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'Member',
  data () {
    return {
      member: {}
    }
  },
  components: {},
  methods: {
    getProfile () {
      fetch('http://localhost:8080/v1/membership/member')
        .then(r => r.json())
        .then((data) => {
          this.member = data
        })
        .catch(e => console.log(e))
    },
    format_date (value) {
      return moment(value).locale('ID').format('DD MMMM YYYY')
    }
  },
  mounted () {
    this.getProfile()
  }
}
</script>
