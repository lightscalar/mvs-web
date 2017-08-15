<template>
  <v-layout wrap>
    <v-flex xs12 lg4>
      <v-card>
        <v-card-title class='black white--text'>
          {{target.name}}
          <v-spacer></v-spacer>
          <router-link :to="{name: 'Experiment', params: {id: experiment._id}}">
            <v-btn primary icon large dark><v-icon>arrow_back</v-icon></v-btn>
          </router-link>
        </v-card-title>
        <v-card-text>

          <v-dialog
            persistent
            v-model="startDateModal"
            lazy
            full-width>
            <v-text-field
            slot="activator"
            label='Start Date'
            v-model='schedule.startDate'
            prepend-icon="event"
            readonly> </v-text-field>
          <v-date-picker v-model="schedule.startDate" scrollable >
            <template scope="{ save, cancel }">
              <v-card-actions>
                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
            <v-btn flat primary @click.native="save()">Save</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
          </v-dialog>

          <v-dialog
            persistent
            v-model="startTimeModal"
            lazy
            full-width>
            <v-text-field
            slot="activator"
            label='Start Time'
            v-model='schedule.startTime'
            prepend-icon="access_time"
            readonly> </v-text-field>
          <v-time-picker v-model="schedule.startTime" scrollable >
            <template scope="{ save, cancel }">
              <v-card-actions>
                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
            <v-btn flat primary @click.native="save">Save</v-btn>
              </v-card-actions>
            </template>
          </v-time-picker>
          </v-dialog>

          <v-text-field v-model='schedule.duration' prepend-icon='timelapse'
            label='Duration (hours)'></v-text-field>

          <v-text-field v-model='schedule.interval' prepend-icon='av_timer'
            label='Timelapse Interval (minutes)'></v-text-field>

        </v-card-text>
        <v-divider>
        </v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary @click.native='updateTarget'>Update Schedule</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import Component from "../component_location"
  import {EventBus} from '../event-bus.js'

export default {
  components: {},
  props: ['id'],

  data () {
    return {
      schedule: {duration:'', interval:'', startDate: '', startTime: ''},
      currentTarget: {},
      startDateModal: false,
      startTimeModal: false
    }
  },

  watch: {
    target() {
      this.schedule = this.target.schedule
    }
  },

  methods: {
    updateStartDate(theDate) {
      console.log(theDate)
    },
    cancel() {
      this.startTimeModal = false
    },
    updateTarget() {
      var data = {_id: this.target._id, schedule: this.schedule}
      this.$store.dispatch('updateTarget', data)
    }
  },

  computed: {
    target() {
      return this.$store.state.target
    },

    experiment() {
      return this.$store.state.currentExperiment
    }

  },

  mounted() {
    this.$store.dispatch('getTarget', this.id)
  }
}

</script>

<style>
.card__title {
  font-size: 20px;
}

</style>
