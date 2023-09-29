const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
//Rutas
const copiarCarpetaRouter = require('./routes/copiarCarpeta');
const uploadRouter = require('./routes/insertarFotos');
const editarConfigRouter = require('./routes/editarConfig');
const editarConfigIDRouter = require('./routes/editarConfigID');
const nuevaRuta = require('./routes/nuevaRuta');
//const expoRouter = require ('./routes/expo');
const firebase = require ('./routes/firebaseRoute');
const expoPuppRouter = require ('./routes/expopupp');

const app = express();
const puerto = 3001;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('', nuevaRuta);
app.use('/copiar-carpeta', copiarCarpetaRouter);
app.use('/insertar-foto', uploadRouter);
app.use('/editar-configjson', editarConfigRouter);
app.use('/editar-configID',editarConfigIDRouter);
//app.use('/expo',expoRouter);
app.use('/firebase', firebase);
app.use('/crearProyecto',expoPuppRouter);
app.use('/')


app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
