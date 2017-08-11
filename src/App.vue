<template>
  <v-app id="annotate-app">
    <v-navigation-drawer persistent light :mini-variant.sync="mini" class='white' v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img class='logo' src='./assets/bare-logo@2x.png'>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Annotation Options</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="" flat dark>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img src='./assets/site-logo@2x.png' class='logo'>
    </v-toolbar>
    <main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
    </main>
  </v-app>
</template>



<script>
export default {
  name: 'app',

  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'Library', icon: 'view_list' },
        { title: 'Cohorts', icon: 'people' }
      ],
      mini: false,
      right: null
    }
  }

}
</script>

<style lang="css">
.logo {
  height: 40px;
}
.header {
  background-color: #305580;
}
</style>
