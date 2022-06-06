import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }


  /**
   * getting a list of all movies using API end-point in form of json
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }


  /**
   * getting favorite movies using API end-point in form of json
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
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
   * adding a movie to list of favorites using API
   * @param id
   * @function addFavoriteMovies
   */
  addToFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovies(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }


  /**
   * deleting a movie from list of favorites using API
   * @param id
   * @function deleteFavoriteMovies
   */
  deleteFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }
}