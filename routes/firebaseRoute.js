const express = require('express');
const router = express.Router();
const firebase = require('./../firebase');

router.post('/create-app', async (req, res) => {
    try {
       // Iniciar sesión en Firebase
       await firebase.auth().signInWithEmailAndPassword('YOUR_EMAIL', 'YOUR_PASSWORD');
   
       // Crear una nueva app en Firebase
       const appName = 'io.demux.slugescuela'; // Reemplaza esto con el nombre de paquete que deseas usar
       const displayName = 'Aleluya'; // Reemplaza esto con el sobrenombre que deseas usar
       const platform = 'ANDROID'; // Puedes cambiar esto a 'IOS' si deseas crear una app para iOS
   
       const newApp = await firebase.appDistribution().createApp(appName, displayName, platform);
   
       // Descargar el archivo google-services.json
       const response = await fetch(newApp.downloadUrl);
       const blob = await response.blob();
   
       // Guardar el archivo google-services.json en la carpeta raíz de tu proyecto Node.js
       const fs = require('fs');
       fs.writeFileSync('./google-services.json', blob);
   
       res.status(200).send('App creada y archivo google-services.json descargado');
    } catch (error) {
       console.error(error);
       res.status(500).send('Error al crear la app');
    }
   });

   module.exports = router;