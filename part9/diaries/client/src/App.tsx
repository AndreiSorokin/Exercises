import { useEffect, useState } from "react"
import axios from "axios";

import NewEntry from "./components/NewEntry";
import Entries from "./components/Entries";
import type { FlightData } from "./misc/types";

function App() {

  const [data, setData] = useState<FlightData | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:3000/api/diaries')
        const returnedData = response.data;
        setData(returnedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <NewEntry setData={setData} />
      {data && <Entries data={data}/>}
    </div>
  )
}

export default App
