<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <h3 class="header">
          Data Peserta Zakat
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5" class="my-1">
        <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              label-align-sm="left"
              type="search"
              id="filterInput"
              placeholder="Cari"
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
      </b-col>
      <b-row>
        <b-col class="tambah-data">
          <b-button id="show-btn" variant="outline-primary" :to="{ name: 'CreateNewMember', params: { type: 'new' } }">Tambah Data</b-button>
        </b-col>
      </b-row>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-table
          show-empty
          small
          stacked="md"
          :items="members"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered">
          <template slot="name" slot-scope="row">
            {{ row.value.name }}
          </template>
          <template slot="dobPlace" slot-scope="row">
            {{ row.value.dobPlace }}
          </template>
          <template v-slot:cell(actions)="{ item }">
            <b-row>
              <b-col md="1">
                <b-button size="sm" @click="toggleDetails(item)" variant="warning"><i class="fa fa-align-justify" aria-hidden="true"/></b-button>
              </b-col>
              <b-col md="1">
                <b-button size="sm" variant="info"
                            :to="{ name: 'UpdateMember', params: { id: item.id, type: 'update' } }"><i class="fa fa-pencil-square-o" aria-hidden="true"/>
                 </b-button>
              </b-col>
              <b-col md="1">
                <b-button id="toggle-btn" size="sm" variant="danger" @click="showModal(item.id)"><i class="fa fa-trash" aria-hidden="true"/></b-button>
                <b-modal v-model="myModal" hide-footer title="Anda Yakin Hapus">
                <div class="d-block text-center">
                  <b-button class="mt-3" variant="outline-danger" block @click="hapusData(selectedId)">Hapus</b-button>
                </div>
              </b-modal>
              </b-col>
            </b-row>
          </template>
          <template v-slot:row-details="{ item }">
            <b-card>
              <table>
                <tr>
                  <th>Nama</th>
                  <th>Tempat Lahir</th>
                  <th>Tanggal Lahir</th>
                  <th>Pekerjaan</th>
                  <th>NBM</th>
                  <th>Ranting</th>
                </tr>
                <tr>
                  <td>{{ item.name }}</td>
                  <td>{{ item.dobPlace }}</td>
                  <td>{{ formatingDate(item.birthDate)}}</td>
                  <td>{{ item.job }}</td>
                  <td>{{ item.nbm }}</td>
                  <td>{{ item.ranting.name }}</td>
                </tr>
              </table>
            </b-card>
          </template>
        </b-table>
      </b-col>
      <b-col cols="12" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        />
      </b-col>
    </b-row>
    <router-view>
    </router-view>
  </b-container>
</template>

<script>
import MemberSvc from '../../service/MemberSvc'
import ErrorSvc from '../../ErrorSvc'
import moment from 'moment'

export default {
  name: 'Member',
  data () {
    return {
      members: [],
      fields: [
        { key: 'name', label: 'Nama', class: 'text-left' },
        { key: 'dobPlace', label: 'Tempat Lahir', class: 'text-left' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 15,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      selectedId: null,
      myModal: false
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    rows () {
      return this.members.length
    }
  },
  mounted () {
    // Set the initial number of items
    this.getDataMember()
  },
  methods: {
    getDataMember () {
      MemberSvc.getMember()
        .then((res) => {
          this.members = res.data
        }).catch(e => {
          this.errors = ErrorSvc.getError(e)
          this.showToast(this.errors)
        })
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    formatingDate (date) {
      return moment(date).locale('ID').format('DD MMMM YYYY')
    },
    hapusData (id) {
      MemberSvc.deleteData(id)
        .then((res) => {
          this.showNotification(res.data.message)
          this.getDataMember()
        }).catch(e => {
          this.errors = ErrorSvc.getError(e)
          this.showToast(this.errors)
        })
      this.myModal = false
    },
    showModal (id) {
      this.selectedId = id
      this.myModal = true
    },
    showNotification (message) {
      const variant = 'success'
      this.$bvToast.toast(message, {
        title: 'Sukses',
        autoHideDelay: 5000,
        variant
      })
    },
    toggleDetails (row) {
      if (row._showDetails) {
        this.$set(row, '_showDetails', false)
      } else {
        this.members.forEach(item => {
          this.$set(item, '_showDetails', false)
        })
        this.$nextTick(() => {
          this.$set(row, '_showDetails', true)
        })
      }
    },
    showToast (message) {
      const variant = 'danger'
      this.$bvToast.toast(message, {
        title: 'Terjadi Kesalahan',
        autoHideDelay: 5000,
        variant
      })
    }
  }
}
</script>

<style scoped>
  .container{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  .tambah-data {
    margin-left: 400px;
  }
  .header {
    text-align: center;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>
