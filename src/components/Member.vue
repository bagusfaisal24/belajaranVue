<template>
  <div class="about">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
        </div>

        <div class="col-md-3">
          <a href="#" class="btn btn-success pull-right" ><i class="fa fa-plus"></i> Tambah data </a>
        </div>
        </div>
        <hr>
        <table class="table table-striped table-hover " id="pengguna">
          <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">Tempat Lahir</th>
            <th scope="col">Tanggal Lahir</th>
            <th scope="col">Pekerjaan</th>
            <th>Aksi</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Bagus</td>
            <td>Tegal</td>
            <td>10-08-1996</td>
            <td>Ngoding bosku</td>
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
export default {
  name: 'About',
  data () {
    return {
      user: {}
    }
  },
  components: {},
  methods: {
    getProfile () {
      fetch('http://localhost:8080/v1/membership/member')
        .then(r => r.json())
        .then((data) => {
          this.user = data
        })
        .catch(e => console.log(e))
    }
  },
  mounted () {
    this.getProfile()
  }
}
</script>
