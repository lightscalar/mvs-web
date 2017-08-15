<template>
  <v-layout>
    <v-flex xs12>
      <v-card class='elevation-1 black white--text'>
        <v-card-title>
          Archive
          <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          dark
          single-line
          hide-details
          v-model="search"
          ></v-text-field>
        </v-card-title>
        <table-of-experiments :search='search'></table-of-experiments>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import TableOfExperiments from "./TableOfExperiments"

  export default {
    components: {TableOfExperiments},

    data () {
      return {
        search: ''

      }
    },

    methods: {

    },

    computed: {
      experiments() {
        return this.$store.state.experiments
      }

    },

    mounted() {
      this.$store.dispatch('listExperiments')

    }
  }

</script>

<style>

.maxflex {
}
.card__title {
    font-size: 20px;
}
</style>
