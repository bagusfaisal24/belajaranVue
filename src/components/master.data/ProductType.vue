<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <h3 class="header">
          Tipe Zakat
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
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-table
          show-empty
          small
          stacked="md"
          :items="productType"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection">
          <template v-slot:row-details="{ item }">
            <b-card>
              <p>Nama: {{ item.name }}</p>
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
import ProductTypeSvc from '../../service/ProductType'

export default {
  name: 'ProductType',
  data () {
    return {
      productType: [],
      fields: [
        { key: 'name', label: 'Nama', class: 'text-left' }
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
  mounted () {
    // Set the initial number of items
    this.totalRows = this.productType.length
    this.getDataProductType()
  },
  methods: {
    getDataProductType () {
      ProductTypeSvc.getData()
        .then((res) => {
          this.productType = res.data
        }).catch(e => console.log(e))
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
  .header {
    text-align: center;
  }
</style>
