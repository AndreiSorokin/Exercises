import { Diagnoses } from "../types/types";
import diagnosesData from '../data/diagnoses';

const getDiagnoses = (): Diagnoses[] => {
   return diagnosesData.map(({ code, name, latin }) => ({ code, name, latin }));
};

export default {
   getDiagnoses
};