import express from "express";
import Note from "../models/noteMode.js";

// Creando una instancia del router de Express
const router = express.Router();

// INFO: --- GET --- Obtener todas las notas
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        if (!notes) return res.status(404).json({ error: "Notas no encontradas" });

        res.status(200).json(notes);
    } catch (error) {
        console.error(`Error al obtener las notas `, error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// INFO: --- GET --- Obtener una nota por ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const noteId = await Note.findById(id);

        if (!noteId) return res.status(404).json({ error: "Nota no encontrada" });
        res.status(200).json(noteId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// INFO: --- POST --- Crear una nota
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).json({ error: "title y description son obligatorios" });

        const note = new Note({ title, description });

        const saveNote = await note.save();

        res.status(201).json({ message: "Note crerada correctamente", note: saveNote });
    } catch (error) {
        console.error(`Error al crear la nota`, error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// INFO: --- DELETE --- Eliminar una nota
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const noteId = await Note.findByIdAndDelete(id);

        if (!noteId) return res.status(404).json({ error: "nota no encontrada" });
        res.status(200).json({ message: "Nota eliminada correctamente", note: noteId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// INFO: --- PUT --- Editar una nota
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const noteActualizada = await Note.findByIdAndUpdate(id, req.body, { returnDocument: "after" });

        if (!noteActualizada) return res.status(404).json({ error: "Nota no encontrada" });
        res.status(200).json({ message: "Nota actualizada correctamente", note: noteActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;

// ==========================================
// * Método       Ruta        Código éxito
// ==========================================
/*
    GET         /notes          200   
    GET         /notes/:id      200
    POST        /notes          201
    PUT         /notes/:id      200 o 204
    PATCH       /notes/:id      200
    DELETE      /notes/:id      204 o 200 (si el frontend quiere ver lo eliminado)
*/

// ==========================================
// * 📌 CRUD - NOTAS (Status Codes utilizados)
// ==========================================

/* 
INFO: --- GET /notes ---
--------------------------------------------
200 → Devuelve todas las notas correctamente
500 → Error interno del servidor
*/

/*
INFO: --- GET /notes/:id ---
--------------------------------------------
200 → Nota encontrada
404 → Nota no encontrada
500 → Error interno del servidor
*/

/*
INFO: --- POST /notes ---
--------------------------------------------
201 → Nota creada correctamente
400 → Datos inválidos o faltantes
500 → Error interno del servidor
*/

/*
INFO: --- PUT /notes/:id ---
--------------------------------------------
200 → Nota actualizada correctamente (reemplazo completo)
204 → Actualizado sin devolver contenido (opcional)
400 → Datos inválidos
404 → Nota no encontrada
500 → Error interno del servidor
*/

/*
INFO: --- PATCH /notes/:id ---
--------------------------------------------
200 → Nota actualizada parcialmente
400 → Datos inválidos
404 → Nota no encontrada
500 → Error interno del servidor
*/

/*
INFO: --- DELETE /notes/:id ---
--------------------------------------------
204 → Nota eliminada correctamente (sin contenido)
404 → Nota no encontrada
500 → Error interno del servidor
*/
