import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})

export class TodoListComponent implements OnInit, OnDestroy {
  // declared public so tests can find them
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoCategory: string;
  public todoBody: string;
  getTodosSub: Subscription;

  constructor(private todoService: TodoService) {}

  getTodosFromServer(): void {
    this.unsub();
    this.getTodosSub = this.todoService.getTodos({
      owner: this.todoOwner,
      status: this.todoStatus
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { body: this.todoBody, category: this.todoCategory });
  }

  /**
   * Starts an asynchronous operation to update the todos list
   *
   */
  ngOnInit(): void {
    this.getTodosFromServer();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getTodosSub) {
      this.getTodosSub.unsubscribe();
    }
  }
}
