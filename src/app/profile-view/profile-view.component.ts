import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * getting data of a user from API, returning json format
   * @returns object with user details
   * @function getUserProfile
   */
  getUserProfile(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
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