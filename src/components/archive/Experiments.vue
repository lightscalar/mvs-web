<template>
  <v-container grid-list-xs-24>
    <v-card class='maxflex'>
      <v-card-title class='black white--text title-text'>
        New Experiment
      </v-card-title>
      <v-card-text>
    <!-- <input placeholder='abc' type='text' pattern='\d*' maxlength="3" autofocus class='big-input'> -->
        <v-text-field
          name="experimentTitle"
          label= "Title">
        </v-text-field>
        <v-text-field
          name="experimentTitle"
          label= "Description"
          rows=2
          multi-line>
        </v-text-field>
        <v-select
              v-bind:items="items"
              v-model="e1"
              label="Microscope Module"
              single-line
              bottom
              hint="Experiment's microscope module."
              persistent-hint
            ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn primary>Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <!-- <v-layout> -->
  <!--   <v-flex xs10 offset-xs1> -->
  <!--   <v-card class='maxflex'> -->
  <!--     <v-card-title class='black white--text'> -->
  <!--       Create New Experiment -->
  <!--     </v-card-title> -->
  <!--     <v-card-text> -->
  <!--         <v-text-field -->
  <!--             name="experimentTitle" -->
  <!--             label= "Experiment Title"> -->
  <!--         </v-text-field> -->
  <!--         <1!-- <v-text-field --1> -->
  <!--         <1!--     name="experimentTitle" --1> -->
  <!--         <1!--     label="Label Text"> --1> -->
  <!--         </v-text-field> -->
  <!--     </v-card-text> -->
  <!--     <v-card-actions> -->
  <!--       <v-spacer></v-spacer> -->
  <!--       <v-btn primary>Create</v-btn> -->
  <!--     </v-card-actions> -->
  <!--     </v-card> -->
  <!--   </v-flex> -->
  <!--   </v-layout> -->
</template>

<script>
  // import Component from "../component_location"

  export default {
    components: {},

    data () {
      return {
        e1: null,
        title: null,
        description: null,
        items: [{'text': 'Module-01'},
                {'text': 'Module-02', disabled: true},
                {'text': 'Module-03', disabled: true},
                {'text': 'Module-04', disabled: true}]
      }
    },

    methods: {

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
    font-size:24px;
}
textarea {
  resize: none;
}
</style>
