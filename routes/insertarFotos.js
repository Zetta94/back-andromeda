const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Habilita el middleware express-fileupload
router.use(fileUpload());

// Ruta para manejar la subida de imágenes
router.post('/', (req, res) => {
  try {
    const { files } = req;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send('No se han subido imágenes.');
    }

    // Nombre de la carpeta donde se almacenarán las imágenes
    const carpetaDestino = 'imagenes';

    // Asegúrate de que la carpeta de destino exista, si no, créala
    const rutaCarpetaDestino = path.join(__dirname, carpetaDestino);
    if (!fs.existsSync(rutaCarpetaDestino)) {
      fs.mkdirSync(rutaCarpetaDestino);
    }

    // Itera a través de las imágenes subidas y guárdalas en la carpeta de destino
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const imagen = files[key];
        const nombreArchivo = `${carpetaDestino}/${imagen.name}`;

        imagen.mv(nombreArchivo, (err) => {
          if (err) {
            return res.status(500).send(`Error al subir la imagen ${imagen.name}: ${err}`);
          }
        });
      }
    }

    res.send('Imágenes subidas con éxito.');
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    res.status(500).send('Error al subir imágenes.');
  }
});

module.exports = router;
