import express from 'express';
import cors from 'cors';
import connectionDB  from './db/connection.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, ()=>{
    connectionDB();
    console.log("server is running on 5000");
    
})