import express from 'express'
import notesRoutes from './src/routes/notesRoutes.js'
import { connectDB } from './src/config/db.js';
import dotenv from "dotenv"
import rateLimiter from './src/middleware/rateLimiter.js';
import cors from 'cors'
import path from "path"

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

//middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}
app.use(express.json()); // this middleware will parse the JSON body i.e give access to req.body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res) =>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

connectDB().then(()=>{
    app.listen(port, () => {
        console.log("Server started on port 5001");
    })
})



