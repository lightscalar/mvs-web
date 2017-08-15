<template>
  <v-dialog
    persistent
    v-model="modal"
    lazy>
    <v-text-field
    slot="activator"
    v-bind:label="label"
    v-model="e6"
    prepend-icon="access_time"
    readonly
    ></v-text-field>
      <v-time-picker v-model="e6" actions>
        <template scope="{ save, cancel }">
          <v-card-actions>
            <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
    <v-btn flat primary @click.native="save()">Save</v-btn>
          </v-card-actions>
        </template>
      </v-time-picker>
  </v-dialog>
</template>

<script>
// import Component from "../component_location"

  export default {
    components: {},
    props: ['label'],

    data () {
      return {
        e6: null,
        modal: false,
      }
    },

    methods: {

    },

    computed: {

    },

    mounted() {

    }
  }

</script>

<style>

</style>
