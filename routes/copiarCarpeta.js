const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

//Ruta para guardar o crear nueva carpeta
router.post('/', (req, res) => {
  const nuevaCarpeta = req.body.appName|| 'CarpetaNueva';

  const carpetaOriginal = "C:/Workspace/automatizador/tatitos";
  const rutaNuevaCarpeta = path.resolve("C:/Workspace/andromeda-app/apps/", nuevaCarpeta);

  fs.copy(carpetaOriginal, rutaNuevaCarpeta, (err) => {
    if (err) {
      res.status(500).send('Error al copiar la carpeta: ' + err);
    } else {
      res.send('Carpeta copiada exitosamente con el nombre: ' + nuevaCarpeta);
    }
  });
});

module.exports = router;
