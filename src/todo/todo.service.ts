import { NewTodoInput, UpdatedTodoInput } from "./todo.input";
import { TodoUtil } from "./todo.util";
import { Todo } from "./todo.type";

export class TodoService {
  todos: Todo[] = [];

  getTodos(skip: number, take: number): Todo[] {
    const usedSkip = skip || 0;
    const usedTake = take ? take + usedSkip : undefined;
    return this.todos.slice(usedSkip, usedTake);
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo._id === id);
  }

  createTodo(newTodo: NewTodoInput): Todo {
    const todo = TodoUtil.getNewTodo(newTodo.todo);
    this.todos = this.todos.concat(todo);
    return todo;
  }

  deleteTodo(id: string): boolean {
    const lengthBefore = this.todos.length;
    this.todos = this.todos.filter(todo => {
      return todo._id !== id;
    });
    const lengthAfter = this.todos.length;
    return lengthBefore !== lengthAfter;
  }

  updateTodo(id: string, updatedTodo: UpdatedTodoInput): Todo | undefined {
    const foundIdx = this.todos.findIndex(todo => todo._id == id);
    if (foundIdx === -1) {
      return;
    }
    const foundTodo = this.todos[foundIdx];
    const todo = { ...foundTodo, ...updatedTodo };
    this.todos = [
      ...this.todos.slice(0, foundIdx),
      todo,
      ...this.todos.slice(foundIdx + 1)
    ];
    return todo;
  }
}
