const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/index/x/`));

app.listen(PORT, () => {
    console.log(`Мой порт: ${PORT}!`);
});