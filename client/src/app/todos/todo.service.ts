import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  // getTodos filters on the server by parameters owner and category.
  getTodos(filters?: { owner?: string, status?: boolean}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.status) {
        httpParams = httpParams.set('status', filters.status.toString());
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams
    });
  }

  // Get todo by object database id.
  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], filters: { body?: string, category?: string }): Todo[] {

    let filteredTodos = todos;

    // Filter by body.
    if (filters.body) {
      filters.body = filters.body.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.body.toLowerCase().indexOf(filters.body) !== -1;
      });
    }
    // Filter by category.
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.category.toLowerCase().indexOf(filters.category) !== -1;
      });
    }

    return filteredTodos;
  }

  // Create a new todo object.
  addTodo(newTodo: Todo): Observable<string> {
    // Send a post request to the server to add a new todo with the object data supplied as the body.
    return this.httpClient.post<{id: string}>(this.todoUrl + '/new', newTodo).pipe(map(res => res.id));
  }

  // Delete todo by id (may not need to implement for lab).

}
