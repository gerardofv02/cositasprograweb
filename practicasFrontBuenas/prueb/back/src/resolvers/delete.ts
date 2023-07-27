import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { ObjectId } from 'mongo'
import { eventosCollection, EventosSchema } from "../db.ts";


type RemoveEventContext = RouterContext<
  "/deleteEvent/:id",
  {
    id: string;
  } & Record<string | number, string | undefined>,
  Record<string, any>
>;

export const removeEvent = async (context: RemoveEventContext) => {
    try{
        const id: string = context.params.id;
        if(!id){
            context.response.status = 400;
            context.response.body = "Falta el id";
            return;
        }
        const evento: EventosSchema = await eventosCollection.findOne({_id: new ObjectId(id)});

        if(!evento){
            context.response.status = 404;
            context.response.body = "No existe el evento";
            return;
        }

        await eventosCollection.deleteOne({_id: new ObjectId(id)});
        context.response.status = 200;
        context.response.body = "Evento eliminado";

    }catch(error){
        console.log(error);
        context.response.status = 500;
    }
}