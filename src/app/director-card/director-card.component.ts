import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

  /**
   * MAT_DIALOG_DATA injection token is used here to input data from MovieCardComponent to DirectorCardComponent.
   * @param data 
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birth: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
