import { Injectable } from '@angular/core';
import { Author } from '../model/author.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

const httpOptions = {
  
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  authors : Author[];
  apiURL: string = 'http://localhost:8060/produits/api/author';
  constructor(private http : HttpClient, private authService: AuthService) {
  }
  listeAuthor(): Observable<Author[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.get<Author[]>(this.apiURL,{headers:httpHeaders});
  }
   listeAuthors():Author[]{
     return this.authors;
   }
   ajouterAuthor( prod: Author):Observable<Author>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Author>(this.apiURL, prod,{headers:httpHeaders});
    }
    supprimerAuthor(id : number) {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      const url = `${this.apiURL}/${id}`;
      return this.http.delete(url,{headers:httpHeaders});
      }

      consulterAuthor(id: number): Observable<Author> {
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Author>(url,{headers:httpHeaders});
        }
      
        updateAuthor(prod :Author) : Observable<Author>
{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
return this.http.put<Author>(this.apiURL, prod,{headers:httpHeaders});
}
}
