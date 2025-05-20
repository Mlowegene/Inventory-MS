import express from 'express';
import cors from 'cors';
import connectionDB  from './db/connection.js';

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, ()=>{
    connectionDB();
    console.log("server is running on 5000");
    
})