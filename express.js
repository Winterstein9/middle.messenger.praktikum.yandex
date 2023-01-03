const express = require('express');

const app = express();
const PORT = 3000;

const path="/index/x/"

app.use(express.static(__dirname + path ));
app.use('*', (req, res) => {
    res.sendFile("index.html", { root: __dirname + path});
})

app.listen(PORT, () => {
    console.log(`Мой порт: ${PORT}!`);
});
