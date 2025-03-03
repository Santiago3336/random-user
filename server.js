import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// endpoint
app.get("/api/users", async (req, res) => {
    try {
        const response = await fetch("https://randomuser.me/api/?results=25");
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// bloque de inicio del servidor
app.get("/", (req, res) => {
    res.send("¡El servidor funciona a la perfeccion!")
})
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
