import { useEffect, useState } from "react";
import { Event } from "../anadir";
import Link from "next/link";



const Page = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const [titulo, setTitulo] = useState<string>("");
    const [descripcion,setDescripcion] = useState<string>("");
    const [horaInicio, setStartHour] = useState<number>(0);
    const [horaFinal, setEndHour] = useState<number>(0);
    const [fecha, setDate] = useState<Date>(new Date());
    const [invitados,setInvitados] = useState<string>("");
    const  [error, setError] = useState<boolean>(false);

    async function updateEvent(id:string) {
        try{
            console.log(id);
            const arrayInvitados = invitados
                .split(",")
                .map((invitado) => invitado.trim());
            const evento : Partial<Event> & {id: string, fin:number, inicio:number}= {
                titulo,
                descripcion,
                id: id,
                fecha,
                fin: horaFinal,
                inicio: horaInicio,
                invitados: arrayInvitados
            }
            console.log(evento);
            await fetch(`http://localhost:8080/updateEvent`, {
                method: 'PUT',
                body: JSON.stringify(evento),
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
            <br/>
            Poner datos de evento para actualizar:
            <br/>
            Titulo: <input type="text" placeholder="Titulo" onChange={(e) => {setTitulo(e.target.value)}}/>
            <br/>
            Descripcion: <input type="text" placeholder="Descripcion" onChange={(e) => {setDescripcion(e.target.value)}}/>
            <br/>
            StartHour: <input type="number" placeholder="Start Hour" onChange={(e) => {setStartHour(parseInt(e.target.value))}}/>
            <br/>
            EndHour: <input type="number" placeholder="End Hour" onChange={(e) => {setEndHour(parseInt(e.target.value))}}/>
            <br/>
            Date: <input type="date" onChange={(e) => {setDate(new Date(e.target.value))}}/>
            <br/>
            <label>
             Invitados:
            <input
            type="text"
            value={invitados}
            onChange={(e) => setInvitados(e.target.value)}
            placeholder="Introduce los invitados, separados por comas"
            />
          </label>
          <br/><br/><br/>
            Eventos para actualizar:
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
                        <button onClick={async() => {await updateEvent(evento._id)}}>Actualizar</button>
                        <br/><br/><br/><br/>
                    </>
                )
            })}
        </>
      )
}

export default Page;