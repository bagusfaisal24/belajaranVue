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
          <template v-slot:cell(actions)="{ detailsShowing, item }">
                <b-button size="sm" @click="toggleDetails(item)"  variant="warning"><i class="fa fa-th-list" aria-hidden="true">
                  {{ detailsShowing ? 'Sembunyikan' : 'Lihat' }} Detail
                </i></b-button>
                <b-button size="sm" variant="info"
                            :to="{ name: 'UpdateMember', params: { id: item.id, type: 'update' } }">
                    Update
                 </b-button>
                <b-button size="sm" variant="danger" @click="hapusData(item.id)"><i class="fa fa-trash" aria-hidden="true">
                  Delete
                </i></b-button>
          </template>
          <template v-slot:row-details="{ item }">
            <b-card>
              <p>Nama: {{ item.name }}</p>
              <p>Tempat Lahir : {{ item.dobPlace }}</p>
              <p>Tanggal Lahir : {{ formatingDate(item.birthDate) }}</p>
              <p>Pekerjaan : {{ item.job }}</p>
              <p>NBM : {{ item.nbm }}</p>
              <p>Ranting : {{ item.ranting.name }}</p>
            </b-card>
          </template>
        </b-table>
      </b-col>
      <b-col cols="12" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
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
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: []
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
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.members.length
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
        })
    },
    redirect () {
      this.$route.push('/member')
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
</style>
