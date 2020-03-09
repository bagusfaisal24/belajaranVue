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
      <b-col cols="12" class="my-1">
        <b-form-group
          label="Pencarian"
          label-cols-sm="8"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              label-align-sm="right"
              type="search"
              id="filterInput"
              placeholder="Cari"
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
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
          <!--          <template v-slot="row">-->
          <!--            {{ row.name }}-->
          <!--          </template>-->
          <!--          <template v-slot:cell(actions)="row">-->
          <!--            <b-button size="sm" @click="row.toggleDetails">-->
          <!--              {{ row.detailsShowing ? 'Sembunyikan' : 'Lihat' }} Detail-->
          <!--            </b-button>-->
          <!--          </template>-->
          <!--          <template v-slot:row-details="row">-->
          <!--            <b-card>-->
          <!--              <ul>-->
          <!--                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>-->
          <!--              </ul>-->
          <!--            </b-card>-->
          <!--          </template>-->
          <template slot="id" slot-scope="row">
            {{ row.value.id }}
            <template slot="name" slot-scope="row">
              {{ row.value.name }}
            </template>
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

    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import MemberSvc from '../../service/MemberSvc'

export default {
  name: 'Table',
  data () {
    return {
      members: [],
      fields: [
        { key: 'id', label: 'id', class: 'text-center' },
        { key: 'name', label: 'Nama', class: 'text-center' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
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
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    // getDataMember () {
    //   fetch('http://localhost:8080/v1/membership/member')
    //     .then(r => r.json())
    //     .then((data) => {
    //       this.members = data
    //     })
    //     .catch(e => console.log(e))
    // },
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
    }
  }
}
</script>

<style scoped>

</style>
