import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IProduct } from "./product";
import { catchError, tap} from 'rxjs/operators'


@Injectable({
  //con esto indicamos que el servicio está disponible en toda la app (no hace falta importar ningún módulo)
  providedIn: 'root'
})

export class ProductService {

  //sería la url de la api
  private productUrl = 'api/products/products.json';

  //inyectamos httpClient en el constructor
  constructor(private http: HttpClient) {}


  getProducts(): Observable<IProduct[]> {

     /*devuelve un observable que consiste en un array de productos y recibiremos una notificación cuando
      la respuesta llegue del backend. Nos suscribiremos al observable en product-list*/

    return this.http.get<IProduct[]>(this.productUrl).pipe(

    //manejamos errores
    //1 verificando qué data nos llega por console
    tap(data => console.log('All: ', JSON.stringify(data))),
    //2. atrapando los errores y mandando como manejarlos
    catchError(this.handleError)
    );

  }

  //aquí decidimos que hacer con el mensaje de error que nos llega
  private handleError (err: HttpErrorResponse) {
    //in real world app, we may send the server to some remote logging insfrastructure instead just logging it to the console
    let errorMessage = "";
    if( err.error instanceof ErrorEvent) {
      //a client-side or network error ocurred. Handle it accordingly.
      errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
      //the backend returned an unsuccessful response code.
      //the response body may cointain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error.message is: ${err.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }

}


