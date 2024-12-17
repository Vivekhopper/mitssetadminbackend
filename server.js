import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './src/router/admin.routes.js';
import connectToMongoDB from './src/db/connectToMongoDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: ['https://mitset.netlify.app', 'http://localhost:8000', 'http://localhost:5173','http://localhost:5174','https://mitsset-admin-frontend.vercel.app/'], // Specify the allowed origins
    credentials: true, // Enable sending cookies
}));
app.use(express.json()); 
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/admin',router);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running in port ${PORT}`);
})
