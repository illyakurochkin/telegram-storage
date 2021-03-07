const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer')
const telegram = require('./telegram');

const upload = multer({dest: 'uploads/'})

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

telegram.initialize();

app.get('/test', async (req, res) => {
  console.log('req.body', req.body);
  res.send({status: 'success', message: 'hello world'});
});

app.post('/storage', upload.single('photo'),
  async (req, res) => {
    const fileId = await telegram.writePhoto(req.body.chatId, req.file);
    const link = await telegram.readPhoto(fileId);
    res.status(201).send(link);
  });

app.get('/storage/:id', async (req, res) => {
  const link = await telegram.readPhoto(req.params.id);
  res.status(200).send(link);
});


module.exports = app;

