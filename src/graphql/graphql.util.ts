import { buildSchema } from "type-graphql";
import { TodoResolver } from "../todo/todo.resolver";
import { Container } from "typedi";

export class GraphqlUtil {
  static getSchema() {
    return buildSchema({
      resolvers: [TodoResolver],
      emitSchemaFile: true,
      container: Container
    });
  }
}
