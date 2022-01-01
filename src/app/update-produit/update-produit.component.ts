import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../model/book.model';
import { AuthorService } from '../services/author.service';
import { Author } from '../model/author.model';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: [
  ]
})
export class UpdateProduitComponent implements OnInit {
  currentBook = new Book();
  authors: Author[];
  imgURL: any;
  userFile: any;
  imagePath: any;
  currentAuthor:Author;
  constructor(private bookService: BookService, private router: Router, private autherrService: AuthorService, private activatedRoute: ActivatedRoute) {
    this.authors = autherrService.listeAuthors();

  }

  ngOnInit() {
    this.bookService.consulterProdui(this.activatedRoute.snapshot.params.id).
      subscribe(prod => {
        this.currentBook = prod;
        if (prod.fileName != null) {
          this.imgURL = this.bookService.apiURL + '/ImageBook/' + prod.idBook;
        
        }
        console.log("author ="+prod.author.nomAuthor);
        this.currentAuthor = prod.author;

      });
      this.userFile=null;
    this.autherrService.listeAuthor().subscribe(prods => {
      this.authors = prods;
    });
  }
  updateProduit() {
    const formData = new FormData();
    formData.append('book', JSON.stringify(this.currentBook));
    formData.append('file', this.userFile);
    this.bookService.updateProduit(formData).subscribe(data => {

      this.router.navigate(['books']).then(() => {
        window.location.reload();
      });
    });
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

}
