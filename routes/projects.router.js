const express = require('express');
const projectModel = require('../data/helpers/projectModel.js');

const router = express.Router();
router.use(express.json());

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

function validateProject(req, res, next) {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: `Missing project data` });
  } else {
    const { name, description, completed } = req.body;
    if (!name) {
      res.status(400).send({ message: `Project missing name field` });
    } else if (!description) {
      res.status(400).send({ message: `Project missing description field` });
    } else if (typeof completed === 'undefined') {
      res.status(400).send({ message: `Project missing completed field` });
    } else {
      req.project = { name, description, completed };
      next();
    }
  }
}

module.exports = router;
