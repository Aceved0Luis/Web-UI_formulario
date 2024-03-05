import { useEffect, useState } from "react";
import { helpHttp } from './logic/fetchData.jsx'
import { Ticket } from './components/ticket.jsx';
function App() {

  const [db, setDb] = useState([])
  const [inputTitle, setInputTitle] = useState("")
  const [inputDescription, setInputDescription] = useState("")
  const [selectPriority, setSelectPriority] = useState(1)
  const [checkresul, setCheckResul] = useState(false)

  const api = helpHttp();
  const url = "http://localhost:3000/ticket";

  useEffect(() =>{
    api.get(url).then((response) => {
        setDb(response)
    });
    },[]);

    const enviarDatos = (e) =>{
      e.preventDefault();
      const title = inputTitle;
      const descripcion = inputDescription;
      const priority = selectPriority;
      const resuelto = checkresul;
      if (title.length > 5 && title.length < 18){
        fetch('http://localhost:3000/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title:title, description:descripcion, priority: priority, resolve:resuelto})
        })
          .then(res => {
            return res.json()
          })
          .then(data => {
            const nuevoArregloTickets = [...db, data];
            setDb(nuevoArregloTickets);
          })
      }
    }

  return (
    <div className="container">
      <h3>Agregar Ticket</h3>
      <form className="formulario" onSubmit={enviarDatos}>
            <label htmlFor="title">Titulo*</label>
            <input value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="Titulo" type="text" id="title" name="title" required/>
            <label htmlFor="priority">Prioridad*</label>
            <select value={selectPriority} onChange={(e) => setSelectPriority(e.target.value)} className="priority" id="priority" name="priority">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <label htmlFor="descripcion">Descripción:</label>
            <textarea value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} placeholder="Descripcion" id="descripcion"></textarea>
            <label>
                <input value={checkresul} onChange={(e) => setCheckResul(e.target.checked)} type="checkbox"/>
                Mark as resolve
            </label>
            <button type="submit" className="form-btn">Enviar</button>
        </form>
      <h4>Current tickets</h4>
      {db.map((res)=>(
        <Ticket titulo={res.title} id={res.id} prioridad={res.priority} descripcion={res.description} resuelto={res.resolve.toString()} />))
      }
    </div>
  )
}

export default App
