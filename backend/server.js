const express = require("express");
const app = express();
const cors = require("cors");
const radioData = require("./data/radioData.json");
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/api/radioData', (req, res) => {
    res.json(radioData);
});

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
