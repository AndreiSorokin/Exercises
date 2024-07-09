import express from "express";
import cors from "cors";

import patientRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const app = express();

app.use(express.json());

const corsOptions = {
   origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
   res.send('pong');
});

const PORT = 3001;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});