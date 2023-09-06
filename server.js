const express = require('express');
const bodyParser = require('body-parser');
const copiarCarpetaRouter = require('./routes/copiarCarpeta');
const uploadRouter = require('./routes/insertarFotos');
const editarConfigRouter = require('./routes/editarConfig');
const nuevaRuta = require('./routes/nuevaRuta');

const app = express();
const puerto = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('',nuevaRuta)
app.use('/copiar-carpeta', copiarCarpetaRouter);
app.use('/insertar-foto',uploadRouter);
app.use('/editar-config',editarConfigRouter);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
