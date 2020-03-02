import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  addTodoForm: FormGroup;

  todo: Todo;

  constructor(private fb: FormBuilder, private todoService: TodoService, private snackBar: MatSnackBar, private router: Router) {
  }

  // not sure if this name is magical and making it be found or if I'm missing something,
  // but this is where the red text that shows up (when there is invalid input) comes from
  addTodoValidationMessages = {
    owner: [
      {type: 'required', message: 'Owner is required'},
      {type: 'minLength', message: 'Owner must be at least 2 characters long'},
      {type: 'maxLength', message: 'Owner cannot be more than 50 characters long'},
      {type: 'pattern', message: 'Owner must contain only letters'},
    ],

    status: [
      {type: 'required', message: 'Status is required'}
    ],

    body: [
      {type: 'required', message: 'Body is required'},
      {type: 'minLength', message: 'Body must be at least 2 characters long'},
      {type: 'maxLength', message: 'Body cannot be more than 200 characters long'},
    ],

    category: [
      {type: 'required', message: 'Category is required'},
      {type: 'minLength', message: 'Category must be at least 2 characters long'},
      {type: 'maxLength', message: 'Category cannot be more than 50 characters long'},
      {type: 'pattern', message: 'Category must contain only letters'},
    ]
  };

  createForms() {

    // add todo form validations
    this.addTodoForm = this.fb.group({
      // We allow alpha input and limit the length for owner.
      owner: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        // Only allow letters
        Validators.pattern('[a-zA-Z]+'),
      ])),

      // We require either "complete" or "incomplete"
      status: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      // We require a non-empty body with a length between 2 and 200.
      body: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ])),

      // We require a non-empty category with a length between 2 and 50, letters only.
      category: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        // Source and much adulation goes to: http://www.theunixcode.com/2015/07/regular-expression-to-allow-spaces-between-words/
        Validators.pattern('^[a-zA-Z]+( +[a-zA-Z]+)*$'),
      ])),
    });

  }

  ngOnInit() {
    this.createForms();
  }


  submitForm() {
    this.todoService.addTodo(this.addTodoForm.value).subscribe(  (newID) => {
      this.snackBar.open('TODO ID:' + newID, null, {
        duration: 3500,
      });
    }, err => {
       this.snackBar.open('Failed to add the todo', null, {
        duration: 3500,
      });
    });
  }

}
