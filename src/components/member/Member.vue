<template>
  <b-container>
    <b-row>
      <b-col>
        <h3>
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
        <b-col>
          <MemberForm/>
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
            <b-row class="mb-1">
              <b-col cols="0">
                <b-button size="sm" @click="toggleDetails(item)"  variant="warning">
                  {{ detailsShowing ? 'Sembunyikan' : 'Lihat' }} Detail
                </b-button>
              </b-col>
              <b-col cols="3">
                <router-link to="/update">
                  <b-button size="sm" variant="info">
                    Update
                  </b-button>
                </router-link>
              </b-col>
            </b-row>
          </template>
          <template v-slot:row-details="{ item }">
            <b-card>
              <p>Nama: {{ item.name }}</p>
              <p>Tempat Lahir : {{ item.dobPlace }}</p>
              <p>Tanggal Lahir : {{ formatingDate(item.birthDate) }}</p>
              <p>Pekerjaan : {{ item.job }}</p>
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
import MemberForm from './MemberForm'
import moment from 'moment'

export default {
  name: 'Table',
  components: { MemberForm },
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
        }).catch(e => console.log(e))
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    formatingDate (date) {
      return moment(date).locale('ID').format('DD MMMM YYYY')
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
    }
  }
}
</script>

<style scoped>

</style>
