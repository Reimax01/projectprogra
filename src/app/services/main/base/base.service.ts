import {HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

export class BaseService {
    baseUrl: string;

    protected httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'
            /*, 'Authorization': 'Bearer '+this.keycloakService.enableBearerInterceptor*/ })
    };
    constructor(
        protected http: HttpClient
    ) { }

    /**
     * metodo GET
     */
    get(url: string): Observable<any> {

        this.log(`call GET url:${url}`);
        return this.http.get<any>(`${this.baseUrl}${url}`, this.httpOptions)
            .pipe(
                tap(_ => this.log(`fetched url:${url}`)),
                catchError(this.handleError('method get', []))
            );
    }

    /**
     * metodo POST
     */
    post(url: string, body?: object): Observable<any> {
        this.log(`call POST url:${url}`);
        return this.http.post<any>(`${this.baseUrl}${url}`, body, this.httpOptions)
            .pipe(
                tap(_ => this.log(`fetched url:${url}`)),
                catchError(this.handleError('method post', []))
            );
    }

    /**
     * metodo DELETE
     */
    delete(url: string, body?: object): Observable<any> {
        this.log(`call DELETE url:${url}`);
        return this.http.delete<any>(`${this.baseUrl}${url}`, body)
            .pipe(
                tap(_ => this.log(`fetched url:${url}`)),
                catchError(this.handleError('method delete', []))
            );
    }

    put(url: string, body?: object): Observable<any> {
        this.log(`call PUT url:${url}`);
        return this.http.put<any>(`${this.baseUrl}${url}`, body, this.httpOptions)
          .pipe(
            tap(_ => this.log(`fetched url:${url}`)),
            catchError(this.handleError('method put', []))
          );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    // tslint:disable-next-line:typedef
    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            // return of(result as T);
            return observableThrowError(error);
        };
    }

    /** Log a message  */
    // tslint:disable-next-line:typedef
    protected log(message: string) {
        console.log(`${this.constructor.name} : ${message}`);
    }
}
