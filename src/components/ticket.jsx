export function Ticket({titulo, id, prioridad, descripcion, resuelto}) {
    return (
        <div className="tickets" key={id}>
            <h5>{titulo}</h5>
            <p>{descripcion}</p>
            <h6>Prioridad: {prioridad}</h6>
            <h6>Resuelo: {resuelto}</h6>
        </div>
    )
}