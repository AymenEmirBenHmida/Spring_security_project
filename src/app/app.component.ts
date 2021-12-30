import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  title = 'MyBooks';
  isLoggedin : boolean ;
  constructor (public authService: AuthService,
    private router: Router) {}

ngOnInit () {
  this.authService.loadToken();
  if (this.authService.getToken()==null || 
      this.authService.isTokenExpired())
        this.router.navigate(['/login']);
}

onLogout(){
  this.authService.logout();
}

}
