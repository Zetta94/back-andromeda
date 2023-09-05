const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Andromeda automatizacion');
});

module.exports = router;
