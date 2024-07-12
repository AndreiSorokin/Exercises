export type Diagnoses = {
   code: string
   name: string
   latin?: string
};

export enum Gender {
   Male = "male",
   Female = "female",
   Other = "other"
}

export type Diagnosis = {
   code: string;
}

export type Discharge = {
   date: string;
   criteria: string;
}

export type SickLeave = {
   startDate: string;
   endDate: string;
}

interface BaseEntry {
   id: string;
   description: string;
   date: string;
   specialist: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
   type: "OccupationalHealthcare";
   employerName: string;
   sickLeave?: SickLeave;
   diagnosisCodes?: Array<Diagnosis['code']>;
 }
 
 export interface HospitalEntry extends BaseEntry {
   type: "Hospital";
   discharge: Discharge;
   diagnosisCodes?: Array<Diagnosis['code']>;
 }

export interface HealthCheckEntry extends BaseEntry {
   type: "HealthCheck";
   healthCheckRating: number;
   diagnosisCodes?: Array<Diagnosis['code']>;
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
   id: string;
   name: string;
   dateOfBirth: string;
   ssn: string;
   gender: Gender;
   occupation: string;
   entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type newPatient = Omit<Patient, 'id'>;