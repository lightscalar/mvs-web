<template>
  <v-parallax src="/static/stem-cell.jpg" height="1200" >
    <v-layout column align-center justify-center class='hero'>
      <h1 class="white--text">Microscope Video Surveillance</h1>
      <h4 class="white--text">The future of microscopy.</h4>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


.hero {
  margin-top: -400px;
}
</style>
