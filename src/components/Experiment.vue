<template>
  <v-layout wrap>
   <target-explorer v-bind:experiment='experiment'></target-explorer>
    <live-feed v-bind:experiment='experiment'></live-feed>
  </v-layout>
</template>

<script>
import TargetExplorer from "./TargetExplorer"
import LiveFeed from "./LiveFeed"

export default {
  components: {TargetExplorer, LiveFeed},
  props: ['id'],

  data () {
    return {
      liveFeed: false,
    }
  },

  methods: {
  },

  computed: {
    feedDescription() {
      if (this.liveFeed){
        return 'Live Feed'
      } else {
        return 'Latest Image'
      }
    },
    experiment() {
      return this.$store.state.currentExperiment
    }
  },

  mounted() {
    this.$store.dispatch('getExperiment', this.id)
    this.$store.dispatch('getUnits')
  }
}

</script>

<style>

.card__title {
  font-size: 20px;
}
.petri-dish {
  min-height: 300px;
}
</style>
