import { useEffect, useState } from "react"
import NewEntry from "./components/NewEntry";
import Entries from "./components/Entries";

function App() {

  const [data, setData] = useState<NewEntry | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/diaries')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  console.log(data)
  return (
    <div>
      <NewEntry setData={setData} />
      <Entries />
    </div>
  )
}

export default App
