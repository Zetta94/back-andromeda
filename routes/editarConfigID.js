const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

// Ruta para editar el archivo Config.js
router.put('/', async (req, res) => {
  try {
    const { nombreCarpeta, institucion_id, url_api } = req.body;

    const rutaRelativa = path.join(nombreCarpeta, 'Config.js');
    const rutaArchivo = path.join('C:/Workspace/automatizador', rutaRelativa);

    let contenidoActual = await fs.readFile(rutaArchivo, 'utf-8');
    
    contenidoActual = contenidoActual.replace(/institucion_id: .*,/, `institucion_id: ${institucion_id},`);
    contenidoActual = contenidoActual.replace(/url_api: '.*',/, `url_api: '${url_api}',`);

    await fs.writeFile(rutaArchivo, contenidoActual);

    res.send('Archivo Config.js actualizado con éxito');
  } catch (error) {
    console.error('Error al editar el archivo Config.js:', error);
    res.status(500).send('Error al editar el archivo Config.js.');
  }
});

module.exports = router;
