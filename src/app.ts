import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';


import Debug from 'debug';

import apiRoutes from './routes/api';
import path from 'path';


const debug = Debug('express');
const CLIENT_DIR = process.env.NODE_ENV === 'production' ? '../client-build' : '../../search-app/build';
const app = express();


//app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  
  next();
});


app.disable('x-powered-by');

app.use('/api', apiRoutes);
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.redirect('http://localhost:3000');
  });
}
else {
  app.use(express.static(path.join(__dirname, CLIENT_DIR)));

  app.get('/', function (req, res) {
    console.log('dirname is ' + __dirname + ', clientdir is ' + CLIENT_DIR);
    res.sendFile(path.join(__dirname, CLIENT_DIR, 'index.html'));
  });

  app.use(function (req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'GET') {
      next();
      return;
    }

    if (req.path.lastIndexOf('.') > req.path.lastIndexOf('/')) {
      next();
      return;
    }

    console.log('returning index', req.path);
    res.sendFile(path.join(__dirname, CLIENT_DIR, 'index.html'));
  });
}
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`App listening on port ${port}!`));