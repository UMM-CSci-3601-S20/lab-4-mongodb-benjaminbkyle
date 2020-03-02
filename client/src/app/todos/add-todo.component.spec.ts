import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockTodoService } from 'src/testing/todo.service.mock';
import { AddTodoComponent } from './add-todo.component';
import { TodoService } from './todo.service';

describe('AddTodoComponent', () => {
  let addTodoComponent: AddTodoComponent;
  let addTodoForm: FormGroup;
  let calledClose: boolean;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AddTodoComponent],
      providers: [{ provide: TodoService, useValue: new MockTodoService() }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    calledClose = false;
    fixture = TestBed.createComponent(AddTodoComponent);
    addTodoComponent = fixture.componentInstance;
    addTodoComponent.ngOnInit();
    fixture.detectChanges();
    addTodoForm = addTodoComponent.addTodoForm;
    expect(addTodoForm).toBeDefined();
    expect(addTodoForm.controls).toBeDefined();
  });

  // Not terribly important; if the component doesn't create
  // successfully that will probably blow up a lot of things.
  // Including it, though, does give us confidence that our
  // our component definitions don't have errors that would
  // prevent them from being successfully constructed.
  it('should create the component and form', () => {
    expect(addTodoComponent).toBeTruthy();
    expect(addTodoForm).toBeTruthy();
  });

  // Confirms that an initial, empty form is *not* valid, so
  // people can't submit an empty form.
  it('form should be invalid when empty', () => {
    expect(addTodoForm.valid).toBeFalsy();
  });

  describe('The owner field', () => {
    let ownerControl: AbstractControl;

    beforeEach(() => {
      ownerControl = addTodoComponent.addTodoForm.controls[`owner`];
    });

    it('should not allow empty owners', () => {
      ownerControl.setValue('');
      expect(ownerControl.valid).toBeFalsy();
    });

    it('should be fine with "Chris"', () => {
      ownerControl.setValue('Chris');
      expect(ownerControl.valid).toBeTruthy();
    });

    it('should fail on single character owners', () => {
      ownerControl.setValue('x');
      expect(ownerControl.valid).toBeFalsy();
      expect(ownerControl.hasError('minlength')).toBeTruthy();
    });

    it('should fail on really long owners', () => {
      ownerControl.setValue('x'.repeat(100));
      expect(ownerControl.valid).toBeFalsy();
      expect(ownerControl.hasError('maxlength')).toBeTruthy();
    });

    it('should not allow a owner to contain a symbol', () => {
      ownerControl.setValue('bad@category.com');
      expect(ownerControl.valid).toBeFalsy();
      expect(ownerControl.hasError('pattern')).toBeTruthy();
    });

    it('should not allow digits in the owner', () => {
      ownerControl.setValue('Bad2Th3B0ne');
      expect(ownerControl.valid).toBe(false);
    });
  });

  describe('The status field', () => {
    let statusControl: AbstractControl;

    beforeEach(() => {
      statusControl = addTodoComponent.addTodoForm.controls[`status`];
    });

    it('should not allow empty values', () => {
      statusControl.setValue('');
      expect(statusControl.valid).toBeFalsy();
    });

    it('should pass with valid status (complete)', () => {
      statusControl.setValue('Complete');
      expect(statusControl.valid).toBeTruthy();
    });

    it('should pass with valid status (incomplete)', () => {
      statusControl.setValue('Incomplete');
      expect(statusControl.valid).toBeTruthy();
    });
  });

  describe('The body field', () => {
    it('should not allow empty values', () => {
      const bodyControl = addTodoForm.controls[`body`];
      bodyControl.setValue('');
      expect(bodyControl.valid).toBeFalsy();
    });

    it('should not allow whitespace-only values', () => {
      const bodyControl = addTodoForm.controls[`body`];
      bodyControl.setValue('                               ');
      expect(bodyControl.valid).toBeFalsy();
    });

    it('should not allow extra whitespace (leading words)', () => {
      const bodyControl = addTodoForm.controls[`body`];
      bodyControl.setValue(' efeojiifeoijeoij');
      expect(bodyControl.valid).toBeFalsy();
    });

    it('should not allow extra whitespace (trailing words)', () => {
      const bodyControl = addTodoForm.controls[`body`];
      bodyControl.setValue('efeojiifeoijeoij ');
      expect(bodyControl.valid).toBeFalsy();
    });

    it('should not allow extra whitespace (between words)', () => {
      const bodyControl = addTodoForm.controls[`body`];
      bodyControl.setValue('efeojiio  feoijeoij');
      expect(bodyControl.valid).toBeFalsy();
    });

    it('should not allow length 1 body', () => {
      const bodyControl = addTodoForm.controls[`body`];
      bodyControl.setValue('F');
      expect(bodyControl.valid).toBeFalsy();
      expect(bodyControl.hasError('minlength')).toBeTruthy();
    });

    it('should allow valid body (any characters between 2 and 200, inclusive)', () => {
      const bodyControl = addTodoForm.controls[`body`];
      bodyControl.setValue('aefawefawef++9839483489348394');
      expect(bodyControl.valid).toBeTruthy();
    });

    it('should fail on really long bodies', () => {
      const bodyControl = addTodoForm.controls[`body`];
      bodyControl.setValue('x'.repeat(300));
      expect(bodyControl.valid).toBeFalsy();
      expect(bodyControl.hasError('maxlength')).toBeTruthy();
    });
  });

  describe('The category field', () => {
    let categoryControl: AbstractControl;

    beforeEach(() => {
      categoryControl = addTodoComponent.addTodoForm.controls[`category`];
    });

    it('should not allow empty values', () => {
      categoryControl.setValue('');
      expect(categoryControl.valid).toBeFalsy();
      expect(categoryControl.hasError('required')).toBeTruthy();
    });

    it('should accept legal categories', () => {
      categoryControl.setValue('video games');
      expect(categoryControl.valid).toBeTruthy();
    });

    it('should not accept badly formed catagories (leading/trailing spaces)', () => {
      categoryControl.setValue('video games ');
      expect(categoryControl.valid).toBeFalsy();
      expect(categoryControl.hasError('pattern')).toBeTruthy();
    });

    it('should not accept badly formed catagories (leading/trailing spaces)', () => {
      categoryControl.setValue(' video games');
      expect(categoryControl.valid).toBeFalsy();
      expect(categoryControl.hasError('pattern')).toBeTruthy();
    });
  });
});
