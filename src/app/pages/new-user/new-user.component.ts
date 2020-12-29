import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUserRequest } from 'src/app/models/user/new-user-request';
import { UserService } from 'src/app/services/user.service';
import { CustomSnackBarService } from 'src/app/util/services/custom-snack-bar.service';
import { emailValidator, matchingPasswords } from 'src/app/util/validators/app.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private snackBar: CustomSnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(){
    this.newUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
          ),
        ]),
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: matchingPasswords('password', 'confirmPassword'),
    })
  }

  addNewUser(){
    if(this.newUserForm.valid){
      const newUserRequest: NewUserRequest = this.newUserForm.getRawValue();
      this.userService.addNewUser(newUserRequest).subscribe(
        (userResponse) => {
          this.router.navigate(['public/sign-in']);
          this.snackBar.openSnackBar(`Bem vindo ${userResponse.name}!`, null, "Success")
        },
        (err) => {
          if(err.error.message && err.error?.message?.toLowerCase().indexOf('uk_email') !== -1){
            this.snackBar.openSnackBar("Email já cadastrado", null, "Error")
          } else {
            this.snackBar.openSnackBar("Ocorreu um erro ao processar sua solicitação", null, "Error")
          }
        }
      )
    } else {
      this.snackBar.openSnackBar("Existem dados inválidos no formulário", null, "Warn")
    }
  }

}
