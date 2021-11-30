import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {titles, data} from './christmas2021'

const ScoreTile = () =>{
  const [score, setScore] = useState(0)
  const [teamName, setName] = useState('')
  const [edit, setEdit] = useState(true)
  return (
    <div className='scoretile'>
      
      <div>{edit === true ? <input onChange={(e)=>setName(e.target.value)} value={teamName}></input> : <span className='title'>{teamName}</span>}
      <button className='scorecard-button' onClick={()=>setEdit(!edit)} >s</button>
      </div>
      <div className='container flex-between'>
        <span className='score-text'>{score}</span>
        <div>
          <button className='score-button bg-green' onClick={()=>setScore(score+100)} >+</button>
          <button className='score-button bg-red' onClick={()=>setScore(score-100)} >-</button>
        </div>
      </div>
    </div>
  )
}

const ScoreBoard = () => {
  const [teams, setTeams] = useState([1])
  const [edit, setEdit] = useState(true)
  return(<div>
    <button 
    disabled={!edit}
    className='scorecard-button'
     onClick={()=>setTeams([...teams,1])} >+</button>

      <button 
      disabled={!edit}
      className='scorecard-button'
      onClick={()=>{
        const newTeams = teams.slice(0,-1)
        setTeams([...newTeams])}} >-</button>

    <button 
    className='scorecard-button'
     onClick={()=>setEdit(!edit)} >s</button>

    {teams.map(team => <ScoreTile/>)}
  </div>)
}

const QCard = ({data, value}) => {
  const [showQ, setShowQ] = useState(false)
  const [showA, setShowA] = useState(false)
  return(<div>{showQ && <div className='question'>
    
    
      <div className='question-text'>
        {data.question}
        <button onClick={()=>{setShowQ(false); setShowA(false)}}>X</button>
      </div>
      <div className='question-text'>{data.kquestion}</div>
      <button onClick={()=>{setShowA(!showA)}}>answer</button>
      
      <div className='answer-text'>{showA && data.answer}</div>
      <div className='answer-text'>{showA && data.kanswer}</div>
    </div>}
  
    <div className='row card'
    onClick={()=>{setShowQ(true)}}>
      {value}
    </div>
  </div>
  )
}

function App() {
  return (<div className='h100 bg-green'>
    <div className="container">
     {data.map((col,ind)=>{
       return(<div className='col'>
         <div className='card-stop title'>{titles[ind]}</div>
       {col.map((row, index)=>{
         return <QCard value={index%5*100+100} data={row}/>
       })}
       <div className='card-stop'></div>
       </div>)
     })}
     <div className='col'>
       <ScoreBoard/>
     </div>
    </div>
    </div>
  );
}

export default App;
