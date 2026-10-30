const express = require('express');
const fs = require('fs');
const app = express();
const port = 8008;

app.use(express.json());

app.use(express.static('styles'));
app.use(express.static('fonts'));
app.use(express.static('veganassets'));
app.use(express.static('meowassets'))
app.use(express.static('stimassets'))

app.get('/', (req, res) => {
    var content = fs.readFileSync('index.html', 'utf8');
    res.send(content);
})

app.get('/FMSVL', (req, res) => {
    var content = fs.readFileSync('sample_blogpost.html', 'utf8');
    res.send(content);
})

app.get('/FUNZONE', (req, res) => {
    var content = fs.readFileSync('kitty.html', 'utf8');
    res.send(content);
})



app.listen(port, () =>  
  console.log(`Hosting at http://localhost:${port}`))
