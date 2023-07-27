import { GetServerSideProps, NextPage } from "next";
import { Event } from "../anadir";
import Link from "next/link";

type Events = {
    events: Event[]
}


export const getServerSideProps: GetServerSideProps = async() => {


    const data = await fetch("http://back:8080/events");

    const events: Events = await data.json();
    console.log(events);
    return {
        props: {
            events
        }
    }

}

const Page: NextPage<Events> = ({events}) => {
    return(
        <>
            <Link href="/">Volver a menu</Link>
            <br/>
            {events!.map((evento) => {
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
                        <br/><br/><br/><br/><br/>

                    </>
                )
            })}
        </>
    )
}

export default Page;