import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { MongoDb } from "./db/mongo.db";
import { GraphqlUtil } from "./graphql/graphql.util";

const PORT = 4000;

const bootstrap = async () => {
  const schema = await GraphqlUtil.getSchema();
  const server = new ApolloServer({
    schema,
    playground: true
  });

  await MongoDb.connect();

  await server.listen(PORT);

  console.log("Server is started on port", PORT);
};

bootstrap();
