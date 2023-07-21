import Link from "next/link";
import { useState } from "react"

export type Event = {
    titulo: string,
    descripcion: string,
    horaInicio: number,
    horaFinal: number,
    fecha: Date,
    invitados: string[],
    _id: string
}

const Page = () => {
    const [titulo, setTitulo] = useState<string>("");
    const [descripcion,setDescripcion] = useState<string>("");
    const [horaInicio, setStartHour] = useState<number>(0);
    const [horaFinal, setEndHour] = useState<number>(0);
    const [fecha, setDate] = useState<Date>(new Date());
    const [invitados,setInvitados] = useState<string>("");
    const  [error, setError] = useState<boolean>(false);


    async function postEvent(){
        try{
       const arrayInvitados = invitados
          .split(",")
          .map((invitado) => invitado.trim());
        const evento:  Partial<Event> = {
          titulo:titulo,
          descripcion:descripcion,
          fecha: fecha,
          horaFinal: horaFinal,
          horaInicio: horaInicio,
          invitados: arrayInvitados
        }
        console.log(evento);
        const response = await fetch(`http://localhost:8080/addEvent`, {
          method: 'POST',
          body: JSON.stringify(evento),
        });
        if(response.ok){
          setError(false);  
        }else{
          setError(true);
          setTitulo("");
          setStartHour(0);
          setDate(new Date());
          setDescripcion("");
          setEndHour(0);
          setInvitados("");
        }

        setTitulo("");
        setStartHour(0);
        setDate(new Date());
        setDescripcion("");
        setEndHour(0);
        setInvitados("");
      }catch(e){
        setError(true);
        setTitulo("");
        setStartHour(0);
        setDate(new Date());
        setDescripcion("");
        setEndHour(0);
        setInvitados("");
      }
    }



    return(
        <>
             <Link href="/">Volver a menu</Link>
             <br/>
            {error && <p>Error</p>}
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
          <br/>
          <button onClick={async() => {
            await postEvent()
          }}>Añadir</button>

        </>
    )

}


export default Page;