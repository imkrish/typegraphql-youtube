import mongoose, { Connection } from "mongoose";
import { TodoDocument, TodoSchema } from "../todo/todo.model";

export class MongoDb {
  private static connection: Connection;

  static async connect() {
    await mongoose.connect("mongodb://localhost:27017/todo", {
      useNewUrlParser: true
    });
    MongoDb.connection = mongoose.connection;
  }

  static getDBModels(connection = MongoDb.connection) {
    return {
      todo: connection.model<TodoDocument>("Todo", TodoSchema),
    };
  }
}
