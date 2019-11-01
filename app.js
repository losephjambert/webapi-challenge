const express = require('express');
const helmet = require('helmet');

// this is where I'll import my routers
const projectsRouter = require('./routes/projects.router.js');
const actionsRouter = require('./routes/actions.router.js');

const app = express();
app.use(helmet());

// this is where I'll set up my routers
app.use('/api/projects', projectsRouter);

app.use('/api/actions', actionsRouter);

app.get('/', (req, res) => {
  res.send(`
    <h1>Web Node API Challenge I</h1>
    <h2>Joseph Lambert -- WEB23</h2>
  `);
});

module.exports = app;
