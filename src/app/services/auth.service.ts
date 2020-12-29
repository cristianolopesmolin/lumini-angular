import { AuthRequest } from './../models/auth/auth-request';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, catchError } from 'rxjs/operators';

const API = environment.apiURL + 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  private readonly jwtTokenName = 'lumini_demo_auth';

  loggedUserName: string;
  loggedUserId: number;

  constructor(
    private router: Router,
    private http: HttpClient,
    private helper: JwtHelperService
  ) {
    const token = localStorage.getItem(this.jwtTokenName);
    if (token) {
      this.loggedUserName = JSON.parse(token).name;
      this.loggedUserId = JSON.parse(token).userId;
      this.loggedIn.next(true);
    }
  }

  login(authRequest: AuthRequest) {
    return this.http.post(API, authRequest).pipe(
      tap(tokenResponse => this.handleJwtResponse(tokenResponse)),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getLoggedUserName() {
    return this.loggedUserName;
  }

  getLoggedUserId() {
    return this.loggedUserId;
  }

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem(this.jwtTokenName);
    this.loggedIn.next(false);
    this.router.navigate(['/public/sign-in']);
  }

  private handleJwtResponse(tokenResponse) {
    localStorage.setItem(this.jwtTokenName, JSON.stringify(tokenResponse));
    this.loggedUserName = tokenResponse.name;
    this.loggedUserId = tokenResponse.userId;
    this.loggedIn.next(true);

    return tokenResponse;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = localStorage.getItem(this.jwtTokenName); }
    if (!token) { return true; } 

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {
    return this.helper.getTokenExpirationDate(token);
  }
}
