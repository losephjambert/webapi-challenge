const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({
    message: `Hello from the actions router`,
    requestMethod: req.method,
    originalUrl: req.originalUrl
  });
});

module.exports = router;
