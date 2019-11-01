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
    res.status(500).send({
      request: `${logString}`,
      message: `Error retrieving actions from database`
    });
  }
});

router.get('/:id', validateActionID, async (req, res) => {
  const action = req.action;
  res.status(200).send(action);
});

async function validateActionID(req, res, next) {
  const { id } = req.params;
  try {
    const action = await actionModel.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).send({ message: `Action with id ${id} not found` });
    }
  } catch (error) {
    console.log('error retrieving action', error);
    res.status(500).send({
      message: `Error retrieving action with id: ${id} from the database`
    });
  }
}

module.exports = router;
