const express = require('express');
const path = require('path');
const { readFile, writeFile } = require('fs');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('/api/notes',  (req, res) => {
    readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
    });
  });

  app.post('/api/notes',  (req, res) => {
    readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    //use req.body, 
    let newNote = req.body;
    
    // use JSON.parse
    let existingDb = JSON.parse(data);
    
    //push method
    existingDb.push(newNote);
    
    //JSON.stringfy, 
    //write a file,
    writeFile('./db/db.json', JSON.stringify(existingDb), err => {
        if (err) throw err;
       return res.status(200).json(newNote);
    })

    });
  });  


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);