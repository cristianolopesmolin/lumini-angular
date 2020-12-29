import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AverageRequest } from '../models/average/average-request';

const API = environment.apiURL + 'average/';

@Injectable({
  providedIn: 'root'
})
export class AverageService {
  constructor(private http: HttpClient) {}

  calculateAverage(averageRequest: AverageRequest){
    return this.http.post<number>(API, averageRequest);
  }
}