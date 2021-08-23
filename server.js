const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));

  // server.get("/artists/:id", (req, res) => {
  //   console.log('profile page render', req.params.id)
  //   return app.render(req, res, "/client/artistProfile", { id: req.params.id })
  // })

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3001');
  });
});
