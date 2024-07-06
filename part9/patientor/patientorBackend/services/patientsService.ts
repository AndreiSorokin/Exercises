import { v1 as uuid } from 'uuid'

import { Gender, newPatient, NonSensitivePatient } from '../types/types'
import patientData from '../data/patients'

const getPatients= (): NonSensitivePatient[] => {
   return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
      id,
      name,
      dateOfBirth, 
      gender: gender as Gender, 
      occupation 
   }))
}

const addPatients = (name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string): newPatient => {
   const newPatient = {
      id: uuid(),
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
   }
   patientData.push(newPatient)
   return newPatient
}

export default {
   getPatients,
   addPatients
}