const express = require('express');
const app = express();
const ejs = require('ejs');
const session = require('express-session');

const bodyParser = require('body-parser');
const rootDir = require('./util/path');
const path = require('path');

const database = require('./database/database');
const relations = require('./database/relations');

const masterRouter = require('./routers/masterRouter');

const PORT = process.env.PORT || 3000;

app.set('view-engine', ejs)
app.set('views', 'views');

app.use(
  session({
    secret: "yomsSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },    
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(rootDir, "public")));

app.use(masterRouter);

database.sync().then(
  (result) => {
    console.log(result);
    console.log("DB Connected.");
    app.listen(PORT);
  },
  (err) => {
    console.log(err);
    console.log("DB Failed");
  }
);