import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { Author } from '../model/author.model';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {

  books: Book[];
  authors: Author[];
  author1: Author;
  
  auth: AuthService;
  name: String;

  constructor(private bookService: BookService,
    private router: Router,
    private autherService: AuthorService, public authService: AuthService,) {
    this.books = bookService.listeBooks();
    this.authors = autherService.listeAuthors();
    this.auth = authService;

  }

  ngOnInit(): void {
    if (this.authService.isAdmin())
      console.log("admin = true");
    else
      console.log("admin = false");
      this.name="";
    this.bookService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.books = prods;

      this.books.forEach((cur, index) => {

        if (cur.fileName != null) {
          cur.showImage = true;
        }

      });

    });
    this.autherService.listeAuthor().subscribe(prods => {
      console.log(prods);
      this.authors = prods;
    });
  }
  findBooksByName( ) {
    
    this.bookService.findBooksByName(this.name).subscribe(prods => {
      console.log(prods);
      this.books = prods;
      this.books.forEach((cur, index) => {

        if (cur.fileName != null) {
          cur.showImage = true;
        }

      });
      
   console.log("entered findbookbyname");
   
    });
    
  }

  supprimerProduit(p: Book) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.bookService.supprimerProduit(p.idBook).subscribe(() => {
        console.log("produit supprimé");
      });
    this.SuprimerProduitDuTableau(p);
  }

  SuprimerProduitDuTableau(prod: Book) {
    this.books.forEach((cur, index) => {
      if (prod.idBook === cur.idBook) {
        this.books.splice(index, 1);
      }
    });
  }


  hasImage(id: any) {
    this.books.forEach((cur, index) => {
      if (id === cur.idBook) {
        if (cur.fileName != null) {
          return true;
        }
      }
    });
    return false;
  }
}
