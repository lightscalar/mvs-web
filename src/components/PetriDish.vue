<template>

  <v-card class='elevation-0' id='petri-card'>

    <v-card-text>
      <svg id='petri-dish'></svg>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions right>
        <v-btn @click.native='update' primary>Visit Target</v-btn>
    </v-card-actions>

  </v-card>

</template>

<script>
  // import Component from "../component_location"
  import {EventBus} from '../event-bus.js'

  export default {
    components: {},

    data () {
      return {

      }
    },

    methods: {
      updateDish() {
        svg = d3.select(svg)

      }

    },

    computed: {
      targets() {
        var data = [{x: 22, y: 56, selected: false},{x: -15, y: -24, selected: false}]
        return data
      }

    },

    mounted() {

      // Define boundary of the petri dish.
      var element = d3.select('#petri-dish').node();
      var width = element.getBoundingClientRect().width;
      var height = element.getBoundingClientRect().height;
      var radius = (height/2)-2
      var targetData = this.targets
      var dishCenter = {x: width/2, y: height/2}
      var targetRadius = 5

      // Shift point data into the coordinate system of the dish.
      var shiftedData =[]
      for (var k=0; k<targetData.length; k++) {
        var d = targetData[k]
        shiftedData.push({x: d.x+dishCenter.x, y: d.y+dishCenter.y})
      }
      var svg = d3.select('svg')
      svg.append('circle')
        .attr('class', 'hello')
        .attr('r',radius)
        .attr('cx', dishCenter.x)
        .attr('cy', dishCenter.y)
      svg.selectAll('circle.target').data(shiftedData)
        .enter()
        .append('circle')
          .attr('class', 'target')
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d) {return d.y})
          .attr('r', targetRadius)
            .on('mouseover', function() {
              d3.select(this)
                .transition()
                .duration(300)
                .attr('class', 'highlightTarget')
                .attr('r', 10)
            })
            .on('mouseout', function() {
              d3.select(this)
                .transition()
                .attr('class', 'target')
                .duration(300)
              .attr('r', targetRadius)
            })
      this.update = function() {
        svg.selectAll('circle.target')
          .transition()
          .duration(300)
          .attr('class', 'highlightTarget')
          .attr('r', 10)
      }
      EventBus.$on('targetSelect', this.update)
    }
  }

</script>

<style>
.hello {
  fill: #00AADC;
  fill-opacity: 0.15;
  stroke: #000000;
  stroke-width: 2px;
}
#petri-dish {
  width: 100%;
  height:100%;
  stroke: black;
  border: 1;
  fill: #efefef;
}
.target {
  fill: #C1272D;
  stroke-width: 0px;
}
.highlightTarget {
  fill: #C1272D;
  stroke: none;
}
</style>
