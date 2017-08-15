import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'
Vue.use(Vuex)

var defaultExperiment = {title: '', description: '', unitId: 0}
var experimentList = []
var defaultUnit = {name: 'Unit-01', position: {x:-1, y:-1, z:-1}, unitId: 0}
var selectedTargetId = ''

export default new Vuex.Store({

  // ------ STATE VARIABLES --------------------
  state: {
    currentExperiment: {title: null, description: null, createdAt: null},
    experiments: [],
    targets: [],
    target: {schedule: {}},
    units: {0: defaultUnit},
    selectedTargetId: ''
  },

  // -------- GETTERS --------------------------
  getters: {
    maxTime: state => {
      if (state.currentData.length>0) {
	var len = state.currentData[0].data.length
	if (len>0) {
	  return state.currentData[0].data[len-1][0]
	}
      }
      return 0
    }
  },

  // ------ MUTATIONS ------------------------
  mutations: {
    setCurrentExperiment(state, data) {
      state.currentExperiment = data
    },
unitIdsetExperimentList(state, data) {
      state.experiments = data
    },
    setTargets(state, data) {
      state.targets = data
    },
    setTarget(state, data) {
      state.target = data
    },
    setUnits(state, data) {
      state.units = {}
      for (var k=0; k< data.length; k++) {
       state.units[data[k].unitId] = data[k]
      }
    },
  },

  // ------ ACTIONS ------------------------
  actions: {
    getExperiment(context, id) {
      api.getResource('experiment', id).then(function(resp) {
        context.commit('setCurrentExperiment', resp.data)
        context.dispatch('listTargets', resp.data._id)
      })
    },
    createExperiment(context, data) {
      // Create a new session.
      api.postResource('experiments', data).then(function(resp) {
        context.commit('setCurrentExperiment', resp.data)
        router.push({name: 'Experiment', params: {id: resp.data._id}})
      })
    },
    listExperiments(context) {
      // List all sessions in database.
      api.listResource('experiments').then(function(resp) {
        context.commit('setExperimentList', resp.data)
      })
    },
    listTargets(context, experiment_id) {
      api.listNestedResource('experiment', experiment_id, 'targets').then(function(resp) {
        context.commit('setTargets', resp.data)
      })
    },
    deleteExperiment(context, id) {
      // Delete the session at /id.
      api.deleteResource('experiment', id).then(function(resp) {
        context.dispatch('listExperiments')
        router.push({name: 'Archive'})
      })
    },
    getUnits(context) {
      api.listResource('units').then(function(resp) {
        context.commit('setUnits', resp.data)
      })
    },
    getTarget(context, id) {
      api.getResource('target', id).then(function(resp) {
        context.commit('setTarget', resp.data)
        context.dispatch('getExperiment', resp.data._experimentId)
      })
    },
    updateTarget(context, data) {
      api.putResource('target', data).then(function(resp) {
        context.commit('setTarget', resp.data)
      })
    },
    createTarget(context, data) {
      // Update current unit state (important!)
      var experiment = data.experiment
      var target = data.target
      api.listResource('units').then(function(resp) {
        context.commit('setUnits', resp.data)
        // Now create a target using latest platform location (TODO: integers)
        target.position = context.state.units[experiment.unitId].position
        api.postNestedResource('experiment', experiment._id, 'targets', target)
          .then(function(resp) {
            router.push({name: 'Target', params: {id: resp.data._id}})
          })
      })
    }
  }
})
