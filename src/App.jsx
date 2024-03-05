import { Formulario } from "./components/formulario"
import { useEffect, useState } from "react";
import { helpHttp } from './logic/fetchData.jsx'
import { ticket } from './components/ticket.jsx';
function App() {

  const [db, setDb] = useState([])
  const api = helpHttp();
  const url = "http://localhost:3000/ticket";

  useEffect(() =>{
    api.get(url).then((response) => {
        setDb(response)
    });
    },[]);

    const createData =(data) => {
      let options ={
          body:data,
          headers: {"Content-Type": "application/json"}
      }
      
      api.post(url, options).then((response) => {
        setDb(...db,response)
      });
  }

  return (
    <div className="container">
      <Formulario action={createData} />
      <h4>Current tickets</h4>
      {db ? db.map((user)=> (
        ticket(user.title, user.id, user.priority, user.description, user.resolve))): 
        <h5>sin datos...</h5>}
    </div>
  )
}

export default App
