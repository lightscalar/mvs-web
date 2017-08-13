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
            30, 200
          </v-chip>
        </v-card-title>
        <v-card-text>
        <img src='http://localhost:1493/video_feed' style='width:100%'>
        <!-- <img src='http://7a71e8e2.ngrok.io/video_feed' style='width:100%'> -->
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn big primary icon dark >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
        <v-btn big primary icon dark >
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
        <v-btn big primary icon dark >
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn big primary icon dark >
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="blue"
          v-tooltip:left="{ html: 'Add As New Target' }" 
          dark
          big>
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
// import Component from "../component_location"

  export default {
    components: {},

    data () {
      return {

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
