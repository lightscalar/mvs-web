import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateExperiment from '@/components/CreateExperiment'
import ListExperiments from '@/components/ListExperiments'
import Experiment from '@/components/Experiment'

Vue.use(Router)

var createExperimentRoute = {path: '/experiments/create',
                             name: 'CreateExperiment',
                             component: CreateExperiment}
var experimentRoute = {path: '/experiment/:id', name: 'Experiment',
                             component: Experiment, props: true}
var listExperimentsRoute = {path: '/experiments/archive',
                            name: 'Archive',
                            component: ListExperiments}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    createExperimentRoute,
    experimentRoute,
    listExperimentsRoute
  ]
})
