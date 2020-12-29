import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JuridicAddressResponse } from '../models/juridic-address/juridic-address-response';

const API = environment.apiURL + 'juridic-address/';

@Injectable({
  providedIn: 'root'
})
export class JuridicAddressService {
  constructor(private http: HttpClient) {}

  findAddress(cnpj: string){
    return this.http.get<JuridicAddressResponse>(API + cnpj);
  }
}