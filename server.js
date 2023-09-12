const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el módulo cors
const copiarCarpetaRouter = require('./routes/copiarCarpeta');
const uploadRouter = require('./routes/insertarFotos');
const editarConfigRouter = require('./routes/editarConfig');
const nuevaRuta = require('./routes/nuevaRuta');

const app = express();
const puerto = 3001;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilita CORS para todas las rutas
app.use(cors());

app.use('', nuevaRuta);
app.use('/copiar-carpeta', copiarCarpetaRouter);
app.use('/insertar-foto', uploadRouter);
app.use('/editar-config', editarConfigRouter);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
