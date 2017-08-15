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
          :active="props.item.selected">
        <td>
          {{props.index+1}}
        </td>
        <router-link :to="{name:'Target', params:{id: props.item._id}}">
          <v-chip class="chipper red darken-3 white--text">
            {{ props.item.name }}
          </v-chip>
        </router-link>
          </td>
          <td @click="clickTarget(props.item)">
            <v-chip outline class="primary primary--text">
              <v-icon left>my_location</v-icon>Visit Target
            </v-chip>
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
    props: ['experiment'],

    data () {
      return {
        selected: [],
        headers: [
          {text: '', align: 'right', value: 'index', sortable:false},
          {text: 'Target Name', align: 'left', value: 'name'},
          {text: '', align: 'left', value: 'numberImages'}],
      }
    },

    methods: {
      clickTarget(item) {
        EventBus.$emit('targetSelect', item)
      }
    },

    computed: {
      items() {
        return this.$store.state.targets
      }
    },

    mounted() {
    }
  }

</script>

<style scoped>
tr.active  {
  color: white;
  background-color: #cfcfcf !important
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
