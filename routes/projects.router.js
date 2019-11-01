const router = require('express').Router();
const projectModel = require('../data/helpers/projectModel.js');

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

module.exports = router;
