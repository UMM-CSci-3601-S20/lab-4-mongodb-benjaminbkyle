// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { By } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MockTodoService } from 'src/testing/todo.service.mock';
// import { AddTodoComponent } from './add-todo.component';
// import { TodoService } from './todo.service';

// describe('AddTodoComponent', () => {
//   let addTodoComponent: AddTodoComponent;
//   let addTodoForm: FormGroup;
//   let calledClose: boolean;
//   let fixture: ComponentFixture<AddTodoComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         FormsModule,
//         ReactiveFormsModule,
//         MatSnackBarModule,
//         MatCardModule,
//         MatFormFieldModule,
//         MatSelectModule,
//         MatInputModule,
//         BrowserAnimationsModule,
//         RouterTestingModule
//       ],
//       declarations: [AddTodoComponent],
//       providers: [{ provide: TodoService, useValue: new MockTodoService() }]
//     }).compileComponents().catch(error => {
//       expect(error).toBeNull();
//     });
//   }));

//   beforeEach(() => {
//     calledClose = false;
//     fixture = TestBed.createComponent(AddTodoComponent);
//     addTodoComponent = fixture.componentInstance;
//     addTodoComponent.ngOnInit();
//     fixture.detectChanges();
//     addTodoForm = addTodoComponent.addTodoForm;
//     expect(addTodoForm).toBeDefined();
//     expect(addTodoForm.controls).toBeDefined();
//   });

//   // Not terribly important; if the component doesn't create
//   // successfully that will probably blow up a lot of things.
//   // Including it, though, does give us confidence that our
//   // our component definitions don't have errors that would
//   // prevent them from being successfully constructed.
//   it('should create the component and form', () => {
//     expect(addTodoComponent).toBeTruthy();
//     expect(addTodoForm).toBeTruthy();
//   });

//   // Confirms that an initial, empty form is *not* valid, so
//   // people can't submit an empty form.
//   it('form should be invalid when empty', () => {
//     expect(addTodoForm.valid).toBeFalsy();
//   });

//   describe('The owner field', () => {
//     let ownerControl: AbstractControl;

//     beforeEach(() => {
//       ownerControl = addTodoComponent.addTodoForm.controls[`owner`];
//     });

//     it('should not allow empty owners', () => {
//       ownerControl.setValue('');
//       expect(ownerControl.valid).toBeFalsy();
//     });

//     it('should be fine with "Chris Smith"', () => {
//       ownerControl.setValue('Chris Smith');
//       expect(ownerControl.valid).toBeTruthy();
//     });

//     it('should fail on single character owners', () => {
//       ownerControl.setValue('x');
//       expect(ownerControl.valid).toBeFalsy();
//       // Annoyingly, Angular uses lowercase 'l' here
//       // when it's an upper case 'L' in `Validators.minLength(2)`.
//       expect(ownerControl.hasError('minLength')).toBeTruthy();
//     });

//     // In the real world, you'd want to be pretty careful about
//     // setting upper limits on things like owner lengths just
//     // because there are people with really long owners.
//     it('should fail on really long owners', () => {
//       ownerControl.setValue('x'.repeat(100));
//       expect(ownerControl.valid).toBeFalsy();
//       // Annoyingly, Angular uses lowercase 'l' here
//       // when it's an upper case 'L' in `Validators.maxLength(2)`.
//       expect(ownerControl.hasError('maxLength')).toBeTruthy();
//     });

//     it('should not allow a owner to contain a symbol', () => {
//       ownerControl.setValue('bad@email.com');
//       expect(ownerControl.valid).toBeFalsy();
//       expect(ownerControl.hasError('pattern')).toBeTruthy();
//     });

//     it('should not allow digits in the owner', () => {
//       ownerControl.setValue('Bad2Th3B0ne');
//       expect(ownerControl.valid).toBe(false);
//     });

