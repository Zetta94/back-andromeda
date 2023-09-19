const express = require('express');
const { execSync } = require('child_process');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

router.post('/', async (req, res) => {
  const proyectoNombre = req.body.nombre;

  if (!proyectoNombre) {
    return res.status(400).json({ error: 'Se requiere un nombre de proyecto en el cuerpo de la solicitud.' });
  }

  const expoUsername = 'usuario'; 
  const expoPassword = 'contraseña'; 

  // Autenticación en Expo
  try {
    const authResponse = await axios.post('https://expo.io/--/api/v2/auth/login', {
      username: expoUsername,
      password: expoPassword,
    });
    const authToken = authResponse.data.data.token;

    // Verificar si el proyecto ya existe
    const proyectoDirectorio = path.join(__dirname, proyectoNombre);

    if (!fs.existsSync(proyectoDirectorio)) {
      try {
        console.log(`Creando el proyecto: ${proyectoNombre}`);
        execSync(`expo init ${proyectoNombre}`, { stdio: 'inherit' });
        console.log(`Proyecto creado: ${proyectoNombre}`);

        // Obtener projectId después de crear el proyecto
        const { data } = await axios.get(`https://expo.io/--/api/v2/project/${proyectoNombre}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const projectId = data.projectId;

        
        res.status(201).json({ projectId });
      } catch (error) {
        console.error(`Error al crear el proyecto: ${error.message}`);
        res.status(500).json({ error: 'Error al crear el proyecto.' });
      }
    } else {
      console.log(`El proyecto ${proyectoNombre} ya existe.`);
      res.status(200).json({ message: `El proyecto ${proyectoNombre} ya existe.` });
    }
  } catch (error) {
    console.error(`Error al autenticarse en Expo: ${error.message}`);
    res.status(500).json({ error: 'Error al autenticarse en Expo.' });
  }
});

module.exports = router;
