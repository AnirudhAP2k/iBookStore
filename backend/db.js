import mongoose from "mongoose";
import { mongoURI } from './config.js';

 const connectToMongo = () => {
    mongoose
    .connect(mongoURI)
    .then(()=>{
        console.log("Connected to Mongo");
    })
    .catch((error)=>{
        console.log(error);
    })
}
export default connectToMongo;
