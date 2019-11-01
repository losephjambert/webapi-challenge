const projectModel = require('../data/helpers/projectModel.js');

module.exports = { validateProject, validateProjectID };

async function validateProjectID(req, res, next) {
  const { id } = req.params || req.body.project_id;
  try {
    const project = await projectModel.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).send({ message: `Project with id ${id} does not exist` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error retrieving project with id ${id} from database`
    });
  }
}

function validateProject(req, res, next) {
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
