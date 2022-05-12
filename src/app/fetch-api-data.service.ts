import { Injectable } from '@angular/core';
//import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
//import { map } from 'rxjs/operators';

const apiUrl = 'https://safe-coast-49930.herokuapp.com';

const token = localStorage.getItem('token');

const username = localStorage.getItem('username');

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    // const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  getSingleMovie(): Observable<any> {
    //const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  getDirector(): Observable<any> {
    // const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })
    }).pipe(catchError(this.handleError));
  }

  getGenre(): Observable<any> {
    //const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/:name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token
      }),
    })
      .pipe(catchError(this.handleError));
  }

  getFavouriteMovies(): Observable<any> {
    //const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  addFavouriteMovies(movieId: any): Observable<any> {
    //const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })
    })
      .pipe(catchError(this.handleError));
  }

  deleteFavouriteMovies(movieId: any): Observable<any> {
    //  const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  getUserProfile(): Observable<any> {
    // const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  editUserProfile(userData: object): Observable<any> {
    // const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  deleteUserProfile(): Observable<any> {
    //const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      }),
    })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  // Non-typed response extraction
  // private extractResponseData(res: Response): any {
  //  const body = res;
  //  return body || {};
  // }
}