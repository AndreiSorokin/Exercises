import express from 'express';

import patientsService from '../services/patientsService';
import { Entry, Gender } from '../types/types';

const router = express.Router();

router.get('/', (_req, res) => {
   const patients = patientsService.getPatients();
   return res.json(patients);
});

router.get('/:id', (req, res) => {
   const patient = patientsService.getSeiglePatient(req.params.id);
   if (patient) {
      res.json(patient);
   } else {
      res.status(404).send('Patient not found');
   }
});

router.post('/', (req, res) => {
   const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body as {
      name: string;
      dateOfBirth: string;
      ssn: string;
      gender: Gender;
      occupation: string;
      entries: Entry[];
   };
   const newPatient = patientsService.addPatients(
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries
   );
   res.json(newPatient);
});

router.post('/:id/entries', (req, res) => {
   const { id } = req.params;
   const entry = req.body as Entry;

   try {
      const newEntry = patientsService.addEntry(id, entry);
      res.json(newEntry);
   } catch (error) {
      if (error instanceof Error) {
         res.status(400).send(error.message);
      } else {
         res.status(400).send('An unknown error occurred');
      }
   }
});

export default router;