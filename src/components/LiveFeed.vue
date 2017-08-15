<template>
  <v-flex md7 xs12>
    <v-card class='ma-2'>
      <v-card-title class='black white--text' style= 'margin: 0px'>
        Live Feed
        <v-spacer></v-spacer>
          <v-chip class="white black--text card__title">
            <v-avatar>
              <v-icon class='black--text'>my_location</v-icon>
            </v-avatar>
            {{unit.position.x}}, {{unit.position.y}}, {{unit.position.z}}
          </v-chip>
        </v-card-title>
        <v-card-text>
        <img src='http://localhost:1493/video_feed' style='width:100%'>
        <!-- <img src='http://7a71e8e2.ngrok.io/video_feed' style='width:100%'> -->
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn big class='grey darken-2' icon dark >
          <v-icon>home</v-icon>
        </v-btn>
        <b>|</b>
        <v-btn big class='black' icon dark >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
        <v-btn big class='black' icon dark >
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
        <v-btn big class='black' icon dark >
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn big class='black' icon dark >
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
        <b>|</b>
        <v-btn big class='blue-grey' icon dark >
          <v-icon>zoom_in</v-icon>
        </v-btn>
        <v-btn big class='blue-grey' success icon dark >
          <v-icon>zoom_out</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click.native='openTargetModal'
          primary
          v-tooltip:left="{ html: 'Add Current Target' }"
          dark
          icon
          big>
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model='addTarget' persistent>
      <v-card>
        <v-card-title class='blue-grey darken-3 white--text'>
          Add Target at ({{unit.position.x}}, {{unit.position.y}}, {{unit.position.z}})
        </v-card-title>
        <v-card-text>
          <v-text-field autofocus label='Target Name/Description' v-model='targetName'>
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer>
          </v-spacer>
          <v-btn @click.native='addTarget=false'>Cancel</v-btn>
          <v-btn primary @click.native='createTarget'>Add Target</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
// import Component from "../component_location"

  export default {
    components: {},
    props: ['experiment'],

    data () {
      return {
        addTarget: false,
        targetName: ''
      }
    },

    methods: {
      openTargetModal() {
        this.addTarget = true
      },
      createTarget() {
        var data = {target:{name: this.targetName}, experiment: this.experiment}
        data.target.schedule = {}
        data.target.schedule.startDate = ''
        data.target.schedule.startTime = ''
        data.target.schedule.duration = ''
        data.target.schedule.interval = ''
        this.addTarget=false
        this.$store.dispatch('createTarget', data)
      }
    },

    computed: {
      unit() {
        if (this.moduleId) {
          return this.$store.state.units[this.experiment.moduleId]
        } else {
         return this.$store.state.units[0]
        }
      }
    },

    mounted() {

    }
  }

</script>

<style>

</style>
