import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { data as c2021 } from './christmas2021'
import { data as c2024 } from './christmas2024'
import { CiSettings } from "react-icons/ci";

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

const ScoreBoard = ({ setDataChange }) => {
  const [teams, setTeams] = useState([1])
  const [edit, setEdit] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  return(<div className='flex flex-col'>
    <div className='flex flex-row items-center content-center'>

    <button 
      disabled={!edit}
      className='scorecard-button flex flex-row content-center items-center'
      onClick={()=>setShowSettings(!showSettings)} >
      <CiSettings size={24} color='yellow' className='' />
    </button>
      
      {showSettings && <select id="data-year" name="year" onChange={setDataChange}>
        <option value='2024'>Christmas 2024</option>
        <option value='2021'>Christmas 2021</option>
      </select>}

      <button 
        disabled={!edit}
        className='scorecard-button flex flex-row content-center items-center'
        onClick={()=>setTeams([...teams,1])} >+</button>

      <button 
        disabled={!edit}
        className='scorecard-button flex flex-row content-center items-center'
        onClick={()=>{
          const newTeams = teams.slice(0,-1)
          setTeams([...newTeams])}} >-</button>

      <button 
        className='scorecard-button flex flex-row content-center items-center'
        onClick={()=>{
          setEdit(!edit);
          !!edit && setShowSettings(false);
          }} >s</button>
    </div>
    {teams.map(team => <ScoreTile/>)}
  </div>)
}

const QCard = ({data, value}) => {
  const [showQ, setShowQ] = useState(false)
  const [showA, setShowA] = useState(false)
  const [showCard, setShowCard] = useState(true)
  return(<div>{showQ && <div className='question bg-maroon'>
    <div className='close-button-container'>
      <button className='question-button' onClick={()=>{setShowQ(false); setShowA(false)}}>X</button>
    </div>
    <div className='question-button'>
      <div className='question-text'>{data.question}</div>
      <div className='question-text'>{data.kquestion}</div>      
      <div className='answer-text'>{showA && data.answer}</div>
      <div className='answer-text'>{showA && data.kanswer}</div>
    </div>
    <button className='question-button' onClick={()=>{setShowA(!showA)}}>answer</button>
  </div>}
  
  <div className='row card bg-red'
    onClick={()=>{setShowQ(true); setShowCard(false)}}>
    {showCard && value}
  </div> 
  </div>
  )
}

function App() {
  const [data, setData] = useState(c2024)

  const setDataChange = (e) => {
    const datum = {
      '2021': c2021,
      '2024': c2024
    }
    console.log('krkeco change',e.target.value)
    setData(datum[e.target.value])
  }
  return (<div className='h100 bg-green-700'>
    <div className="flex flex-row">
      {data.map((col,ind)=>{
        return(<div className='d-flex flex-col content-end'>
          <div className='card-stop title'>{col.name}</div>
          {col.questions.map((row, index)=>{
            return <QCard value={index%5*100+100} data={row}/>
          })}
          <div className='card-stop'></div>
        </div>)
      })}
      <div >
        <ScoreBoard setDataChange={setDataChange}/>
      </div>
    </div>
  </div>
  );
}

export default App;
