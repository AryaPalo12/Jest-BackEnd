require('dotenv').config();

const express = require('express');
const authRouter = require("./src/auth/auth.route");
const userRouter = require("./src/user/user.route");
const gameRouter = require("./src/game/game.route");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./src/config/swagger");
const cors = require('cors')
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.use(userRouter);
app.use(authRouter);
app.use(gameRouter);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
