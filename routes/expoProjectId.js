const puppeteer = require('puppeteer');
const express = require('express');
require('dotenv').config();
const router = express.Router();

const username = "agustind";
const password = "natan222";

router.post('/', async (req, res) => {
  const { slug } = req.body;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Iniciar sesión en Expo.dev
    await page.goto('https://expo.dev/login');
    await page.type('input[name="usernameOrEmail"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Navegar a la página del proyecto creado
    await page.goto('https://expo.dev/accounts/agustind/projects/',slug);
    const projectId = await page.$eval('[data-testid="project-id"]', (element) => {
        return element.textContent});

    // Cerrar el navegador
    await browser.close();

    res.status(200).json({ projectId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'No se pudo extraer el ProjectId' });
  }
});

module.exports = router;