//     it('should fail if we provide an "existing" owner', () => {
//       // We're assuming that "abc123" and "123abc" already
//       // exist so we disallow them.
//       ownerControl.setValue('abc123');
//       expect(ownerControl.valid).toBeFalsy();
//       expect(ownerControl.hasError('existingOwner')).toBeTruthy();

//       ownerControl.setValue('123abc');
//       expect(ownerControl.valid).toBeFalsy();
//       expect(ownerControl.hasError('existingOwner')).toBeTruthy();
//     });
//   });

//   describe('The age field', () => {
//     let ageControl: AbstractControl;

//     beforeEach(() => {
//       ageControl = addTodoComponent.addTodoForm.controls[`age`];
//     });

//     it('should not allow empty owners', () => {
//       ageControl.setValue('');
//       expect(ageControl.valid).toBeFalsy();
//     });

//     it('should be fine with "27"', () => {
//       ageControl.setValue('27');
//       expect(ageControl.valid).toBeTruthy();
//     });

//     it('should fail on ages that are too low', () => {
//       ageControl.setValue('14');
//       expect(ageControl.valid).toBeFalsy();
//       expect(ageControl.hasError('min')).toBeTruthy();
//     });

//     // In the real world, you'd want to be pretty careful about
//     // setting upper limits on things like ages.
//     it('should fail on ages that are too high', () => {
//       ageControl.setValue(201);
//       expect(ageControl.valid).toBeFalsy();
//       // I have no idea why I have to use a lower case 'l' here
//       // when it's an upper case 'L' in `Validators.maxLength(2)`.
//       // But I apparently do.
//       expect(ageControl.hasError('max')).toBeTruthy();
//     });

//     it('should not allow an age to contain non-digits', () => {
//       ageControl.setValue('123x567');
//       expect(ageControl.valid).toBeFalsy();
//       expect(ageControl.hasError('pattern')).toBeTruthy();
//     });
//   });

//   describe('The company field', () => {
//     it('should allow empty values', () => {
//       const companyControl = addTodoForm.controls[`company`];
//       companyControl.setValue('');
//       expect(companyControl.valid).toBeTruthy();
//     });
//   });

//   describe('The email field', () => {
//     let emailControl: AbstractControl;

//     beforeEach(() => {
//       emailControl = addTodoComponent.addTodoForm.controls[`email`];
//     });

//     it('should not allow empty values', () => {
//       emailControl.setValue('');
//       expect(emailControl.valid).toBeFalsy();
//       expect(emailControl.hasError('required')).toBeTruthy();
//     });

//     it('should accept legal emails', () => {
//       emailControl.setValue('conniestewart@ohmnet.com');
//       expect(emailControl.valid).toBeTruthy();
//     });

//     it('should fail without @', () => {
//       emailControl.setValue('conniestewart');
//       expect(emailControl.valid).toBeFalsy();
//       expect(emailControl.hasError('email')).toBeTruthy();
//     });
//   });

//   describe('The role field', () => {
//     let roleControl: AbstractControl;

//     beforeEach(() => {
//       roleControl = addTodoForm.controls[`role`];
//     });

//     it('should not allow empty values', () => {
//       roleControl.setValue('');
//       expect(roleControl.valid).toBeFalsy();
//       expect(roleControl.hasError('required')).toBeTruthy();
//     });

//     it('should allow "admin"', () => {
//       roleControl.setValue('admin');
//       expect(roleControl.valid).toBeTruthy();
//     });

//     it('should allow "editor"', () => {
//       roleControl.setValue('editor');
//       expect(roleControl.valid).toBeTruthy();
//     });

//     it('should allow "viewer"', () => {
//       roleControl.setValue('viewer');
//       expect(roleControl.valid).toBeTruthy();
//     });

//     it('should not allow "Supreme Overlord"', () => {
//       roleControl.setValue('Supreme Overlord');
//       expect(roleControl.valid).toBeFalsy();
//     });
//   });
// });
