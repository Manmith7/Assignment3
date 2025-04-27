import mongoose from "mongoose";
import {DB_NAME} from './constants.js'
const DBConnection = async()=>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("MongoDB Error: ",error);
    }
}
export default DBConnection;