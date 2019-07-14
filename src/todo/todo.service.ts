import { Todo } from "./todo.model";

export class TodoService {
  todos: Todo[] = [
    {
      id: Date.now().toString(),
      todo: "Sleep",
      completed: false,
      createdTimestamp: Date.now()
    },
    {
      id: Date.now().toString(),
      todo: "Take a shower",
      completed: false,
      createdTimestamp: Date.now()
    },
    {
      id: Date.now().toString(),
      todo: "Eat",
      completed: false,
      createdTimestamp: Date.now()
    },
    {
      id: Date.now().toString(),
      todo: "Poo",
      completed: false,
      createdTimestamp: Date.now()
    },
    {
      id: Date.now().toString(),
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
}
