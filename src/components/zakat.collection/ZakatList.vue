<template>
  <b-container>
    <b-row>
      <b-col>
        <h3 class="header">
          Data Zakat
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
          <b-button id="show-btn" variant="outline-primary" :to="{ name: 'newZakat', params: { type: 'new' } }">Tambah Data</b-button>
        </b-col>
      </b-row>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-table
          show-empty
          small
          stacked="md"
          :items="zakat"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">
          <template slot="name" slot-scope="row">
            {{ row.value.name }}
          </template>
          <template v-slot:cell(actions)="{ detailsShowing, item }">
            <b-row>
              <b-col md="1">
                <b-button size="sm" @click="toggleDetails(item)" variant="warning"><i class="fa fa-align-justify" aria-hidden="true"/>
                </b-button>
              </b-col>
            </b-row>
          </template>
          <template v-slot:row-details="{ item }">
            <b-card>
              <table>
                <tr>
                  <th>Muzakki</th>
                  <th>NBM</th>
                  <th>Asal Ranting</th>
                  <th>Tipe Zakat</th>
                  <th>Tanggal Zakat</th>
                  <th>Jumlah Zakat</th>
                </tr>
                <tr>
                  <td> {{ item.member.name }}</td>
                  <td> {{ item.member.nbm }}</td>
                  <td> {{ item.member.ranting.name }}</td>
                  <td> {{ item.productType.name }}</td>
                  <td> {{ formatingDate(item.submitDate) }}</td>
                  <td> {{ currenctFormat(item.amount) }}</td>
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
import ErrorSvc from '../../ErrorSvc'
import ZakatSvc from '../../service/ZakatSvc'
import moment from 'moment'
import utils from '../../utils'

export default {
  name: 'ZakatList',
  data () {
    return {
      zakat: [],
      fields: [
        { key: 'member.name', label: 'Muzakki', class: 'text-left' },
        { key: 'productType.name', label: 'Tipe Zakat', class: 'text-left' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 15,
      sortBy: null,
      sortDesc: true,
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
    },
    rows () {
      return this.zakat.length
    }
  },
  mounted () {
    this.getDataZakat()
  },
  methods: {
    getDataZakat () {
      ZakatSvc.getZakat()
        .then((res) => {
          this.zakat = res.data
        }).catch(e => {
          this.errors = ErrorSvc.getError(e)
          this.showToast(this.errors)
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
    currenctFormat (v) {
      return utils.formatPrice(v)
    },
    formatingDate (date) {
      return moment(date).locale('ID').format('DD MMMM YYYY')
    },
    toggleDetails (row) {
      if (row._showDetails) {
        this.$set(row, '_showDetails', false)
      } else {
        this.zakat.forEach(item => {
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
