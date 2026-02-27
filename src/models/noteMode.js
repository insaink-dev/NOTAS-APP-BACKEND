import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }, // Agrega campos de fecha de creación y actualización automáticamente
);

const Note = new mongoose.model("Note", noteSchema);

export default Note;
