import logo from './logo.svg';
import './App.css';

const QCard = ({data}) => {
  return(
    <div className='row card'>
      {data.value}
    </div>
  )
}

function App() {
  const data = []
  for (let x = 0; x < 5; x ++){
    data[x] = []
    for(let y = 0; y < 5; y++){
      data[x].push({value: y%5*100+100, question:'Question!', answer:'answer!'})
    }
  }
  return (
    <div className="container">
     {data.map(col=>{
       return(<div className='col'>
       {col.map((row)=>{
         return <QCard data={row}/>
       })}</div>)
     })}
    </div>
  );
}

export default App;
