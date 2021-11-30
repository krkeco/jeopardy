import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {titles, data} from './christmas2021'

const ScoreTile = () =>{
  const [score, setScore] = useState(0)
  return (
    <div className='scoretile'>
      <input></input>
      score:{score}
      <button onClick={()=>setScore(score+100)} >+</button>
      <button onClick={()=>setScore(score-100)} >-</button>
    </div>
  )
}

const ScoreBoard = () => {
  const [teams, setTeams] = useState([1])
  return(<div>
    <button onClick={()=>setTeams([...teams,1])} >+</button>
      <button onClick={()=>{
        const newTeams = teams.slice(0,-1)
        setTeams([...newTeams])}} >-</button>
    {teams.map(team => <ScoreTile/>)}
  </div>)
}

const QCard = ({data, value}) => {
  const [showQ, setShowQ] = useState(false)
  const [showA, setShowA] = useState(false)
  return(<div>{showQ && <div className='question'>
    <button onClick={()=>{setShowQ(false); setShowA(false)}}>X</button>
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
     <div className='col'>
       <ScoreBoard/>
     </div>
    </div>
  );
}

export default App;
