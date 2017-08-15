<template>
  <v-container grid-list-xs-24>
    <v-snackbar :error='true' v-model='snackbar'>
      {{errorText}}
      <v-btn dark flat @click.native="snackbar = false" outline>Close</v-btn>
    </v-snackbar>
    <v-card class='maxflex'>
      <v-card-title class='black white--text title-text'>
        New Experiment
      </v-card-title>
      <v-card-text>
        <!-- <input placeholder='abc' type='text' pattern='\d*' maxlength="3" autofocus class='big-input'> -->
        <v-text-field
          v-model='title'
          name="experimentTitle"
          label= "Title">
        </v-text-field>
        <v-text-field
          v-model = 'description'
          name="experimentDescription"
          label= "Description"
          rows=2
          multi-line>
        </v-text-field>
        <v-select
              v-bind:items="items"
              v-model="unitId"
              label="Microscope Unit"
              single-line
              bottom
              hint="Experiment's microscope unit."
              persistent-hint>
        </v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn primary @click.native='createExperiment'>Create</v-btn>
      </v-card-actions>
    </v-card>
    <!-- <img src='http://localhost:1493/video_feed' class='video-feed'> -->
  </v-container>
</template>

<script>
  // import Component from "../component_location"

  export default {
    components: {},

    data () {
      return {
        unitId: null,
        errorText: null,
        title: null,
        snackbar: false,
        description: null,
        items: [{'text': 'Unit-01', id: 0},
                {'text': 'Unit-02', id: 1, disabled: true},
                {'text': 'Unit-03', id: 2, disabled: true},
                {'text': 'Unit-04', id: 3, disabled: true},
                {'text': 'Unit-05', id: 4, disabled: true},
                {'text': 'Unit-06', id: 5, disabled: true}]
      }
    },

    methods: {

      createExperiment() {
        if (this.unitId == null) {
          this.errorText = 'You must select a Microscrope Module for the experiment.'
            console.log('NOPE!')
          this.snackbar=true
        }
        var experiment = {title: this.title, description: this.description,
                      unitId: this.unitId.id}
        this.$store.dispatch('createExperiment', experiment)
      }
    },

    computed: {

    },

    mounted() {
      this.e1 = null
      this.title = null
      this.description = null

    }
  }

</script>

<style>
.big-input {
    font-size: 40px;
    border: 1px solid black;
    outline: none;
    padding: 15px;
    width: 115px;
    text-transform: uppercase;
}
.maxflex {
    max-width: 600px;
}
.title-text {
    font-size:20px;
}
textarea {
  resize: none;
}
.video-feed {
  width: 300px;
}
</style>
