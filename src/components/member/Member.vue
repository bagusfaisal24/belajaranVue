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
          <b-button variant="outline-primary" v-b-modal.modal-1>Tambah Data</b-button>
        </b-col>
        <b-modal id="modal-1" title="Tambah Data Peserta">
          <div role="group">
            <b-form-group
              label-cols-sm="3"
              label="Nama:">
              <b-form-input id="name">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Tempat Lahir:">
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
              <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"/>
            </b-form-group>
            </div>
        </b-modal>
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
          <template slot="id" slot-scope="row">
            {{ row.value.id }}
          </template>
          <template slot="name" slot-scope="row">
            {{ row.value.name }}
          </template>
          <template slot="dobPlace" slot-scope="row">
            {{ row.value.dobPlace }}
          </template>
          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? 'Sembunyikan' : 'Lihat' }} Detail
            </b-button>
          </template>
          <template v-slot:row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
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
        { key: 'name', label: 'Nama', class: 'text-center' },
        { key: 'dobPlace', label: 'Tempat Lahir', class: 'text-center' },
        { key: 'actions', label: 'Actions' }
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
      },
      formMember: {
        name: '',
        dobPlace: '',
        job: ''
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
