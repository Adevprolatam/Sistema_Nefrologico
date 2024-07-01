const mongoose = require("mongoose");

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    if (!DB_URI) {
        console.error("DB_URI no está definido en las variables de entorno");
        return;
    }

    mongoose
        .connect(DB_URI)
        .then(() => {
            console.log("Conexión exitosa a la base de datos");
        })
        .catch((err) => {
            console.error("Error al conectarse a la base de datos:", err.message);
            console.error("Detalles del error:", err);
        });
}

module.exports = dbConnect;
