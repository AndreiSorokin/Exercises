import { v1 as uuid } from 'uuid';

import { Entry, EntryWithoutId, Gender, newPatient, NonSensitivePatient, Patient } from '../types/types';
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

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
   const newEntry = {
      id: uuid(),
      ...entry
   }

   const patient = patientData.find(p => p.id === patientId);

   if (!patient) {
      throw new Error('Patient not found');
   }

   switch (newEntry.type) {
      case "Hospital":
         if (!('discharge' in newEntry)) {
            throw new Error('Hospital entry must have a discharge field');
         }
         break;
      case "OccupationalHealthcare":
         if (!('employerName' in newEntry)) {
            throw new Error('OccupationalHealthcare entry must have an employerName field');
         }
         break;
      case "HealthCheck":
         if (!('healthCheckRating' in newEntry)) {
            throw new Error('HealthCheck entry must have a healthCheckRating field');
         } else if (newEntry.healthCheckRating > 5) {
            throw new Error('Invalid health check rating. Must be between 0 and 5');
         }
         break;
      default:
         throw new Error('Invalid entry type');
   }

   patient.entries.push(newEntry);
   return newEntry;
}


export default {
   getPatients,
   getSeiglePatient,
   addPatients,
   addEntry
};