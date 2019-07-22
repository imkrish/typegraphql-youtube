import "reflect-metadata";
import { Connection } from "mongoose";
import { MongoDb } from "../db/mongo.db";
import { TodoRepo } from "./todo.repo";
import { TestUtil } from "../test/test.util";
import { NewTodoInput } from "./todo.input";
import { omit } from "ramda";

describe("TodoResolver", () => {
  let connection: Connection;
  let todoRepo: TodoRepo;

  const mockTodos: NewTodoInput[] = [
    { todo: "Sleep" },
    { todo: "Take a shower" },
    { todo: "Have breakfast" },
    { todo: "Poo" },
    { todo: "Go to work" }
  ];

  const getTodosQuery = `
    query getTodos($skip: Float, $take: Float) {
      getTodos(skip: $skip, take: $take) {
        _id
        todo
        completed
        createdAt
        updatedAt
      }
    }
  `;

  const formatTodosResult = (result: any) => {
    return result.data.getTodos.map(omit(["_id", "createdAt", "updatedAt"]));
  };

  beforeAll(async () => {
    connection = await MongoDb.connect("mongodb://localhost:27017/todo-test");
  });

  beforeEach(async () => {
    todoRepo = new TodoRepo();

    for (const todo of mockTodos) {
      await todoRepo.create(todo);
    }
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  describe("TodoResolver.getTodos", () => {
    test("should return all todos if skip and take are undefined", async () => {
      // Arrange
      const variableValues = {};

      const expected = [
        { todo: "Sleep", completed: false },
        { todo: "Take a shower", completed: false },
        { todo: "Have breakfast", completed: false },
        { todo: "Poo", completed: false },
        { todo: "Go to work", completed: false }
      ];

      // Act
      const result = await TestUtil.testGQL({
        source: getTodosQuery,
        variableValues
      });
      const actual = formatTodosResult(result);

      // Assert
      expect(actual).toEqual(expected);
    });

    test("should return 2 todos if take is 2", async () => {
      // Arrange
      const expected = [
        { todo: "Sleep", completed: false },
        { todo: "Take a shower", completed: false }
      ];
      const variableValues = {
        take: 2
      };

      // Act
      const result = await TestUtil.testGQL({
        source: getTodosQuery,
        variableValues
      });
      const actual = formatTodosResult(result);

      // Assert
      expect(actual).toEqual(expected);
    });

    test("should return 1 todo if skip is 4", async () => {
      // Arrange
      const variableValues = {
        skip: 4
      };
      const expected = [{ todo: "Go to work", completed: false }];

      // Act
      const result = await TestUtil.testGQL({
        source: getTodosQuery,
        variableValues
      });
      const actual = formatTodosResult(result);

      // Assert
      expect(actual).toEqual(expected);
    });

    test("should return 2 todos if skip is 2 and take is 2", async () => {
      // Arrange
      const variableValues = {
        skip: 2,
        take: 2
      };
      const expected = [
        { todo: "Have breakfast", completed: false },
        { todo: "Poo", completed: false }
      ];

      // Act
      const result = await TestUtil.testGQL({
        source: getTodosQuery,
        variableValues
      });
      const actual = formatTodosResult(result);

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
