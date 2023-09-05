import express from 'express';
import {PORT} from './config.js';
import connectToMongo from './db.js';
import router from './routes/Book.js'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/book', router)

app.get('/', (req,res)=>{
    // console.log(req);
    return res.status(234).send("Welcome");
})

app.listen(PORT, ()=>{
    console.log(`App is listining at port :  ${PORT}`)
    connectToMongo();
});