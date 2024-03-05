import { useState, useEffect } from "react"
export function Formulario(){

    const [inputTitle, setInputTitle] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [selectPriority, setSelectPriority] = useState(1)
    const [checkresul, setCheckResul] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [ticket, setTicket] = useState([])

    function validar(){
        const title = inputTitle;
        const descripcion = inputDescription;
        const priority = selectPriority;
        const resuelto = checkresul;
        if(title.length > 6){
            setIsCorrect(true);
            setTicket("Titulo: " + title+", desc: " + descripcion+", resul: " +resuelto+", priority: " + priority)
            
        }else{
            setIsCorrect(false)
        }
    }

    useEffect(() => {
        console.log(ticket)
    },[isCorrect]);

    return(
        <form className="formulario" >
            <h3>Agregar Ticket</h3>
            <label htmlFor="title">Titulo*</label>
            <input value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="Titulo" type="text" id="title" required/>
            <label htmlFor="priority">Prioridad*</label>
            <select value={selectPriority} onChange={(e) => setSelectPriority(e.target.value)} className="priority" id="priority">
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
            <button onClick={validar} type="submit" className="form-btn">Enviar</button>
        </form>
    )
}