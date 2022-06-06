import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  /**
   * MAT_DIALOG_DATA injection token is used here to input data from MovieCardComponent to GenreCardComponent.
   * @param data 
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
