<template>
  <v-dialog
    persistent
    v-model="modal"
    lazy
    full-width>
    <v-text-field
    slot="activator"
    v-bind:label="label"
    v-model="selectedDate"
    prepend-icon="event"
    readonly> </v-text-field>
  <v-date-picker v-model="selectedDate" scrollable >
    <template scope="{ save, cancel }">
      <v-card-actions>
        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
    <v-btn flat primary @click.native="save">Save</v-btn>
      </v-card-actions>
    </template>
  </v-date-picker>
  </v-dialog>
</template>

<script>
  // import Component from "../component_location"
  import {EventBus} from '../event-bus.js'

  export default {
    components: {},
    props: ['currentDate', 'label'],

    data () {
      return {
        selectedDate: this.currentDate,
        modal: false,
      }
    },

    methods: {
      save() {
        console.log(this.label)
        EventBus.$emit(this.label, selectedDate)
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
