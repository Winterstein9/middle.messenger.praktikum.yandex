const express = require('express');
const { send } = require('process');

const app = express();
const PORT = 3000;



app.use(express.static(__dirname + '/dist/' ));
app.use('*', (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/dist/"});
})

app.listen(PORT, () => {
    console.log(`Мой порт: ${PORT}!`);
});