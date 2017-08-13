<template>
  <v-app id="mvs-app">
    <v-navigation-drawer persistent light :mini-variant.sync="mini" class='white' v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img class='logo' src='./assets/bare-logo@2x.png'>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>MVS Options</v-list-tile-title>
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
        <v-list-tile v-for="item in items" :key="item.title" @click.native='menuHandler(item)'>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider style='width:1px' dark></v-divider>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in settings" :key="item.title" @click.native='menuHandler(item)'>
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
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <a href='/'>
        <img src='./assets/mvs-logo@2x.png' class='logo title-logo'>
      </a>
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
        { title: 'Home', icon: 'home', route: 'Home' },
        { title: 'New Experiment', icon: 'add_circle_outline', route: 'CreateExperiment'},
        { title: 'Archive', icon: 'cloud', route: 'Archive' },
        { title: 'System Status', icon: 'assessment' },
      ],
      settings: [
        { title: 'Settings', icon: 'settings' },
        { title: 'Help', icon: 'help' },
      ],
      mini: false,
      large: true,
      right: null
    }
  },

  methods: {
    menuHandler(item) {
      this.$router.push({name: item.route})
    }
  }

}
</script>

<style lang="css">
.logo {
  height: 40px;
}
.title-logo {
  margin-left: 25px;
}
.header {
  background-color: #305580;
}
</style>
