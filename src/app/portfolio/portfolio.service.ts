import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Portfolio } from './portfolio.model';

@Injectable()
export class PortfolioService {
  mode = 'Observable';

  private _apiUrl: string;

  constructor(private _http: Http) {
    this._apiUrl = '../../assets/mock.api.json';
  }

 getItems() {

    return this._http.get(this._apiUrl)
      .map(response => <Portfolio>response.json())
      .catch(PortfolioService.handleError);
      
  }


  private static handleError (error: any) {
    // @TODO replace with real logging
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}