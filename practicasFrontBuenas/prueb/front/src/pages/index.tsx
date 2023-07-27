
import Link from 'next/link'
import { useState } from 'react';

export default function Home() {

  const [id,setId] = useState<string>("");
  return (
    <>
      Que desea hacer?
      <br/>
      <Link href="/anadir"> Añadir evento</Link>
      <br/>
      Ver evento en concreto: <input type="text" placeholder="id" onChange={(e) => {setId(e.target.value)}}/> <Link href={`/veruno/${id}`}><button>Ir con este id</button></Link>
      <br/>
      <Link href="/ver">Ver todos los eventos</Link>
      <br/>
      <Link href="/borrar">Borrar</Link>
      <br/>
      <Link href="/actualizar">Actualizar</Link>
      <br/>
    </>
  )
}
