import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})

export class TripCardComponent implements OnInit {
  @Input('trip') trip: Trip | undefined;

  constructor(
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void{

  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code)
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip) {
    if(!trip) {
      alert("Error: Invalid trip data!");
      return
    }

    if(confirm('Are you sure you want to delete the trip?')) {
      this.tripService.deleteTrip(trip.code).subscribe({
        next: () => {
          alert("Trip deleted successfully!");
          window.location.reload();
        },
        error: (err) => {
          console.error("Error deleting trip:", err);
          alert("Failed to delete trip. Please try again.");
        }
      });
    }
  }
}
