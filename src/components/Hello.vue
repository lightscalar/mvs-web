<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
    <v-card>
      <v-card-text>
        <v-text-field
          name="input-1"
          label="Session ID (i.e., 314159)"
          id="testing"
          class='big-input'
          autofocus
          type='number'
          max='999999'>
        </v-text-field>
      </v-card-text>
      <v-card-actions center>
        <v-btn primary>Start Annotating</v-btn>
      </v-card-actions>
      </v-card>
    </v-flex>
    </v-layout>
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
</style>
