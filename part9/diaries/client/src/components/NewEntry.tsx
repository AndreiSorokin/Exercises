import React, { useState } from 'react';
import axios from 'axios';

import type { FlightData } from '../misc/types';
import { Visibility } from '../misc/types';
import { Weather } from '../misc/types';
import type { NewEntry } from '../misc/types';
import ErrorNotofocation from '../notifications/ErrorNotofocation';

interface NewEntryProps {
   setData: React.Dispatch<React.SetStateAction<FlightData | null>>;
}

const NewEntry = ({ setData }: NewEntryProps): JSX.Element => {
   const [date, setDate] = useState('');
   const [visibility, setVisibility] = useState<Visibility | ''>('');
   const [weather, setWeather] = useState<Weather | ''>('');
   const [comment, setComment] = useState('');
   const [error, setError] = useState<string | null>(null);

   const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
   }
   const visibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setVisibility(e.target.value as Visibility);
   }
   const weatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setWeather(e.target.value as Weather);
   }
   const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (visibility === '') {
         setError('Visibility is required');
         return;
      } else if (weather === '') {
         setError('Weather is required');
         return;
      }

      const newWeather: NewEntry = {
         date,
         visibility,
         weather,
         comment,
      }

      try {
         const response = await axios.post('http://localhost:3000/api/diaries', newWeather);
         const data = response.data;
         setData(prevData => prevData ? [...prevData, data] : [data]);
      } catch (error) {
         if (axios.isAxiosError(error) && error.response) {
            setError(`Failed to add new entry: ${error.response.data}`);
         } else if (error instanceof Error) {
            setError(`Error: ${error.message}`);
         } else {
            setError('An unknown error occurred');
         }
      }

      setDate('');
      setComment('');
      setVisibility('');
      setWeather('');
   }

   return (
      <div>
         <ErrorNotofocation message={error} />
         <h1>Add new entry</h1>
         <form onSubmit={handleSubmit}>
            <div>
               Date: <input type="date" id="date" value={date} onChange={dateChange} />
            </div>
            <div>
               Visibility:
               <input type="radio" id="visibility-great" value="great" checked={visibility === 'great'} onChange={visibilityChange} />
               <label htmlFor="visibility-great">great</label>
               <input type="radio" id="visibility-good" value="good" checked={visibility === 'good'} onChange={visibilityChange} />
               <label htmlFor="visibility-good">good</label>
               <input type="radio" id="visibility-ok" value="ok" checked={visibility === 'ok'} onChange={visibilityChange} />
               <label htmlFor="visibility-ok">ok</label>
               <input type="radio" id="visibility-poor" value="poor" checked={visibility === 'poor'} onChange={visibilityChange} />
               <label htmlFor="visibility-poor">poor</label>
            </div>
            <div>
               Weather:
               <input type="radio" id="weather-sunny" value="sunny" checked={weather === 'sunny'} onChange={weatherChange} />
               <label htmlFor="weather-sunny">sunny</label>
               <input type="radio" id="weather-rainy" value="rainy" checked={weather === 'rainy'} onChange={weatherChange} />
               <label htmlFor="weather-rainy">rainy</label>
               <input type="radio" id="weather-cloudy" value="cloudy" checked={weather === 'cloudy'} onChange={weatherChange} />
               <label htmlFor="weather-cloudy">cloudy</label>
               <input type="radio" id="weather-stormy" value="stormy" checked={weather === 'stormy'} onChange={weatherChange} />
               <label htmlFor="weather-stormy">stormy</label>
               <input type="radio" id="weather-windy" value="windy" checked={weather === 'windy'} onChange={weatherChange} />
               <label htmlFor="weather-windy">windy</label>
            </div>
            <div>
               Comment: <input type="text" value={comment} onChange={commentChange} />
            </div>
            <button type='submit'>Add</button>
         </form>
      </div>
   )
}

export default NewEntry
