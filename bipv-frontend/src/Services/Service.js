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

export const transferAsset = (data) => {
  return axios.post('/transferAsset', data)
}



// json-server
export const addUser = (data) => {
  return axios.post('/users', data)
}
// json-server
export const getUser = ({username,password}) => {
  return axios.get('/users?username='+username+'&password='+password)
}






export const registerUser = (data) => {
  return axios.post('/registerUser', data)
}

export const enrollAdmin = () => {
  return axios.get('/enrollAdmin')
}