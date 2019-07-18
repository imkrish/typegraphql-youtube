import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { TodoResolver } from "./todo/todo.resolver";
import { MongoDb } from "./db/mongo.db";
import { Container } from "typedi";

const PORT = 4000;

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolver],
    emitSchemaFile: true,
    container: Container
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  await MongoDb.connect();

  await server.listen(PORT);

  console.log("Server is started on port", PORT);
};

bootstrap();
