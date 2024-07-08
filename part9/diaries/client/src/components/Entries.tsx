import type { NonSensetiveFlightData } from '../misc/types';

interface DataProps {
  data: NonSensetiveFlightData;
}

const Entries = ({ data }: DataProps):JSX.Element => {

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Diary entries</h1>
      {data.map(entry => {
        return (
          <div key={entry.id}>
            <h2>{entry.date}</h2>
            <p>{entry.visibility}</p>
            <p>{entry.weather}</p>
            <p>{entry.comment}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Entries
