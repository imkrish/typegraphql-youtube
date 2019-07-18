import { MongoDb } from "../db/mongo.db";
import { Model } from "mongoose";
import { TodoDocument } from "./todo.model";
import { Todo } from "./todo.type";
import { NewTodoInput, UpdatedTodoInput } from "./todo.input";
import {Service} from "typedi";

@Service()
export class TodoRepo {
  private todoModel: Model<TodoDocument>;

  constructor(models = MongoDb.getDBModels()) {
    this.todoModel = models.todo;
  }

  find(skip?: number, take?: number): Promise<Todo[]> {
    const query = this.todoModel.find();
    if (skip) {
      query.skip(skip);
    }

    if (take) {
      query.limit(take);
    }

    return query.lean().exec();
  }

  findById(id: string): Promise<Todo | null> {
    return this.todoModel
      .findById(id)
      .lean()
      .exec();
  }

  create(newTodo: NewTodoInput): Promise<Todo> {
    return this.todoModel
      .create({ ...newTodo, completed: false })
      .then(createdTodo => {
        return createdTodo.toObject();
      });
  }

  deleteById(id: string): Promise<Todo | null> {
    return this.todoModel
      .findByIdAndDelete(id)
      .lean()
      .exec();
  }

  update(id: string, updatedTodo: UpdatedTodoInput): Promise<Todo | null> {
    return this.todoModel
      .findByIdAndUpdate(id, updatedTodo, { new: true })
      .lean()
      .exec();
  }
}
