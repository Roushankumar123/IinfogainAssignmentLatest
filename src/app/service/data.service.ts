import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cachedData: any;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    if (this.cachedData) {
      return of(this.cachedData);
    } else {
      return this.http.get<any>('assets/moke-data.json').pipe(
        tap(data => {
          this.cachedData = data;
        }),
        catchError(error => {
          console.error('Error fetching data: ', error);
          return of(null);
        })
      );
    }
  }
}
