import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../model/User.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  user = new User();
  err:number = 0;
  constructor(private authService : AuthService,
              public router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
  {
    this.authService.login(this.user).subscribe((data)=> {
      let jwToken = data.headers.get('Authorization');
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);              
    },(err)=>{   this.err = 1;
});

 }


}
