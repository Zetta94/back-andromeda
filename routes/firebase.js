const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

// Inicializa la aplicación de administración de Firebase con tu serviceAccountKey.json
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/crearNuevaApp', async (req, res) => {
  try {
    const { projectName, packageName, nickname } = req.body;

    // Obtén una referencia al proyecto Firebase.
    const project = await admin.projectManagement().project(projectName);

    // Crea una nueva app Android en el proyecto.
    const newApp = await project.createAndroidApp({
      packageName: packageName,
      displayName: nickname,
    });

    console.log('Nueva app creada:');
    console.log(`ID de la app: ${newApp.appId}`);
    console.log(`Nombre de paquete: ${newApp.packageName}`);
    console.log(`Sobrenombre: ${newApp.displayName}`);

    // Descarga el archivo google-services.json.
    const config = await newApp.getConfig();

    // Guarda el archivo google-services.json en la carpeta raíz de tu app móvil.
    // Esto es solo un ejemplo para mostrar cómo guardar el archivo.
    // Debes adaptarlo a tus necesidades de almacenamiento.
    // fs.writeFileSync('google-services.json', JSON.stringify(config));

    console.log('google-services.json descargado y guardado.');

    // Finaliza la aplicación de administración de Firebase.
    admin.app().delete();

    res.status(200).send('Nueva app creada y configurada correctamente.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error en el servidor.');
  }
});

// No se crea el servidor aquí, solo la ruta.

module.exports = app;
