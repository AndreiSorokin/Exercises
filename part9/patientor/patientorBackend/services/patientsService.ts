import { v1 as uuid } from 'uuid';

import { Entry, Gender, newPatient, NonSensitivePatient, Patient } from '../types/types';
import patientData from '../data/patients';

const getPatients = (): NonSensitivePatient[] => {
   return patientData.map(({ id, name, ssn, dateOfBirth, gender, occupation }) => ({ 
      id,
      name,
      ssn,
      dateOfBirth, 
      gender: gender as Gender, 
      occupation
   }));
};

const getSeiglePatient = (id: string): Patient => {
   const patient = patientData.find(p => p.id ===id)
   if (!patient) {
      throw new Error(`Patient with id ${id} not found`);
   }
   return {
      ...patient,
      gender: patient.gender as Gender
   };
}

const addPatients = (name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string, entries: Entry[]): newPatient => {
   const newPatient = {
      id: uuid(),
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries
   };
   patientData.push(newPatient);
   return newPatient;
};

export default {
   getPatients,
   getSeiglePatient,
   addPatients
};