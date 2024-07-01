require('dotenv').config();
const cors = require('cors');
const express = require("express");
const {connectDB} = require("./config/config");

const app =  express();
const PORT =  process.env.PORT;


app.use(cors());
app.use(express.json());
app.use("/api", require('./routes/index'));


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
