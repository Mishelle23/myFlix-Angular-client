import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];
  username: any = localStorage.getItem('user');
  displayElement: boolean = false

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  /**
   * getting data of a user from API, returning json format
   * @returns object with user details
   * @function getUserProfile
   */
  getUserProfile(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUserProfile().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }
  }

  /**
   * getting favorite movies using API end-point in form of json
   * @function getFavoriteMovies
   */

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.FavoriteMovies.push(movie);
        }
      });
    });
    console.log(this.FavoriteMovies);
  }


  /**
   * deleting favorite movie from user's profile
   * @function deleteFavoriteMovies
   * @param movieId 
   */
  deleteFavoriteMovies(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovies(movieId).subscribe((resp: any) => {
      this.snackBar.open(`Successfully removed ${Title}`, 'OK', {
        duration: 3000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    });
  }

  /**
     * displaying synopsis details by opening dialog from SynopsisCardComponent
     * @param title 
     * @param description 
     */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * displaying director details by opening dialog from DirectorCardComponent
   * @param name 
   * @param bio 
   * @param birth 
   */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px'
    });
  }


  /**
   * displaying genre details by opening dialog from GenreCardComponent
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * opening dialog where user edits their profile detils using EditProfileComponent
   */
  openEditUserProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '500px'
    });
  }


  /**
   * deleting user and returns back to the welcome page
   * @function deleteUserProfile
   */
  deleteUserProfile(): void {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted.', 'OK', {
          duration: 5000,
        });
      })
      this.fetchApiData.deleteUserProfile().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      })
    }
  }
}
