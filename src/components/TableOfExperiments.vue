<template>
  <v-data-table
    v-bind:search='search'
    v-bind:headers="headers"
    no-data-text='No Experiments in Database!'
    v-bind:pagination.sync="pagination"
    :items="items"
    class="elevation-0">
    <template slot="items" scope="props">
      <td class="text-xs-left">
        <router-link :to="{name:'Experiment', params:{id: props.item._id}}">
          <v-chip class='red darken-3 chipper'>
            {{props.item.title}}
          </v-chip>
        </router-link>
      </td>
      <td class="text-xs-left">{{ props.item.description }}</td>
      <td class="text-xs-left">{{ props.item.createdAt }}</td>
    </template>
  </v-data-table>
</template>


<script>
  // import Component from "../component_location"
  export default {
    components: {},
    props: ['search'],
    data () {
      return {
        headers: [{text: 'Title', sortable: true, value: 'title', align:'left'},
          {text: 'Description', sortable: true, value: 'description', align:'left'},
          {text: 'Created At', sortable: true, value: 'createdAt', align:'left'}],
        pagination: {sortBy: 'createdAt', descending: true}
      }
    },

    methods: {

    },

    computed: {
      items() {
        return this.$store.state.experiments
      }

    },

    mounted() {

    }
  }

</script>

<style scoped>
.chipper {
  cursor: pointer;
  color: white
}
a {
  text-decoration: none !important;
  color: white !important
}
</style>
