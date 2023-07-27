import { useEffect, useState } from "react";
import { Event } from "../anadir";
import Link from "next/link";



const Page = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const [error, setError] = useState<boolean>(false);

    async function borrar(id:string) {
        try{
            console.log(id);
            await fetch(`http://localhost:8080/deleteEvent/${id}`, {
                method: 'DELETE',
              });
              fetchData();
              setError(false);
        }catch(e){
            setError(true);
    
        }
    }

    const fetchData = async () => {
        const data = await fetch(`http://localhost:8080/events`);
        const events: Event[] = await data.json();
          setEvents(events);
          
      };

    useEffect(() => {
        try {
          fetchData();
        } catch (e) {
          console.log(e);
        }
      }, []);

      return(
        <>
            <Link href="/">Volver a menu</Link>
            <br/>
            {error && <p>Error</p>}
            Eventos:
            <br/>
            {events?.map((evento) => {
                return(
                    <>
                        Titulo: {evento.titulo}
                        <br/>
                        Descripcion: {evento.descripcion}
                        <br/>
                        Hora inicio: {evento.horaInicio}
                        <br/>
                        Hora final: {evento.horaFinal}
                        <br/>
                        Fecha: {evento.fecha}
                        <br/>
                        Invitados: {evento.invitados}
                        <br/>
                        Id: {evento._id}
                        <br/>
                        <button onClick={(e) => {borrar(evento._id)}}>Eliminar</button>
                        <br/><br/><br/><br/>
                    </>
                )
            })}
        </>
      )
}

export default Page;