import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/User.route.js' 
import genreRoutes from './routes/Genre.route.js'
import movieRoutes from './routes/movies.route.js';
import uploadRoutes from './routes/upload.route.js';
const app=express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


dotenv.config();


//routes
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/genre',genreRoutes)
app.use('/api/v1/movies',movieRoutes)
app.use('/api/v1/upload',uploadRoutes)

const __dirname = path.resolve();  // this is used to get the current directory
app.use('/uploads',express.static(path.join(__dirname,'uploads')));  // this is used to serve the static files


const PORT=process.env.PORT || 5000;

connectDB();




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})




