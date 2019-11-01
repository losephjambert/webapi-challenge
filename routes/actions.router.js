const express = require('express');
const actionModel = require('../data/helpers/actionModel.js');
const projectMiddleware = require('../middleware/project.middleware.js');

const router = express.Router();
router.use(express.json());

const { validateProject, validateProjectID } = projectMiddleware;

router.get('/', async (req, res) => {
  try {
    const actions = await actionModel.get();
    res.status(200).send(actions);
  } catch (error) {
    const logString = `${req.method} ${req.originalUrl}`;
    console.log(`${logString} error`, error);
    res
      .status(500)
      .send({
        request: `${logString}`,
        message: `Error retrieving actions from database`
      });
  }
});

module.exports = router;
