import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { Author } from '../model/author.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  
})
export class BooksComponent implements OnInit {
  books : Book[];
  authors : Author[];
  author1 : Author;
  author2 : Author[] =[ {
    idAuthor: 0.1,
    nomAuthor:'hello',
    dateNaissance : new Date()
  }];
  auth: AuthService;
  
  constructor(private bookService : BookService,
    private router:Router,
    private autherService : AuthorService,public authService: AuthService,) {
    this.books = bookService.listeBooks();
    this.authors = autherService.listeAuthors();
    this.auth =  authService;
    
   }

   ngOnInit(): void {
     if(this.authService.isAdmin())
     console.log("admin = true");
     else
     console.log("admin = false");
    this.bookService.listeProduit().subscribe(prods => {
    console.log(prods);
    this.books = prods;
    });
    this.autherService.listeAuthor().subscribe(prods => {
      console.log(prods);
      this.authors = prods;
      });
    }
    consulterCertainProdui(id: number) {
      if(id==0.1){
        this.books = this.bookService.listeBooks();
        this.router.navigate(['books']);
        window.location.reload();
       }
        else{
          
          this.bookService.consulterCertainProdui(id).subscribe(prods => {
            console.log(prods);
            this.books = prods;
            });
        }
      }

    supprimerProduit(p: Book)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
this.bookService.supprimerProduit(p.idBook).subscribe(() => {
console.log("produit supprimé");
});
this.SuprimerProduitDuTableau(p);
}

SuprimerProduitDuTableau(prod : Book) {
  this.books.forEach((cur, index) => {
  if(prod.idBook=== cur.idBook) {
  this.books.splice(index, 1);
  }
  });
  }
}
