const puppeteer = require('puppeteer');
const express = require('express');
require('dotenv').config();
const router = express.Router();

const username = "agustind";
const password = "natan222";

router.post('/', async (req, res) => {
  const { projectName,slug } = req.body;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Iniciar sesión en Expo.dev
    await page.goto('https://expo.dev/login');
    await page.type('input[name="usernameOrEmail"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Crear un nuevo proyecto
    await page.goto('https://expo.dev/accounts/agustind/projects');
    await page.click('button[data-testid="new-project-button"]');
    await page.type('input[id="displayName"]', projectName);
    const slugInput = await page.$('input[id="slug"]');
    await slugInput.click({ clickCount: 3 }); 
    await slugInput.press('Backspace'); 
    await page.type('input[id="slug"]', slug);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Cerrar el navegador
    await browser.close();

    res.status(200).json({ message: "Proyecto creado correctamente" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Hubo un error al crear el proyecto.' });
  }
});

module.exports = router;
