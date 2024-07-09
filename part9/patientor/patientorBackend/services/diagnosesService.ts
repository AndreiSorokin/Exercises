import { Diagnoses } from "../types/types";
import diagnosesData from '../data/diagnoses';

const getDiagnoses = (): Diagnoses[] => {
   return diagnosesData;
};

export default {
   getDiagnoses
};