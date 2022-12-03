import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userName = new FormControl('');
  password = new FormControl('');
  showError = false;

  constructor(private authService: AuthService, public router: Router) { }

  login = () => {

    this.authService.isUserAuthenticated(this.userName.value != null ? this.userName.value : '', this.password.value != null ? this.password.value : '')
      .subscribe(authenticated => {
        if (authenticated) {
          this.router.navigate(['trip']);
        } else {
          this.showError = true;
        }
      });
  }

}
