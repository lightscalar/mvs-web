<template>
  <v-data-table
    v-bind:headers="headers"
    :items="items"
    no-data-text='No Targets Available'
    hide-actions
    v-model='selected'
    class="elevation-0">
    <template slot="items" scope="props">
      <tr v-bind:class="{ active: props.item.selected }"
                           :active="props.item.selected" @click="clickTarget(props.item)">
        <td>
          <a href='#'>
          <v-chip class="chipper red darken-3 white--text">
            {{ props.item.title }}
          </v-chip>
          </a>
        </td>
       <td>
         30, 200
       </td>
      </tr>
    </template>
  </v-data-table>

</template>

<script>
// import Component from "../component_location"
  import {EventBus} from '../event-bus.js'

  export default {
    components: {},

    data () {
      return {
        selected: [],
        headers: [
          {text: 'Target', align: 'left', value: 'title'},
          {text: 'Location (x, y)', align: 'left', value: 'location'}],
        items: [{title: 'Cell Clump 01', location: '(4, 23)',
          updatedAt: 'Just Now', selected: false },
          {_id: 1, title: 'Vessel Branch Point', location: '(4, 23)',
            updatedAt: 'Just Now', selected: false }]
      }
    },


    methods: {
      clickTarget(item) {
        for (var k=0; k<this.items.length; k++) {
          this.items[k].selected = false
        }
        item.selected=true
        EventBus.$emit('targetSelect', item)
      }

    },

    computed: {
      systemStatus() {
        return this.$store.state.systemStatus
      }
    },

    mounted() {
    }
  }

</script>

<style scoped>
tr.active  {
  color: white;
  background-color: #898989 !important
}
.chipper {
  cursor: pointer
}
tr.active .chipper {
}
a {
  text-decoration: none !important;
  color: black
}
</style>
