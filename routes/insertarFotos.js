const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Habilita el middleware express-fileupload
router.use(fileUpload());

// Ruta para manejar la subida de imágenes
router.post('/', async (req, res) => {
  try {
    const { files } = req;
    const { nombreCarpeta } = req.body; 

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send('No se han subido imágenes.');
    }

    // Asegúrate de que la carpeta de destino exista, si no, créala
    const rutaCarpetaDestino = path.join("C:/Workspace/andromeda-app/apps/", nombreCarpeta, 'icons');
    if (!fs.existsSync(rutaCarpetaDestino)) {
      fs.mkdirSync(rutaCarpetaDestino, { recursive: true });
    }

    // Array para almacenar errores
    const errores = [];

    // Itera a través de las imágenes subidas y guárdalas en la carpeta de destino
    for (const key in files) {
      if (key in files) { // Verifica si la propiedad (clave) existe en files
        const imagen = files[key];
        const nombreArchivo = path.join(rutaCarpetaDestino, imagen.name); // Ruta ajustada

        try {
          await imagen.mv(nombreArchivo); // Intenta mover la imagen

          // Si no hubo errores al mover la imagen, sigue con la próxima iteración
        } catch (error) {
          // Si ocurrió un error al mover la imagen, agrégalo al array de errores
          errores.push(`Error al subir la imagen ${imagen.name}: ${error.message}`);
        }
      }
    }

    // Si hay errores, envía una respuesta con los errores
    if (errores.length > 0) {
      return res.status(500).json({ errors: errores });
    }

    res.send('Imágenes subidas con éxito.');
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    res.status(500).send('Error al subir imágenes.');
  }
});

module.exports = router;
