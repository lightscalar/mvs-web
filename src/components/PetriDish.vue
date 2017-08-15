<template>
  <v-card class='elevation-1 ma-0' id='petri-card'>
    <v-card-title class='black white--text'>
      Petri Map
      <v-spacer></v-spacer>
      <v-btn icon dark v-if='canNavigate'
        @click.native='navigateToCursor'
        v-tooltip:top="{ html: 'Navigate to Cursor' }">
        <v-icon>navigation</v-icon>
      </v-btn>
      <v-btn icon dark
        @click.native='resetCursor'
        v-tooltip:top="{ html: 'Return Cursor to Current Position'}">
        <v-icon>my_location</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <svg id='petri-dish'></svg>
    </v-card-text>

  </v-card>

</template>

<script>
  // import Component from "../component_location"
  import {EventBus} from '../event-bus.js'

  export default {
    components: {},

    data () {
      return {
        cursorLocation: [{x:0, y:0, z:0}]
      }
    },
    watch: {
      targets() {
        this.updateTargets()
      }
    },
    methods: {
      navigateToCursor() {
        var cmd = {targetPosition: this.cursorLocation,
          commandString: 'moveToTarget', active: true}
        this.$store.dispatch('executeCommand', cmd)
      },
      updateDish(clickData) {
        console.log(clickData)
        this.cursorLocation = [clickData]
        this.updateLocation()
      },
      resetCursor() {
        this.cursorLocation = this.currentLocation
        this.updateLocation()
      },
      slewToTarget(target) {
        this.cursorLocation = [target.position]
        this.updateLocation()
      },
    },
    computed: {
      canNavigate() {
        if (this.currentLocation[0].x != this.cursorLocation[0].x ||
          this.currentLocation[0].y != this.cursorLocation[0].y) {
          return true
        } else {
            return false
        }
      },
      targets() {
        return this.$store.state.targets
      },
      currentLocation() {
        var position = this.$store.state.units[0].position
        return [position]
      }
    },

    mounted() {

      EventBus.$on('petriClick', this.updateDish)
      EventBus.$on('targetSelect', this.slewToTarget)

      // Define boundary of the petri dish.
      var element = d3.select('#petri-dish').node();
      var width = element.getBoundingClientRect().width;
      var height = element.getBoundingClientRect().height;
      var radius = (height/2)-2
      var targetData = this.targets
      var dishCenter = {x: width/2, y: height/2}
      var targetRadius = 5
      var x_ = d3.scaleLinear()
        .domain([-92/2, 92/2])
        .range([width/2 - height/2, width/2+height/2])
      var y_ = d3.scaleLinear()
        .domain([-92/2, 92/2])
        .range([height/2 + height/2, height/2 - height/2])

      this.svg = d3.select('svg')

      // Save some useful things to class.
      var svg = this.svg

      svg.append('circle')
        .attr('class', 'hello')
        .attr('r', radius)
        .attr('cx', x_(0))
        .attr('cy', y_(0))
        .on('click', function(){
          var coords = d3.mouse(this)
          var clickData = {}
          clickData.x = x_.invert(coords[0])
          clickData.y = y_.invert(coords[1])
          EventBus.$emit('petriClick', clickData)
        })

      svg.selectAll('line.vertical').data(this.cursorLocation)
        .enter()
        .append('line')
        .attr('class', 'vertical')
        .attr('x1', function(d) {return x_(d.x)})
        .attr('y1', function(d) {return y_(Math.sqrt(46**2 - d.x**2)-6)})
        .attr('x2', function(d) {return x_(d.x)})
        .attr('y2', function(d) {return y_(-Math.sqrt(46**2 - d.x**2)+6)})

      svg.selectAll('line.horizontal').data(this.cursorLocation)
        .enter()
        .append('line')
        .attr('class', 'horizontal')
        .attr('x1', function(d) {return x_(-Math.sqrt(46**2 - d.y**2)+6)})
        .attr('y1', function(d) {return y_(d.y)})
        .attr('x2', function(d) {return x_(Math.sqrt(46**2 - d.y**2)-6)})
        .attr('y2', function(d) {return y_(d.y)})

      svg.selectAll('circle.reticule').data(this.cursorLocation)
        .enter()
        .append('circle')
        .attr('class', 'reticule')
        .attr('fill', 'none')
        .attr('r', 5)
        .attr('cx', function(d) {return x_(d.x)})
        .attr('cy', function(d) {return y_(d.y)})

      // Add the target data.
      svg.selectAll('circle.target').data(targetData)
        .enter()
        .append('circle')
        .attr('class', 'target')
        .attr('cx', function(d){return x_(d.position.x)})
        .attr('cy', function(d) {return y_(d.position.y)})
        .attr('r', targetRadius)
        .on('click', function() {
          var coords = d3.mouse(this)
          var clickData = {}
          clickData.x = x_.invert(coords[0])
          clickData.y = y_.invert(coords[1])
          EventBus.$emit('petriClick', clickData)
        })
      this.update = function() {
        svg.selectAll('circle.target')
          .transition()
          .duration(300)
          .attr('class', 'highlightTarget')
          .attr('r', 10)
      }
      this.updateTargets = function() {
        svg.selectAll('circle.target').data(this.targets)
          .enter()
          .append('circle')
          .attr('class', 'target')
          .attr('cx', function(d){return x_(d.position.x)})
          .attr('cy', function(d) {return y_(d.position.y)})
          .attr('r', targetRadius)
      }
      this.updateLocation = function() {
        this.svg.selectAll('line.vertical').data(this.cursorLocation)
          .transition()
          .attr('x1', function(d) {return x_(d.x)})
          .attr('y1', function(d) {return y_(Math.sqrt(46**2 - d.x**2)-6)})
          .attr('x2', function(d) {return x_(d.x)})
          .attr('y2', function(d) {return y_(-Math.sqrt(46**2 - d.x**2)+6)})

        this.svg.selectAll('line.horizontal').data(this.cursorLocation)
          .transition()
          .attr('class', 'horizontal')
          .attr('x1', function(d) {return x_(-Math.sqrt(46**2 - d.y**2)+6)})
          .attr('y1', function(d) {return y_(d.y)})
          .attr('x2', function(d) {return x_(Math.sqrt(46**2 - d.y**2)-6)})
          .attr('y2', function(d) {return y_(d.y)})

        this.svg.selectAll('circle.reticule').data(this.cursorLocation)
          .transition()
          .attr('class', 'reticule')
          .attr('fill', 'none')
          .attr('r', 5)
          .attr('cx', function(d) {return x_(d.x)})
          .attr('cy', function(d) {return y_(d.y)})
      }
    }
  }

</script>

<style>
.hello {
  fill: #00AADC;
  fill-opacity: 0.15;
  stroke: #000000;
  stroke-width: 3px;
}
#petri-dish {
  width: 100%;
  height:100%;
  stroke: black;
  border: 2;
  fill: #efefef;
  cursor: pointer;
}
.target {
  fill: #C1272D;
  stroke-width: 0px;
}
.highlightTarget {
  fill: #C1272D;
  stroke: none;
}
.vertical {
  stroke: grey;
  stroke-width: 1;
}
.horizontal {
  stroke: grey;
}
.reticule {
  stroke: grey;
}
</style>
