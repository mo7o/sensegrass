const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

// import schemas
const Land = require("./models/Land");
const User = require("./models/User");

// Bring in graphql-express middlewares
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolver");

// create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => {
    console.log(err);
  });

// initialize application
const app = express();

// cors middleware
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

// Setup JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);

  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      console.log(currentUser);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// create graphiql application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// connect schemas to graphql
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: { Land, User, currentUser }
  }))
);

const PORT = 4444;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
