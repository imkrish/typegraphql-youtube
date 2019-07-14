import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import {BasicResolver} from "./basic.resolver";

const PORT = 4000;

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [BasicResolver],
    emitSchemaFile: true
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  await server.listen(PORT);

  console.log("Server is started on port", PORT);
};

bootstrap();
