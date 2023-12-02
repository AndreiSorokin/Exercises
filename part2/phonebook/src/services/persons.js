import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
   return axios.get(baseUrl)
}

const create = (newObject) => {
   const request = axios.post(baseUrl, newObject)
   return request.then(res=> res.data)
}

const update = (id, newObject)=> {
   const request = axios.put(`${baseUrl}/${id}`, newObject)
   return request.then(res=> res.data)
}

const deletePerson = (id) => {
   const request = axios.delete(`${baseUrl}/${id}`)
   return request.then(res=> res.data)
}

const personsService = {
   getAll: getAll,
   create: create,
   update: update,
   deletePerson: deletePerson
}

export default personsService