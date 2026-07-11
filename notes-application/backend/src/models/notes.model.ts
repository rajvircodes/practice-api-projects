import mongoose, {Schema, Document} from "mongoose"

export interface INote extends Document {
    title:string,
    description:string,
    createdAt:string
    updatedAt:string
}



const notesSchema = new Schema<INote>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const Note = mongoose.model<INote>("Note", notesSchema)

export default Note