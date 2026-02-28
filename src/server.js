import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import cors from "cors";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crea una instancia de la aplicación Express
const app = express();

// Middleware
// Configura CORS para permitir solicitudes desde el frontend
app.use(
    cors({
        origin: ["http://localhost:5173", "https://resilient-macaron-ab4d4d.netlify.app"], // Reemplaza con la URL de tu frontend si es diferente
    }),
);

app.use(express.json());
app.use("/api/notes", notesRoutes); // Rutas para las notas

const PORT = process.env.PORT || 3001;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor levantado en puerto http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
