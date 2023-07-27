import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

 type Evento = {
    evento:
    {
        titulo: string,
        descripcion: string,
        horaInicio: number,
        horaFinal: number,
        fecha: Date,
        invitados: string[],
        id: string
    }
}


export const getServerSideProps: GetServerSideProps= async(context) => {

    const {id} = context.query;
    const data = await fetch(`http://back:8080/event/${id}`);
    const evento: Event = await data.json();
    console.log(evento);
    

    return {
        props: {
            evento  
        }
    }

}

const Page :NextPage<Evento>= ({evento}) => {
    return(
        <>
            <Link href="/">Volver a menu</Link>
            <br/>
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
            <br/><br/><br/><br/><br/>
            

        </>
    )
}

export default Page;