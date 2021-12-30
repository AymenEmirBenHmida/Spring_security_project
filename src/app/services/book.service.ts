import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class BookService {
  books : Book[];
  apiURL: string = 'http://localhost:8060/produits/api';
  apiURL1: string = 'http://localhost:8060/produits/api/prodscat';
  constructor(private http : HttpClient, private authService: AuthService) {
  }
  listeProduit(): Observable<Book[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.get<Book[]>(this.apiURL,{headers:httpHeaders});
  }
   listeBooks():Book[]{
     return this.books;
   }
   ajouterBook( prod: Book):Observable<Book>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Book>(this.apiURL, prod, {headers:httpHeaders});
    }
    supprimerProduit(id : number) {
      let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      const url = `${this.apiURL}/${id}`;
      return this.http.delete(url, {headers:httpHeaders});
      }

      consulterProdui(id: number): Observable<Book> {
        const url = `${this.apiURL}/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.get<Book>(url,{headers:httpHeaders});
        }
      
        updateProduit(prod :Book) : Observable<Book>
{
  let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
return this.http.put<Book>(this.apiURL, prod,{headers:httpHeaders});
}
consulterCertainProdui(id: number):Observable<Book[]> {
  const url = `${this.apiURL1}/${id}`;
  let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<Book[]>(url,{headers:httpHeaders});
  }


  
  }
