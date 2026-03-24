import "dotenv/config";
import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { buildContext } from "./graphql/context.js";
import { schema } from "./graphql/schema.js";

const port = Number(process.env.PORT || 4000);
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();
const apollo = new ApolloServer({ schema });

await apollo.start();

app.use(
  "/graphql",
  cors({ origin: clientOrigin }),
  express.json(),
  expressMiddleware(apollo, {
    context: buildContext
  })
);

app.get("/", (_, res) => {
  res.json({
    name: "tourism-chatbot-server",
    graphql: "/graphql",
    auth: ["register", "login", "logout", "me"],
    orm: "prisma"
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
