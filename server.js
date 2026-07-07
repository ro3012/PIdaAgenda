require("dotenv").config();

const app = require("./src/app");
const port = process.env.PORT
const base = process.env.BASE

app.listen(port, () => {
    console.log(`Servidor rodando em ${base}`);
});