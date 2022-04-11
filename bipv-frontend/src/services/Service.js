import axios from 'axios'

export const getAllAssets = (userName) => {
  return axios.get('/assets?userName='+userName)
}

export const addNewAsset = (data) => {
  return axios.post('/addAsset', data)
}

export const updateAsset = (data) => {
  return axios.post('/updateAsset', data)
}

export const deleteAsset = (data) => {
  return axios.post('/deleteAsset', data)
}