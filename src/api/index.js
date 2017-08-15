import axios from 'axios'
window.axios = axios

const BASE_URL = 'http://localhost:5000'
// const BASE_URL = 'http://mvs-server.ngrok.io'

// Basic API for talking to the webserver API.
export default {

  getStatic(resourceName){
    var url = BASE_URL + '/' + resourceName
    return axios.get(url)
  },

  getResource(resourceName, id) {
    var url = BASE_URL + '/' + resourceName + '/' + id
    return axios.get(url)
  },

  listResource(resourceName) {
    var url = BASE_URL + '/' + resourceName
    return axios.get(url)
  },

  deleteResource(resourceName, id) {
    var url = BASE_URL + '/' + resourceName + '/' + id
    return axios.delete(url)
  },

  postResource(resourceName, data) {
    var url = BASE_URL + '/' + resourceName
    return axios.post(url, data)
  },

  postNestedResource(parentResource, parentId, childResource, data) {
    var url = BASE_URL + '/' + parentResource + '/' + parentId + '/' + childResource
    return axios.post(url, data)
  },

  listNestedResource(parentResource, parentId, childResource) {
    var url = BASE_URL + '/' + parentResource + '/' + parentId + '/' + childResource
    return axios.get(url)
  },

  putResource(resourceName, data) {
    var url = BASE_URL + '/' + resourceName + '/' + data._id
    return axios.put(url, data)
  },

  streamResource(resourceName, data) {
    var url = BASE_URL + '/' + resourceName + '/' + data.id
    url += '/stream'
    url += '?' + 'elapsedTime=' + data['elapsedTime']
    return axios.get(url, data)
  },

  getHistory(resourceName, data) {
    var url = BASE_URL + '/' + resourceName + '/' + data.id
    url += '/history'
    return axios.get(url, data)
  }

}
