import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/models/auth/auth-request';
import { AuthService } from 'src/app/services/auth.service';
import { CustomSnackBarService } from 'src/app/util/services/custom-snack-bar.service';
import { emailValidator } from 'src/app/util/validators/app.validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private snackBar: CustomSnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(){
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  login(){
    if(this.signInForm.valid){
      const authRequest: AuthRequest = this.signInForm.getRawValue();
      this.authService.login(authRequest).subscribe(
        () => {
          this.router.navigate(['']);
          this.snackBar.openSnackBar("Bem vindo", null, "Success")
        },
        () => this.snackBar.openSnackBar("Ocorreu um erro ao processar sua solicitação", null, "Error")
      )
    } else {
      this.snackBar.openSnackBar("Existem dados inválidos no formulário", null, "Warn")
    }
  }

}
