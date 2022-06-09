import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * This is the function responsible for sending the form inputs to the backend
   * @function userLogin
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((response) => {
      // Adding username and token to the local storage
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      this.dialogRef.close(); //this will close modal sucessfully
      console.log(response);
      this.snackBar.open('You are logged in', 'OK', {
        duration: 2000
      });
      // Redirecting to the main page with movies
      this.router.navigate(['movies']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
