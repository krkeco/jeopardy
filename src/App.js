import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {titles, data} from './christmas2021'

const QCard = ({data, value}) => {
  const [showQ, setShowQ] = useState(false)
  const [showA, setShowA] = useState(false)
  return(<div>{showQ && <div className='question'>
    <button onClick={()=>{setShowQ(false)}}>X</button>
    <button onClick={()=>{setShowA(!showA)}}>answer</button>
      {data.question}
      {showA && data.answer}
    </div>}
  
    <div className='row card'
    onClick={()=>{setShowQ(true)}}>
      {value}
    </div>
  </div>
  )
}

function App() {
  return (
    <div className="container">
     {data.map(col=>{
       return(<div className='col'>
       {col.map((row, index)=>{
         return <QCard value={index%5*100+100} data={row}/>
       })}</div>)
     })}
    </div>
  );
}

export default App;
