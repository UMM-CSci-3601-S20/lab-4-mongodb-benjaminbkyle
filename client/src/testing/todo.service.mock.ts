import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo, StatusType } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';


/**
 * A "mock" version of the `TodoService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  // small collection of test todos
  static testTodos: Todo[] = [
    {
      _id: 'bill_id',
      owner: 'Bill',
      status: true,
      body: 'Go elk hunting in Montana',
      category: 'hunting'
    },
    {
      _id: 'thomas_id',
      owner: 'Thomas',
      status: false,
      body: 'Finish reading game of thrones',
      category: 'reading'
    },
    {
      _id: 'ivory_id',
      owner: 'Ivory',
      status: false,
      body: 'Poaching elephants',
      category: 'hunting'
    }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: { owner?: string, status?: StatusType}): Observable<Todo[]> {
    // Just return the test todos regardless of what filters are passed in
    return of(MockTodoService.testTodos);
  }

  // getTodoById(id: string): Observable<Todo> {
  //   // If the specified ID is for the first test todo,
  //   // return that todo, otherwise return `null` so
  //   // we can test illegal todo requests.
  //   if (id === MockTodoService.testTodos[0]._id) {
  //     return of(MockTodoService.testTodos[0]);
  //   } else {
  //     return of(null);
  //   }
  // }
}
