import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AverageRequest } from 'src/app/models/average/average-request';
import { JuridicAddressResponse } from 'src/app/models/juridic-address/juridic-address-response';
import { AuthService } from 'src/app/services/auth.service';
import { AverageService } from 'src/app/services/average.service';
import { JuridicAddressService } from 'src/app/services/juridic-address.service';
import { CustomSnackBarService } from 'src/app/util/services/custom-snack-bar.service';
import { documentValidator } from 'src/app/util/validators/app.validator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  addressForm: FormGroup;
  averageForm: FormGroup;

  address: JuridicAddressResponse;
  addressDataSource = new MatTableDataSource<JuridicAddressResponse>([]);
  result: number;

  displayedColumns = [
    "id",
    "cnpj",
    "cep",
    "street",
    "number",
    "complement",
    "neighborhood",
    "city",
    "ufShortName",
    "ufFullName",
  ]

  constructor(
    private formBuilder: FormBuilder,
    private juridicAddressService: JuridicAddressService,
    private averageService: AverageService,
    private authService: AuthService,
    private snackBar: CustomSnackBarService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.createAverageForm();
  }

  private createForm(){
    this.addressForm = this.formBuilder.group({
      cnpj: ['', Validators.compose([Validators.required, documentValidator])],
    })
  }

  private createAverageForm(){
    this.averageForm = this.formBuilder.group({
      firstValue: ['', Validators.compose([Validators.required])],
      secondValue: ['', Validators.compose([Validators.required])],
    })
  }

  findAddress(){
    this.juridicAddressService.findAddress(this.addressForm.get('cnpj').value).subscribe(
      (address) => {
        this.address = address;
        this.addressDataSource.data = [address];
      },
      (err) => {
        if(err.status === 404){
          this.snackBar.openSnackBar("Nenhum endereço foi localizado para o CNPJ informado", null, "Warn")
        } else {
          this.snackBar.openSnackBar("Ocorreu um erro ao processar sua solicitação", null, "Error")
        }
      }
    )
  }

  calculateAverage(){
    const averageRequest: AverageRequest = this.averageForm.getRawValue();
    this.averageService.calculateAverage(averageRequest).subscribe(
      (result) => this.result = result,
      () => this.snackBar.openSnackBar("Ocorreu um erro ao processar sua solicitação", null, "Error")
    )
  }

  logout(){
    this.authService.logout();
  }

  get userName(){
    return this.authService.getLoggedUserName();
  }

}
