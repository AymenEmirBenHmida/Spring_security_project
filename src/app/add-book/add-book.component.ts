import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { Author } from '../model/author.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html'
})
export class AddBookComponent implements OnInit {

  newBook = new Book();
  authors : Author[];
  userFile: any;
  imagePath: any;
  imgURL: string | ArrayBuffer;
  
  constructor(private bookService : BookService,
    private autherService : AuthorService,
    private router:Router) {
      this.authors = autherService.listeAuthors();
     }
  addBook(){
    const formData = new  FormData();
    formData.append('book',JSON.stringify(this.newBook));
    formData.append('file',this.userFile);
    this.bookService.ajouterBook(formData).subscribe( data => {
    
      this.router.navigate(['books']).then(() => {
        window.location.reload();
      });
    });

}

addData() {
  const formData = new  FormData();
  formData.append('book',JSON.stringify(this.newBook));
  formData.append('file',this.userFile);
  this.bookService.ajouterBook(formData).subscribe( data => {
  
    this.router.navigate(['books']).then(() => {
      window.location.reload();
    });
  });
}

  ngOnInit(): void {
    this.autherService.listeAuthor().subscribe(prods => {
      console.log(prods);
      this.authors = prods;
      });
  }

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
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
  }}

}
