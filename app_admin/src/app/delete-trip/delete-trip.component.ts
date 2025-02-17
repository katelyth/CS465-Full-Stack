import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';


@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css'
})
export class DeleteTripComponent {
  
  constructor(
    private router: Router,
    private tripService: TripDataService
  ){}

  ngOnInit() {
    let tripCode = localStorage.getItem("tripCode");
    if(!tripCode) {
      alert("Something wrong, couldn't find where I stashed the tripCode!");
      this.router.navigate(['']);
      return
    }

    console.log("DeleteTripComponent found tripCode " + tripCode);

    this.tripService.deleteTrip(tripCode).subscribe({
      next: (data) => {
        console.log("Trip deleted successfully: ", data);
        this.router.navigate(['list-trips']);
      },
      error: (err) => {
        console.error("Error deleting trip:", err);
        alert("Failed to delete trip. Please try again");
      }
    });
    
  }

}
