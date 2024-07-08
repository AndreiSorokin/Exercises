import React, { useState } from 'react';
import type { NewEntry } from '../misc/types';
import { Visibility } from '../misc/types';
import { Weather } from '../misc/types';

interface NewEntryProps {
   setData: React.Dispatch<React.SetStateAction<NewEntry | null>>;
}

const NewEntry = ({ setData }: NewEntryProps): JSX.Element => {
   const [date, setDate] = useState('');
   const [visibility, setVisibility] = useState<Visibility | ''>('');
   const [weather, setWeather] = useState<Weather | ''>('');
   const [comment, setComment] = useState('');

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
         console.error('Visibility is required');
         return;
      } else if (weather === '') {
         console.error('Weather is required');
         return;
      }

      const newWeather: NewEntry = {
         date,
         visibility,
         weather,
         comment,
      }

      console.log('New entry:', newWeather);

      try {
         const response = await fetch('http://localhost:3000/api/diaries', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWeather),
         });

         if(response.ok) {
            const data = await response.json();
            setData(data);
         } else {
            console.error('Failed to add new entry');
         }
      } catch (error) {
         console.error('Error:', error);
      }
   }

   return (
      <div>
         <h1>Add new entry</h1>
         <form onSubmit={handleSubmit}>
            <input type="text" onChange={dateChange} />
            <input type="text" onChange={visibilityChange} />
            <input type="text" onChange={weatherChange} />
            <input type="text" onChange={commentChange} />
            <button type='submit'>Add</button>
         </form>
      </div>
   )
}

export default NewEntry
