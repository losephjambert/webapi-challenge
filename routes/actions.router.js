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

router.post('/', validateProjectID, async (req, res) => {
  const action = req.body;

  try {
    const newAction = await actionModel.insert(action);
    res.status(201).send(newAction);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Could not save action to database` });
  }
});

router.put('/:id', validateProjectID, validateActionID, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const updateAction = await actionModel.update(id, changes);
    res.status(202).send(updateAction);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error updating action ${id}` });
  }
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
