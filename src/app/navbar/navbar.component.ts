import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }


  /**
   * directs to the main page displaying movies
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }


  /**
   * directs to the user profile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }


  /**
   * logging out the user, local storage is cleared, user and token is reset
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
