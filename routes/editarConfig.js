const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

// Ruta para editar el archivo Config.json
router.put('/', async (req, res) => {
  try {
    const { nombreCarpeta,nombre, slug, expoProjectId } = req.body;

    // Ruta relativa al archivo Config.json (solo el nombre de la carpeta)
    const rutaRelativa = path.join(nombreCarpeta, 'Config.json');

    // Ruta completa al archivo Config.json basada en la ubicación actual del archivo
    const rutaArchivo = path.join('C:/Workspace/automatizador', rutaRelativa); // Ajusta la ruta según la ubicación real de tu archivo

    // Lee el contenido actual del archivo
    const contenidoActual = await fs.readJson(rutaArchivo);

    // Actualiza las propiedades con los nuevos valores
    contenidoActual.nombre = nombre;
    contenidoActual.slug = slug;
    contenidoActual.expoProjectId = expoProjectId;

    // Escribe el contenido actualizado de vuelta al archivo
    await fs.writeJson(rutaArchivo, contenidoActual, { spaces: 2 });

    res.send('Archivo Config.json actualizado con éxito');
  } catch (error) {
    console.error('Error al editar el archivo Config.json:', error);
    res.status(500).send('Error al editar el archivo Config.json.');
  }
});

module.exports = router;
