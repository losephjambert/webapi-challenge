const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({
    message: `Hello from the projects router`,
    requestMethod: req.method,
    originalUrl: req.originalUrl
  });
});

module.exports = router;
