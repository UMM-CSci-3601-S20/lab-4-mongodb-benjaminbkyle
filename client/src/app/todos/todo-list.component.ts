import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo, StatusType } from './todo';
import { TodoService } from './todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})

export class TodoListComponent implements OnInit, OnDestroy {
  // Public fields to allow tests to refer to the values
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: StatusType;
  public todoBody: string;
  public todoCategory: string;
  getTodosSub: Subscription;

  // Inject the TodoService into the todo-list component.
  // Allows for interaction with the server.

  constructor(private todoService: TodoService) {}

  getTodosFromServer(): void {
    this.unsub();
    this.getTodosSub = this.todoService.getTodos({
      owner: this.todoOwner,
      status: this.todoStatus,
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }
  /**
   * Filters the todos list returned from the server
   */
  updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { body: this.todoBody, category: this.todoCategory});
  }

  /**
   * Starts an asynchronous operation to update the todos list
   */
  ngOnInit(): void {
    this.getTodosFromServer();
  }
  ngOnDestroy(): void {
    this.unsub();
  }
  unsub() {
    if (this.getTodosSub) {
      this.getTodosSub.unsubscribe();
    }
  }
}
