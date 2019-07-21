import "reflect-metadata";
import { Connection } from "mongoose";
import { MongoDb } from "../db/mongo.db";
import { TodoRepo } from "./todo.repo";

describe("TodoResolver", () => {
  let connection: Connection;
  let todoRepo: TodoRepo;

  beforeAll(async () => {
    connection = await MongoDb.connect("mongodb://localhost:27017/todo-test");
  });

  beforeEach(async () => {
    todoRepo = new TodoRepo();

    await todoRepo.create({ todo: "Test todo" });
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  test("1+1 should be 2", () => {
    expect(1 + 1).toBe(2);
  });
});
