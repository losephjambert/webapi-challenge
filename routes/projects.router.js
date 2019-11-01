const express = require('express');
const projectModel = require('../data/helpers/projectModel.js');
const projectMiddleware = require('../middleware/project.middleware.js');

const router = express.Router();
router.use(express.json());

const { validateProject, validateProjectID } = projectMiddleware;

router.get('/', async (req, res) => {
  try {
    const projects = await projectModel.get();
    res.status(200).send(projects);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `There was an error retrieving projects from the database`
    });
  }
});

router.get('/:id', validateProjectID, (req, res) => {
  const project = req.project;
  res.status(200).send(project);
});

router.post('/', validateProject, async (req, res) => {
  const project = req.project;
  try {
    const newProject = await projectModel.insert(project);
    console.log(newProject);
    res.status(201).send(newProject);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error saving project to database` });
  }
});

router.put('/:id', validateProjectID, validateProject, async (req, res) => {
  const { id } = req.params;
  const changes = req.project;
  console.log(changes);
  try {
    const updatedProject = await projectModel.update(id, changes);
    res.status(202).send(updatedProject);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error updating project with id: ${id}` });
  }
});

router.delete('/:id', validateProjectID, async (req, res) => {
  const { id } = req.params;
  const project = req.project;
  try {
    await projectModel.remove(id);
    res.status(200).send(project);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error deleting project ${id} from the database` });
  }
});

module.exports = router;
