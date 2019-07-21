import mongoose, { Connection } from "mongoose";
import { TodoDocument, TodoSchema } from "../todo/todo.model";

export class MongoDb {
  private static connection: Connection;
  private static readonly uri = "mongodb://localhost:27017/todo";

  static async connect(uri = MongoDb.uri) {
    await mongoose.connect(uri, {
      useNewUrlParser: true
    });
    MongoDb.connection = mongoose.connection;
    return MongoDb.connection;
  }

  static getDBModels(connection = MongoDb.connection) {
    return {
      todo: connection.model<TodoDocument>("Todo", TodoSchema)
    };
  }
}
