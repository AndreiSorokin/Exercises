import express from 'express';

import patientsService from '../services/patientsService';
import { Gender } from '../types/types';

const router = express.Router()

router.get('/', (_req, res) => {
   const patients = patientsService.getPatients()
   return res.json(patients)
})

router.post('/', (req, res) => {
   const { name, dateOfBirth, ssn, gender, occupation }: { name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string } = req.body
   const newPatient = patientsService.addPatients(
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
   )
   res.json(newPatient)
})

export default router;