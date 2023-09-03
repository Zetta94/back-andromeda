const fs = require('fs-extra');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const puerto = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/copiar-carpeta', (req, res) => {
  const nuevaCarpeta = req.body.nombreCarpeta || 'carpetaNuevaManu';

  const carpetaOriginal = 'C:/Workspace/automatizador/tatitos';
  const rutaNuevaCarpeta = path.join('C:/Workspace/automatizador/', nuevaCarpeta);

  fs.copy(carpetaOriginal, rutaNuevaCarpeta, err => {
    if (err) {
      res.status(500).send('Error al copiar la carpeta: ' + err);
    } else {
      res.send('Carpeta copiada exitosamente con el nombre: ' + nuevaCarpeta);
    }
  });
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
