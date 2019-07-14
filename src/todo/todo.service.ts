import { Todo } from "./todo.model";
import { NewTodoInput } from "./todo.input";
import { TodoUtil } from "./todo.util";
import { v4 } from "uuid";

export class TodoService {
  todos: Todo[] = [
    {
      id: v4(),
      todo: "Sleep",
      completed: false,
      createdTimestamp: Date.now()
    },
    {
      id: v4(),
      todo: "Take a shower",
      completed: false,
      createdTimestamp: Date.now()
    },
    {
      id: v4(),
      todo: "Eat",
      completed: false,
      createdTimestamp: Date.now()
    },
    {
      id: v4(),
      todo: "Poo",
      completed: false,
      createdTimestamp: Date.now()
    },
    {
      id: v4(),
      todo: "Pee",
      completed: false,
      createdTimestamp: Date.now()
    }
  ];

  getTodos(skip: number, take: number): Todo[] {
    const usedSkip = skip || 0;
    const usedTake = take ? take + usedSkip : undefined;
    return this.todos.slice(usedSkip, usedTake);
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(newTodo: NewTodoInput): Todo {
    const todo = TodoUtil.getNewTodo(newTodo.todo);
    this.todos = this.todos.concat(todo);
    return todo;
  }

  deleteTodo(id: string): boolean {
    const lengthBefore = this.todos.length;
    this.todos = this.todos.filter(todo => {
      return todo.id !== id;
    });
    const lengthAfter = this.todos.length;
    return lengthBefore !== lengthAfter;
  }
}
