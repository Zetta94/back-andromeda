const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

//Ruta para guardar crear nueva
router.post('/', (req, res) => {
  const nuevaCarpeta = req.body.appName|| 'carpetaNuevaManu';

  const carpetaOriginal = 'C:/Workspace/automatizador/tatitos';
  const rutaNuevaCarpeta = path.join('C:/Workspace/automatizador/', nuevaCarpeta);

  fs.copy(carpetaOriginal, rutaNuevaCarpeta, (err) => {
    if (err) {
      res.status(500).send('Error al copiar la carpeta: ' + err);
    } else {
      res.send('Carpeta copiada exitosamente con el nombre: ' + nuevaCarpeta);
    }
  });
});

module.exports = router;
