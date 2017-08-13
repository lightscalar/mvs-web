import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'
Vue.use(Vuex)

var defaultExperiment = {title: '', description: '', moduleId: 0}
var experimentList = []

export default new Vuex.Store({

  // ------ STATE VARIABLES --------------------
  state: {
    currentExperiment: {title: null, description: null, createdAt: null},
    experiments: [],
    units: []
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
    setExperimentList(state, data) {
      state.experiments = data
    },
    setUnits(state, data) {
      state.units = data
    },
  },

  // ------ ACTIONS ------------------------
  actions: {
    getExperiment(context, id) {
      api.getResource('experiment', id).then(function(resp) {
        context.commit('setCurrentExperiment', resp.data)
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
    deleteExperiment(context, id) {
      // Delete the session at /id.
      api.deleteResource('experiment', id).then(function(resp) {
        context.dispatch('listExperiments')
        router.push({name: 'Archive'})
      })
    },
    getUnits(context) {
      api.getResource('units').then(function(resp) {
        context.commit('setUnits', resp.data)
      })
    }
  }
})
