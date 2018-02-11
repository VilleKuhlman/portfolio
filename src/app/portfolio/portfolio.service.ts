import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Portfolio } from './portfolio.model';


@Injectable()
export class PortfolioService {
  private _apiUrl: string;

  constructor(private _http: HttpClient) { 
    this._apiUrl = '../../assets/mock.api.json';
  }

 getItems() {
    return this._http.get<Portfolio>(this._apiUrl).pipe(
      catchError(PortfolioService.handleError)
      );
  }

  private static handleError (error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}