import axios from 'axios'

export const getAllAssets = (data) => {
  console.log(data);
  return axios.post('/assets',data)
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

// json-server
export const getAllUsers = () => {
  return axios.get('/users')
}






export const registerUser = (data) => {
  return axios.post('/registerUser', data)
}

export const enrollAdmin = (data) => {
  return axios.post('/enrollAdmin',data)
}