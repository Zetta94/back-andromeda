const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

// Ruta para editar el archivo Config.json
router.put('/', async (req, res) => {
  try {
    const { nombreCarpeta,nombre, slug, expoProjectId } = req.body;

    const rutaRelativa = path.join(nombreCarpeta, 'Config.json');

    const rutaArchivo = path.join('C:/Workspace/automatizador', rutaRelativa); 

    const contenidoActual = await fs.readJson(rutaArchivo);

    contenidoActual.nombre = nombre;
    contenidoActual.slug = slug;
    contenidoActual.expoProjectId = expoProjectId;

    await fs.writeJson(rutaArchivo, contenidoActual, { spaces: 2 });

    res.send('Archivo Config.json actualizado con éxito');
  } catch (error) {
    console.error('Error al editar el archivo Config.json:', error);
    res.status(500).send('Error al editar el archivo Config.json.');
  }
});

module.exports = router;