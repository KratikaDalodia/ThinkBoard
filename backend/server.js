import express from 'express'
import notesRoutes from './src/routes/notesRoutes.js'
import { connectDB } from './src/config/db.js';
import dotenv from "dotenv"
import rateLimiter from './src/middleware/rateLimiter.js';
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(cors())
app.use(express.json()); // this middleware will parse the JSON body i.e give access to req.body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);


connectDB().then(()=>{
    app.listen(port, () => {
        console.log("Server started on port 5001");
    })
})



