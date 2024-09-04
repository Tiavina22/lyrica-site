const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const countFile = path.join(__dirname, 'download_count.txt');

if (!fs.existsSync(countFile)) {
    fs.writeFileSync(countFile, '0');
}

app.get('/api/downloads', (req, res) => {
    const count = fs.readFileSync(countFile, 'utf8');
    res.json({ count: parseInt(count, 10) });
});

app.post('/api/downloads', (req, res) => {
    let count = parseInt(fs.readFileSync(countFile, 'utf8'), 10);
    count++;
    fs.writeFileSync(countFile, count.toString());
    res.json({ count });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur sur http://localhost:${PORT}`);
});
