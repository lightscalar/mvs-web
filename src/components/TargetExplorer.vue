<template>
  <v-flex md5 xs12>
  <v-flex xs12 m3>
    <v-card class='ma-2'>
      <v-card-title class='black white--text'>
        {{experiment.title}}
        <v-spacer></v-spacer>
        <v-btn small error icon dark @click.native='snackbar=true'>
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <target-table></target-table>
      </v-card-text>
    </v-card>
  </v-flex>

    <v-flex xs12 m3>

    <v-card class='ma-2'>
      <v-card-text>
            <petri-dish></petri-dish>
      </v-card-text>
    </v-card>
    </v-flex>

      <v-snackbar :error='true' v-model='snackbar'>
        Delete experiment?
        <v-btn dark flat @click.native="deleteExperiment" outline>Delete</v-btn>
        <v-btn dark flat @click.native="snackbar = false" outline>Cancel</v-btn>
      </v-snackbar>
      </v-flex>
</template>

<script>
// import Component from "../component_location"
  import PetriDish from "./PetriDish"
import TargetTable from "./TargetTable"

export default {
  components: {PetriDish, TargetTable},
  props: ['experiment'],

  data () {
    return {
      snackbar: false,
    }
  },

  methods: {
    deleteExperiment() {
      this.$store.dispatch('deleteExperiment', this.experiment._id)
    }

  },

  computed: {
  },

  mounted() {
  }
}

</script>

<style>

</style>
