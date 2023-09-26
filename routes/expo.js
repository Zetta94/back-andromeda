const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
require('dotenv').config();

const userexpo = process.env.EXPO_USERNAME;
const passexpo = process.env.EXPO_PASSWORD;

router.post('/', (req, res) => {
  const { nombre, slug } = req.body;

  if (!nombre || !slug) {
    return res.status(400).send('No se recibieron nombre y slug correctamnente');
  }

  
  const loginCommand = `expo login -u ${userexpo} -p ${passexpo}`;

 
  const createProjectCommand = `expo init ${nombre} slug ${slug}`;

  // Ejecutar el comando de inicio de sesión
  exec(loginCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al iniciar sesión en Expo.dev: ${error.message}`);
      return res.status(500).send(`Error al iniciar sesión en Expo.dev: ${error.message}`);
    }
    
    // Ejecutar el comando para crear el proyecto después de iniciar sesión
    exec(createProjectCommand, (createError, createStdout, createStderr) => {
      if (createError) {
        console.error(`Error al crear el proyecto: ${createError.message}`);
        return res.status(500).send(`Error al crear el proyecto: ${createError.message}`);
      }

      // Extraer el projectId del resultado del comando de creación del proyecto
      const projectId = createStdout.match(/Project ID: (.*)/)[1];

      console.log(`Proyecto creado con éxito. Project ID: ${projectId}`);
      res.send(`Proyecto creado con éxito. Project ID: ${projectId}`);
    });
  });
});

module.exports = router;