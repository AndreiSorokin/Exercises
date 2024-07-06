export type Diagnoses = {
   code: string;
   name: string;
   latin?: string;
}

export enum Gender {
   MALE = "male",
   FEMALE = "female",
   OTHER = "other"
}

export type Patient = {
   id: string;
   name: string;
   dateOfBirth: string;
   ssn: string;
   gender: Gender;
   occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>

export type newPatient = Omit<Patient, 'id'>