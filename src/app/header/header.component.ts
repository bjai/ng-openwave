import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isheader = this.auth.isloggedIn$;

  constructor(private navService: NavigationService, public router: Router, private auth: AuthService) { }




  toggleSideNav() {
    this.navService.setShowNav(true);
  }

  logout() {
    this.navService.setShowNav(false);
    this.auth.isloggedIn$.next(false);
    this.router.navigate(['login']);
  }
}
