import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUserRequest } from '../models/user/new-user-request';
import { UserResponse } from '../models/user/user-response';

const API = environment.apiURL + 'user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  addNewUser(newUserRequest: NewUserRequest){
    return this.http.post<UserResponse>(API, newUserRequest);
  }
}