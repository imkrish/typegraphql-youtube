import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import {TodoResolver} from "./todo/todo.resolver";
import mongoose from 'mongoose';
import {TodoModel} from "./todo/todo.model";

const PORT = 4000;

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolver],
    emitSchemaFile: true
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  await mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true });

  await server.listen(PORT);

  await TodoModel.create({
    todo: 'Take a shower',
    completed: true
  });

  console.log("Server is started on port", PORT);
};

bootstrap();
