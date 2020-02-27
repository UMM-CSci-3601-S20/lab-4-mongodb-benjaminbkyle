import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Todo service: ', () => {
  // small collection of test todos
  const testTodos: Todo[] = [
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
  let todoService: TodoService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it ('getTodos() calls api/todos', () => {

    todoService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );
      // check that only one request will be made to the specified url
    const req = httpTestingController.expectOne(todoService.todoUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testTodos);
  });

  it('filterTodos() filters by category', () => {
    expect(testTodos.length).toBe(3);
    const todoCategory = 'hunting';
    expect(todoService.filterTodos(testTodos, { category: todoCategory }).length).toBe(2);
  });
});
