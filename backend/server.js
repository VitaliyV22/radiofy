const express = require("express");
const cors = require("cors");
const radioRoutes = require("./Routes/radioRoutes")

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

app.use("/api", radioRoutes)


app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
